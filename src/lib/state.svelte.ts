import { browser } from '$app/environment';
import { loadWeather, type WeatherData } from './weather';

function load<T>(key: string, fallback: T): T {
  if (!browser) return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function save(key: string, val: unknown) {
  if (!browser) return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    /* ignore */
  }
}

export const weatherStore = $state<{ loading: boolean; data: WeatherData | null }>({
  loading: true,
  data: null
});

export const doneStore = $state<{ ids: string[] }>({ ids: load<string[]>('gpv-done', []) });
export const favStore = $state<{ ids: string[] }>({ ids: load<string[]>('gpv-fav', []) });
export const notesStore = $state<{ map: Record<string, string> }>({
  map: load<Record<string, string>>('gpv-notes', {})
});

let started = false;
/** Fetch the forecast once per app load (network-first, cache fallback). */
export async function ensureWeather() {
  if (started && weatherStore.data) return;
  started = true;
  weatherStore.loading = true;
  weatherStore.data = await loadWeather(true);
  weatherStore.loading = false;
}

export async function refreshWeather() {
  weatherStore.loading = true;
  weatherStore.data = await loadWeather(true);
  weatherStore.loading = false;
}

export function isDone(id: string): boolean {
  return doneStore.ids.includes(id);
}
export function toggleDone(id: string) {
  const i = doneStore.ids.indexOf(id);
  if (i >= 0) doneStore.ids.splice(i, 1);
  else doneStore.ids.push(id);
  save('gpv-done', doneStore.ids);
}

export function isFav(id: string): boolean {
  return favStore.ids.includes(id);
}
export function toggleFav(id: string) {
  const i = favStore.ids.indexOf(id);
  if (i >= 0) favStore.ids.splice(i, 1);
  else favStore.ids.push(id);
  save('gpv-fav', favStore.ids);
}

export function getNote(id: string): string {
  return notesStore.map[id] ?? '';
}
export function setNote(id: string, value: string) {
  notesStore.map[id] = value;
  save('gpv-notes', notesStore.map);
}
