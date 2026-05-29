import { browser } from '$app/environment';
import { base } from '$app/paths';
import { seedDecrypt } from './secure.svelte';
import { setCoupleFromDataURL } from './personalize.svelte';

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

export interface Lodging {
  name: string;
  kind?: string;
  address: string;
  checkin: string;
  checkout: string;
  code?: string;
  host?: string;
  phone?: string;
  note?: string;
  mapQuery?: string;
}

export interface Car {
  company: string;
  confirmation?: string;
  code?: string;
  pickup: string;
  pickupAt: string;
  dropoff: string;
  dropoffAt: string;
  phone?: string;
  note?: string;
}

export interface Insurance {
  company: string;
  policy: string;
  phone: string;
  note: string;
}

export interface TripPlan {
  flights: FlightLeg[];
  lodgings: Lodging[];
  cars: Car[];
  insurance: Insurance;
  docsNote: string;
  /** Optional couple photo (data URL) carried inside the encrypted bundle. */
  couplePhoto?: string;
}

function emptyTrip(): TripPlan {
  return { flights: [], lodgings: [], cars: [], insurance: { company: '', policy: '', phone: '', note: '' }, docsNote: '' };
}

// Generic/empty in the repo — the REAL data lives only inside the encrypted bundle
// (static/trip-seed.txt) and is decrypted in memory with the shared password.
export const tripPlan = $state<TripPlan>(emptyTrip());
export const tripState = $state<{ unlocked: boolean }>({ unlocked: false });

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

/** Decrypt the committed bundle with the shared password and populate the trip (in memory only). */
export async function loadSeedFromRepo(password: string): Promise<boolean> {
  if (!browser) return false;
  try {
    const r = await fetch(`${base}/trip-seed.txt`, { cache: 'no-store' });
    if (!r.ok) return false;
    const cipher = (await r.text()).trim();
    if (!cipher.startsWith('gpvseed:')) return false;
    const obj = JSON.parse(await seedDecrypt(cipher, password));
    Object.assign(tripPlan, { ...emptyTrip(), ...obj });
    if (obj.couplePhoto) {
      await setCoupleFromDataURL(obj.couplePhoto);
    }
    tripState.unlocked = true;
    return true;
  } catch {
    return false;
  }
}
