import { browser } from '$app/environment';
import localforage from 'localforage';

// "Foto de nós 2" — guardada SÓ no aparelho (IndexedDB), nunca sobe pra internet.
const store = browser ? localforage.createInstance({ name: 'gpv', storeName: 'personalize' }) : null;

export const couple = $state<{ url: string | null }>({ url: null });

export async function loadCouple() {
  if (!store) return;
  const blob = await store.getItem<Blob>('photo');
  couple.url = blob ? URL.createObjectURL(blob) : null;
}

export async function setCouple(file: File) {
  if (!store) return;
  await store.setItem('photo', file);
  couple.url = URL.createObjectURL(file);
}
