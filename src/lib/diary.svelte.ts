import { browser } from '$app/environment';
import localforage from 'localforage';

// Travel diary: one photo per place, stored only on the device (IndexedDB).
const store = browser ? localforage.createInstance({ name: 'gpv', storeName: 'placephotos' }) : null;

export async function getPlacePhoto(id: string): Promise<string | null> {
  if (!store) return null;
  const blob = await store.getItem<Blob>(id);
  return blob ? URL.createObjectURL(blob) : null;
}

export async function setPlacePhoto(id: string, file: File): Promise<string> {
  if (store) await store.setItem(id, file);
  return URL.createObjectURL(file);
}

export async function removePlacePhoto(id: string) {
  if (store) await store.removeItem(id);
}
