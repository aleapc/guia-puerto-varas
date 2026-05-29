<script lang="ts">
  import { base } from '$app/paths';
  import { categoryById, type Attraction } from '$lib/content';
  import { isDone } from '$lib/state.svelte';
  import { isoWeekday, todayISO } from '$lib/dates';
  import Photo from './Photo.svelte';
  import Badge from './Badge.svelte';

  let { a }: { a: Attraction } = $props();

  const cat = categoryById(a.categoryId)!;
  const done = $derived(isDone(a.id));
  const openToday: boolean | null = a.hours?.openDays?.length
    ? a.hours.openDays.includes(isoWeekday(todayISO()))
    : null;
</script>

<a href="{base}/local/{a.id}" class="flex gap-3 rounded-2xl bg-white p-2.5 shadow-sm active:scale-[0.99]">
  <div class="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
    <Photo image={a.image} gradient={cat.gradient} emoji={cat.emoji} heightClass="h-20" alt={a.name} />
  </div>
  <div class="min-w-0 flex-1">
    <div class="flex items-start justify-between gap-2">
      <p class="font-bold leading-tight {done ? 'text-deep/45 line-through' : ''}">{a.name}</p>
      {#if done}<span class="shrink-0 font-bold text-forest">✓</span>{/if}
    </div>
    <p class="line-clamp-1 text-xs text-deep/60">{a.tagline}</p>
    <div class="mt-1.5 flex flex-wrap gap-1.5">
      {#if a.distanceKm}<Badge>📍 {a.distanceKm} km</Badge>{/if}
      <Badge>⏱ {a.durationLabel}</Badge>
      {#if openToday === true}<Badge tone="ok">Aberto hoje</Badge>{:else if openToday === false}<Badge tone="bad">Fechado hoje</Badge>{/if}
    </div>
  </div>
</a>
