import { attractionById, attractions, type Attraction } from './content';
import { clearScore, forDate, isRainy, sunshineFraction, type WeatherData } from './weather';
import { isoWeekday, todayISO } from './dates';

export interface PlanItem {
  when: string;
  id: string;
  name: string;
  why: string;
}

export interface DayPlan {
  title: string;
  reason: string;
  items: PlanItem[];
  emptyMsg?: string;
}

function openToday(a: Attraction, today: string): boolean {
  const days = a.hours?.openDays;
  if (!days || days.length === 0) return true;
  return days.includes(isoWeekday(today));
}

function pick(ids: string[], pool: Set<string>): string | undefined {
  return ids.find((id) => pool.has(id));
}

export function buildPlan(
  weather: WeatherData | null,
  doneIds: string[] = [],
  today = todayISO()
): DayPlan {
  const done = new Set(doneIds);
  const candidates = new Set(
    attractions.filter((a) => !done.has(a.id) && openToday(a, today)).map((a) => a.id)
  );

  const todayFc = weather ? forDate(weather, today) ?? weather.days[0] : undefined;
  const score = todayFc ? clearScore(todayFc) : 0.4;
  const rainy = todayFc ? isRainy(todayFc) : false;
  const sunPct = todayFc ? Math.round(sunshineFraction(todayFc) * 100) : 0;
  const rainPct = todayFc ? todayFc.precipProbMax : 0;

  let mode: 'clear' | 'rainy' | 'mixed';
  if (rainy) mode = 'rainy';
  else if (score >= 0.5) mode = 'clear';
  else mode = 'mixed';

  const mainPrefs: Record<typeof mode, string[]> = {
    clear: ['osorno', 'todos_los_santos', 'puerto_octay', 'philippi', 'costanera', 'frutillar', 'vuelta_lago'],
    rainy: ['saltos_petrohue', 'frutillar', 'puerto_montt', 'centro', 'mercado_municipal'],
    mixed: ['frutillar', 'costanera', 'vuelta_lago', 'centro', 'ensenada']
  };

  const items: PlanItem[] = [];

  const mainId = pick(mainPrefs[mode], candidates);
  if (mainId) {
    candidates.delete(mainId);
    const a = attractionById(mainId)!;
    const why =
      mode === 'clear'
        ? 'aproveita a janela de céu aberto'
        : mode === 'rainy'
          ? 'bom mesmo (ou melhor) com chuva'
          : 'flexível pro tempo instável';
    items.push({ when: 'Manhã / tarde', id: a.id, name: a.name, why });
  }

  // A meal (restaurants repeat — prefer not-done, but fall back so there's always a suggestion).
  const mealId =
    pick(['mesa_tropera', 'casa_valdes', 'santo_fuego', 'la_olla', 'ibis'], candidates) ??
    'casa_valdes';
  const meal = attractionById(mealId)!;
  items.push({
    when: mode === 'clear' ? 'Almoço com vista' : 'Refeição quentinha',
    id: meal.id,
    name: meal.name,
    why: meal.tagline.toLowerCase()
  });

  // Clear evening → sunset on the shore (if not already the main and not done).
  if (mode === 'clear' && candidates.has('costanera')) {
    candidates.delete('costanera');
    items.push({ when: 'Fim de tarde', id: 'costanera', name: 'Costanera', why: 'pôr do sol com o Osorno ao fundo' });
  } else if (mode !== 'clear') {
    // Otherwise suggest stocking up for dinner at home.
    const market = pick(['mercado_municipal', 'jumbo', 'feria_rural'], candidates);
    if (market) {
      const m = attractionById(market)!;
      items.push({ when: 'A caminho de casa', id: m.id, name: m.name, why: 'pro jantar no Airbnb' });
    }
  }

  const title = mode === 'clear' ? 'Dia de céu limpo ☀️' : mode === 'rainy' ? 'Dia de chuva 🌧️' : 'Tempo misto ⛅';
  const reason = !todayFc
    ? 'Sem previsão agora — sugestões gerais. Conecte ao wi-fi pra afinar pelo tempo.'
    : mode === 'clear'
      ? `Céu deve abrir (${sunPct}% de sol, chuva ${rainPct}%). Dia de aproveitar as vistas e os vulcões.`
      : mode === 'rainy'
        ? `Previsão de chuva (${rainPct}%). Melhor dia pra quedas d'água, cidade e planos cobertos.`
        : `Tempo instável (${rainPct}% de chuva, ${sunPct}% de sol). Vá de algo flexível.`;

  const empty = items.length === 0 ? 'Vocês já fizeram quase tudo da lista! 🎉 Repita um favorito ou relaxe no Airbnb.' : undefined;

  return { title, reason, items, emptyMsg: empty };
}
