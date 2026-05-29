<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { attractionById, categoryById } from '$lib/content';
  import { weatherStore, isDone, toggleDone, isFav, toggleFav, getNote, setNote } from '$lib/state.svelte';
  import { getPlacePhoto, setPlacePhoto, removePlacePhoto } from '$lib/diary.svelte';
  import { fitHint, fitLabel } from '$lib/insights';
  import { isoWeekday, todayISO } from '$lib/dates';
  import { mapsUrl } from '$lib/maps';
  import { photoCredits } from '$lib/photoCredits';
  import Photo from '$lib/components/Photo.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import Menu from '$lib/components/Menu.svelte';

  let { data } = $props();
  const a = attractionById(data.id)!;
  const cat = categoryById(a.categoryId)!;
  const credit = a.image ? photoCredits[a.image] : undefined;

  const done = $derived(isDone(a.id));
  const fav = $derived(isFav(a.id));
  const hint = $derived(fitHint(a, weatherStore.data));
  const openToday: boolean | null = a.hours?.openDays?.length
    ? a.hours.openDays.includes(isoWeekday(todayISO()))
    : null;

  let note = $state(getNote(a.id));
  function onNote(e: Event) {
    note = (e.target as HTMLTextAreaElement).value;
    setNote(a.id, note);
  }

  let placePhoto = $state<string | null>(null);
  onMount(async () => {
    placePhoto = await getPlacePhoto(a.id);
  });
  async function onPlacePhoto(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files?.[0]) placePhoto = await setPlacePhoto(a.id, input.files[0]);
    input.value = '';
  }
  async function clearPlacePhoto() {
    await removePlacePhoto(a.id);
    placePhoto = null;
  }
</script>

{#snippet bullets(items: string[])}
  <ul class="space-y-1">
    {#each items as it (it)}
      <li class="flex gap-2 text-sm text-deep/85"><span class="text-teal">•</span><span>{it}</span></li>
    {/each}
  </ul>
{/snippet}

<div class="relative">
  <Photo image={a.image} gradient={cat.gradient} emoji={cat.emoji} heightClass="h-52" alt={a.name}>
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10"></div>
    <a
      href="{base}/categoria/{a.categoryId}"
      class="absolute left-3 grid h-9 w-9 place-items-center rounded-full bg-black/35 text-xl text-white"
      style="top: calc(env(safe-area-inset-top) + 0.5rem)"
      aria-label="Voltar">←</a
    >
    <div class="absolute right-3" style="top: calc(env(safe-area-inset-top) + 0.5rem)">
      <Menu tone="light" />
    </div>
    <div class="absolute bottom-3 left-4 right-4 text-white">
      <p class="text-2xl font-bold leading-tight drop-shadow">{a.name}</p>
      <p class="text-sm opacity-90">{a.tagline}</p>
    </div>
  </Photo>
</div>

<main class="space-y-4 p-4 pb-14">
  <div class="flex flex-wrap gap-1.5">
    {#if a.distanceKm}<Badge>📍 {a.distanceKm} km do Airbnb</Badge>{/if}
    {#if a.driveMinutes}<Badge>🚗 {a.driveMinutes} min</Badge>{/if}
    <Badge>⏱ {a.durationLabel}</Badge>
    <Badge>{fitLabel(a.fit)}</Badge>
    {#if a.windSensitive}<Badge>💨 sensível ao vento</Badge>{/if}
    {#if openToday === true}<Badge tone="ok">Aberto hoje</Badge>{:else if openToday === false}<Badge tone="bad">Fechado hoje</Badge>{/if}
  </div>

  {#if hint}
    <div class="flex items-center gap-2 rounded-xl p-3 {hint.positive ? 'bg-teal/12' : 'bg-black/5'} text-deep">
      <span class="text-xl">{hint.emoji}</span>
      <span class="text-sm">{hint.text}</span>
    </div>
  {/if}

  <a
    href={mapsUrl(a)}
    target="_blank"
    rel="noopener"
    class="flex items-center justify-center gap-2 rounded-xl bg-teal py-3 font-semibold text-white"
  >
    📍 Como chegar (Google Maps)
  </a>
  {#if a.links}
    {#each a.links as l (l.url)}
      <a
        href={l.url}
        target="_blank"
        rel="noopener"
        class="flex items-center justify-center rounded-xl border border-deep/20 py-2.5 text-sm font-medium text-deep"
      >
        {l.label} ↗
      </a>
    {/each}
  {/if}

  <div class="flex gap-2">
    <button
      onclick={() => toggleFav(a.id)}
      class="flex-1 rounded-xl py-3 font-semibold {fav ? 'bg-amber-400 text-deep' : 'border border-amber-400 text-amber-600'}"
    >
      {fav ? '⭐ Quero ir' : '☆ Quero ir'}
    </button>
    <button
      onclick={() => toggleDone(a.id)}
      class="flex-1 rounded-xl py-3 font-semibold {done ? 'bg-forest text-white' : 'border border-forest text-forest'}"
    >
      {done ? '✓ Já fizemos' : 'Já fizemos'}
    </button>
  </div>

  {#if a.description}
    <section><h3 class="mb-1 font-bold">📖 Sobre</h3><p class="text-sm leading-relaxed text-deep/85">{a.description}</p></section>
  {/if}
  {#if a.history}
    <details class="rounded-2xl bg-white p-4 shadow-sm">
      <summary class="cursor-pointer font-bold marker:text-teal">📜 Mais sobre o local (história)</summary>
      <p class="mt-2 text-sm leading-relaxed text-deep/80">{a.history}</p>
    </details>
  {/if}
  {#if a.whatToDo?.length}
    <section><h3 class="mb-1 font-bold">✅ O que fazer</h3>{@render bullets(a.whatToDo)}</section>
  {/if}
  {#if a.whatToBring?.length}
    <section><h3 class="mb-1 font-bold">🎒 O que levar</h3>{@render bullets(a.whatToBring)}</section>
  {/if}
  {#if a.whatToWear?.length}
    <section><h3 class="mb-1 font-bold">🧥 O que vestir</h3>{@render bullets(a.whatToWear)}</section>
  {/if}
  {#if a.kingTip}
    <section class="rounded-2xl bg-ember p-4 text-white">
      <p class="font-bold">👑 Dica de rei</p>
      <p class="mt-1 text-sm">{a.kingTip}</p>
    </section>
  {/if}
  {#if a.whereToEat}
    <section><h3 class="mb-1 font-bold">🍽️ Onde comer por perto</h3><p class="text-sm text-deep/85">{a.whereToEat}</p></section>
  {/if}
  {#if a.hours?.note}
    <section><h3 class="mb-1 font-bold">🕒 Horários</h3><p class="text-sm text-deep/85">{a.hours.note}</p></section>
  {/if}

  <section>
    <h3 class="mb-1 font-bold">📝 Minhas anotações & diário</h3>
    <p class="mb-1 text-xs text-deep/55">Cupom, promoção, lembrete… e uma foto de recordação (fica só no aparelho).</p>
    <textarea
      value={note}
      oninput={onNote}
      rows="3"
      class="w-full rounded-xl border border-deep/15 bg-white p-3 text-sm outline-none focus:border-teal"
      placeholder="Escreva aqui…"
    ></textarea>
    <div class="mt-2">
      {#if placePhoto}
        <div class="relative inline-block">
          <img src={placePhoto} alt="Foto do local" class="h-32 w-full max-w-[12rem] rounded-xl object-cover" />
          <button
            onclick={clearPlacePhoto}
            class="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-xs text-white"
            aria-label="Remover foto">×</button>
        </div>
      {:else}
        <label class="inline-block cursor-pointer rounded-xl border border-deep/20 px-4 py-2 text-sm font-semibold text-deep">
          📷 Adicionar foto do local
          <input type="file" accept="image/*" class="hidden" onchange={onPlacePhoto} />
        </label>
      {/if}
    </div>
  </section>

  {#if credit}
    <p class="pt-1 text-center text-[11px] text-deep/40">📷 {credit}</p>
  {/if}
</main>
