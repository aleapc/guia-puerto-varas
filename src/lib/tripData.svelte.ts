import { browser } from '$app/environment';
import { base } from '$app/paths';
import localforage from 'localforage';
import { encryptStr, decryptStr, encryptBlob, decryptBlob, seedEncrypt, seedDecrypt } from './secure.svelte';

export interface FlightLeg {
  journey: string;
  date: string;
  airline: string;
  flightNo: string;
  from: string;
  to: string;
  depart: string;
  arrive: string;
}

export interface TripPlan {
  flights: FlightLeg[];
  stayName: string;
  stayAddress: string;
  stayCheckin: string;
  stayCheckout: string;
  stayCode: string;
  stayNote: string;
  carCompany: string;
  carPickup: string;
  carDropoff: string;
  carCode: string;
  carNote: string;
  docsNote: string;
}

// Generic skeleton only — NO real reservation data in the repo. The real data lives
// only on the device (typed/imported by the user), encrypted if a PIN is set.
const DEFAULT_TRIP: TripPlan = {
  flights: [
    { journey: 'Ida', date: '2026-06-03', airline: 'LATAM', flightNo: '', from: 'GRU São Paulo', to: 'SCL Santiago', depart: '', arrive: '' },
    { journey: 'Ida · conexão', date: '2026-06-04', airline: 'LATAM', flightNo: '', from: 'SCL Santiago', to: 'PMC Puerto Montt', depart: '', arrive: '' },
    { journey: 'Volta', date: '2026-06-13', airline: 'LATAM', flightNo: '', from: 'PMC Puerto Montt', to: 'SCL Santiago', depart: '', arrive: '' },
    { journey: 'Volta · conexão', date: '2026-06-14', airline: 'LATAM', flightNo: '', from: 'SCL Santiago', to: 'GRU São Paulo', depart: '', arrive: '' }
  ],
  stayName: 'Airbnb Puerto Varas',
  stayAddress: '',
  stayCheckin: '2026-06-04',
  stayCheckout: '2026-06-13',
  stayCode: '',
  stayNote: '',
  carCompany: '',
  carPickup: '',
  carDropoff: '',
  carCode: '',
  carNote: '',
  docsNote: ''
};

export const tripPlan = $state<TripPlan>(structuredClone(DEFAULT_TRIP));

/** Load saved trip from the device (decrypting if a PIN is active). Call after unlock/mount. */
export async function loadTripFromStorage() {
  if (!browser) return;
  const raw = localStorage.getItem('gpv-trip');
  if (!raw) return;
  try {
    const obj = JSON.parse(await decryptStr(raw));
    Object.assign(tripPlan, { ...structuredClone(DEFAULT_TRIP), ...obj });
  } catch {
    /* locked or corrupt — keep defaults */
  }
}

export async function persistTrip() {
  if (!browser) return;
  try {
    localStorage.setItem('gpv-trip', await encryptStr(JSON.stringify(tripPlan)));
  } catch {
    /* ignore */
  }
}

/** Whether an encrypted trip bundle was committed to the repo (static/trip-seed.txt). */
export async function seedExistsInRepo(): Promise<boolean> {
  if (!browser) return false;
  try {
    const r = await fetch(`${base}/trip-seed.txt`, { cache: 'no-store' });
    if (!r.ok) return false;
    return (await r.text()).trim().startsWith('gpvseed:');
  } catch {
    return false;
  }
}

/** Decrypt the committed bundle with the shared password and populate the trip. */
export async function loadSeedFromRepo(password: string): Promise<boolean> {
  if (!browser) return false;
  try {
    const r = await fetch(`${base}/trip-seed.txt`, { cache: 'no-store' });
    if (!r.ok) return false;
    const cipher = (await r.text()).trim();
    if (!cipher.startsWith('gpvseed:')) return false;
    const obj = JSON.parse(await seedDecrypt(cipher, password));
    Object.assign(tripPlan, { ...structuredClone(DEFAULT_TRIP), ...obj });
    return true;
  } catch {
    return false;
  }
}

/** Produce the encrypted bundle string to commit to the repo. */
export async function generateSeedString(password: string): Promise<string> {
  return seedEncrypt(JSON.stringify(tripPlan), password);
}

// ---------- Attachments (IndexedDB via localforage, encrypted blobs when a PIN is set) ----------

const store = browser ? localforage.createInstance({ name: 'gpv', storeName: 'attachments' }) : null;

export interface AttachmentMeta {
  id: string;
  name: string;
  kind: 'image' | 'file';
}

export function loadAttachMeta(): AttachmentMeta[] {
  if (!browser) return [];
  try {
    return JSON.parse(localStorage.getItem('gpv-attach-meta') ?? '[]');
  } catch {
    return [];
  }
}

function saveAttachMeta(list: AttachmentMeta[]) {
  if (browser) localStorage.setItem('gpv-attach-meta', JSON.stringify(list));
}

export async function addAttachment(file: File): Promise<AttachmentMeta> {
  const id = `att_${Date.now()}_${Math.round(Math.random() * 1e6)}`;
  await store!.setItem(id, await encryptBlob(file));
  const meta: AttachmentMeta = {
    id,
    name: file.name,
    kind: file.type.startsWith('image/') ? 'image' : 'file'
  };
  saveAttachMeta([...loadAttachMeta(), meta]);
  return meta;
}

export async function getAttachmentURL(id: string): Promise<string | null> {
  if (!store) return null;
  const blob = await store.getItem<Blob>(id);
  if (!blob) return null;
  return URL.createObjectURL(await decryptBlob(blob));
}

export async function removeAttachment(id: string) {
  if (store) await store.removeItem(id);
  saveAttachMeta(loadAttachMeta().filter((m) => m.id !== id));
}

/** Re-encrypt existing attachments after a PIN is set (they were stored in plaintext). */
export async function reencryptAttachments() {
  if (!store) return;
  for (const m of loadAttachMeta()) {
    const blob = await store.getItem<Blob>(m.id);
    if (blob && !blob.type.includes('x-gpv-enc')) {
      await store.setItem(m.id, await encryptBlob(blob));
    }
  }
}
