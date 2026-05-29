import { attractions, trip } from './content';
import {
  ageHours,
  clearScore,
  forDate,
  isRainy,
  isStale,
  sunshineFraction,
  wmoEmoji,
  wmoLabel,
  type WeatherData
} from './weather';
import { isoWeekday, parseLocal, ptDate, ptDateShort, ptWeekday, todayISO } from './dates';

export type AlertLevel = 'GREAT' | 'GOOD' | 'WARN' | 'INFO';

export interface Alert {
  level: AlertLevel;
  emoji: string;
  title: string;
  body: string;
  attractionId?: string;
}

const LEVEL_ORDER: Record<AlertLevel, number> = { GREAT: 0, GOOD: 1, WARN: 2, INFO: 3 };

/** Pick the first attraction id from a preference list that hasn't been done yet. */
function firstNotDone(ids: string[], done: Set<string>): string | undefined {
  return ids.find((id) => !done.has(id));
}

export function buildAlerts(
  weather: WeatherData | null,
  doneIds: string[] = [],
  today = todayISO()
): Alert[] {
  const done = new Set(doneIds);
  const out: Alert[] = [];
  const start = trip.startDate;
  const end = trip.endDate;

  if (parseLocal(today) < parseLocal(start)) {
    const d = Math.round((parseLocal(start).getTime() - parseLocal(today).getTime()) / 86_400_000);
    out.push({
      level: 'INFO',
      emoji: '✈️',
      title: `Faltam ${d} dia(s) para Puerto Varas`,
      body: `A viagem começa em ${ptDate(start)}. Os alertas de clima ficam afiados quando vocês chegarem.`
    });
  }

  if (!weather || weather.days.length === 0) {
    out.push({
      level: 'WARN',
      emoji: '📡',
      title: 'Sem previsão no momento',
      body: 'Conecte ao wi-fi do Airbnb e atualize. Depois disso o guia funciona offline.'
    });
    return out;
  }

  const todayFc = forDate(weather, today) ?? weather.days[0];

  // 1) Pinned: today's weather.
  out.push({
    level: 'INFO',
    emoji: wmoEmoji(todayFc.weatherCode, weather.current?.isDay ?? true),
    title: `Hoje: ${wmoLabel(todayFc.weatherCode)}`,
    body:
      `${Math.round(todayFc.tempMin)}–${Math.round(todayFc.tempMax)}°C · chuva ${todayFc.precipProbMax}% · vento até ${Math.round(todayFc.windMax)} km/h` +
      (isStale(weather) ? ` · (previsão de ${ageHours(weather)}h atrás)` : '')
  });

  // Horizon: upcoming days, preferably within the trip window.
  const horizon = weather.days
    .filter((d) => d.date >= today)
    .filter((d) => (d.date >= start && d.date <= end) || today < start || today > end)
    .slice(0, 8);
  const horizonOrAll = horizon.length ? horizon : weather.days.filter((d) => d.date >= today).slice(0, 8);

  // 2) Best clear-sky day → volcano / viewpoints (skipping already-done spots).
  const bestClear = horizonOrAll.reduce(
    (best, d) => (best && clearScore(best) >= clearScore(d) ? best : d),
    horizonOrAll[0]
  );
  if (bestClear && clearScore(bestClear) >= 0.4) {
    const target = firstNotDone(['osorno', 'todos_los_santos', 'philippi', 'costanera'], done);
    if (target) {
      const isToday = bestClear.date === today;
      const level: AlertLevel = clearScore(bestClear) >= 0.55 ? 'GREAT' : 'GOOD';
      const whenTxt = isToday ? 'Hoje' : `${ptWeekday(bestClear.date)} (${ptDateShort(bestClear.date)})`;
      const name = attractions.find((a) => a.id === target)?.name ?? 'os mirantes';
      out.push({
        level,
        emoji: '🌞',
        title: `${whenTxt}: melhor céu da semana`,
        body: `Sol previsto (${Math.round(sunshineFraction(bestClear) * 100)}% do dia) e chuva só ${bestClear.precipProbMax}%. Dia ideal pra ${name} e o pôr do sol na costanera.`,
        attractionId: target
      });
    }
  }

  // 3) Rainy today → waterfalls (fuller) or indoor.
  if (isRainy(todayFc)) {
    const mondayClosed = isoWeekday(today) === 1;
    if (!mondayClosed && !done.has('saltos_petrohue')) {
      out.push({
        level: 'GOOD',
        emoji: '🌧️',
        title: 'Chuva hoje? Ótimo pros Saltos del Petrohué',
        body: 'Com chuva o caudal aumenta e as quedas ficam espetaculares — e com menos gente. Leve impermeável de verdade.',
        attractionId: 'saltos_petrohue'
      });
    } else {
      const indoor = firstNotDone(['frutillar', 'puerto_montt', 'mercado_municipal', 'casa_valdes'], done);
      out.push({
        level: 'GOOD',
        emoji: '🌧️',
        title: 'Dia de chuva — vá pro plano coberto',
        body: mondayClosed
          ? 'Os Saltos fecham às segundas. Aproveite pra Frutillar (Teatro del Lago + kuchen), museus ou uma cervejaria.'
          : 'Bom dia pra cidade, café com kuchen, museu ou um almoço com vista.',
        attractionId: indoor
      });
    }
  }

  // 4) Schedule notes.
  if (isoWeekday(today) === 6) {
    out.push({
      level: 'GOOD',
      emoji: '🛒',
      title: 'Hoje tem Feria Rural!',
      body: 'Produtos rurais e artesanais, 10h–14h. Bom passeio de manhã e abastece o jantar em casa.',
      attractionId: 'feria_rural'
    });
  }
  if (isoWeekday(today) === 1) {
    out.push({
      level: 'WARN',
      emoji: '🚫',
      title: 'Parque dos Saltos fechado hoje',
      body: 'Vicente Pérez Rosales abre terça a domingo (9h–17h). Hoje é segunda — programe os Saltos pra outro dia.',
      attractionId: 'saltos_petrohue'
    });
  }

  // 5) Strong wind.
  if (todayFc.windMax >= 38) {
    out.push({
      level: 'WARN',
      emoji: '💨',
      title: `Vento forte hoje (${Math.round(todayFc.windMax)} km/h)`,
      body: 'Orla, mirantes e a beira do lago vão estar ventosos. Talvez priorize algo mais abrigado ou indoor.'
    });
  }

  const pinned = out[0];
  const rest = out.slice(1).sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]).slice(0, 4);
  return [pinned, ...rest];
}
