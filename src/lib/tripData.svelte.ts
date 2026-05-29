import { browser } from '$app/environment';
import localforage from 'localforage';

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

// Pré-preenchido com os voos e o Airbnb dos prints (editável depois).
const DEFAULT_TRIP: TripPlan = {
  flights: [
    { journey: 'Ida · qua 03/jun', date: '2026-06-03', airline: 'LATAM', flightNo: 'LA751', from: 'GRU São Paulo', to: 'SCL Santiago', depart: '17:45', arrive: '21:05' },
    { journey: 'Ida · conexão (qui 04)', date: '2026-06-04', airline: 'LATAM', flightNo: 'LA257', from: 'SCL Santiago', to: 'PMC Puerto Montt', depart: '06:00', arrive: '07:46' },
    { journey: 'Volta · sáb 13/jun', date: '2026-06-13', airline: 'LATAM', flightNo: 'LA60', from: 'PMC Puerto Montt', to: 'SCL Santiago', depart: '20:16', arrive: '21:59' },
    { journey: 'Volta · conexão (dom 14)', date: '2026-06-14', airline: 'LATAM', flightNo: 'LA8153', from: 'SCL Santiago', to: 'GRU São Paulo', depart: '04:55', arrive: '10:05' }
  ],
  stayName: 'Airbnb Puerto Varas',
  stayAddress: 'Ruta 225 (Camino a Ensenada), ao lado do Colegio Alemán, Puerto Varas',
  stayCheckin: '2026-06-04',
  stayCheckout: '2026-06-13',
  stayCode: '',
  stayNote: '',
  carCompany: '',
  carPickup: 'Aeroporto El Tepual (PMC)',
  carDropoff: 'Aeroporto El Tepual (PMC)',
  carCode: '',
  carNote: '',
  docsNote: ''
};

function loadTrip(): TripPlan {
  if (!browser) return structuredClone(DEFAULT_TRIP);
  try {
    const v = localStorage.getItem('gpv-trip');
    return v ? { ...structuredClone(DEFAULT_TRIP), ...JSON.parse(v) } : structuredClone(DEFAULT_TRIP);
  } catch {
    return structuredClone(DEFAULT_TRIP);
  }
}

export const tripPlan = $state<TripPlan>(loadTrip());

export function persistTrip() {
  if (browser) {
    try {
      localStorage.setItem('gpv-trip', JSON.stringify(tripPlan));
    } catch {
      /* ignore */
    }
  }
}

// ---------- Attachments (IndexedDB via localforage) ----------

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
  await store!.setItem(id, file);
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
  return blob ? URL.createObjectURL(blob) : null;
}

export async function removeAttachment(id: string) {
  if (store) await store.removeItem(id);
  saveAttachMeta(loadAttachMeta().filter((m) => m.id !== id));
}
