<script lang="ts">
  import { base } from '$app/paths';
  import { attractionsOf, categoryById } from '$lib/content';
  import Photo from '$lib/components/Photo.svelte';
  import PlaceCard from '$lib/components/PlaceCard.svelte';

  let { data } = $props();
  const category = categoryById(data.id)!;
  const places = attractionsOf(data.id);
</script>

<div class="relative">
  <Photo
    image={category.image}
    gradient={category.gradient}
    emoji={category.emoji}
    heightClass="h-40"
    alt={category.title}
  >
    <div class="absolute inset-0 bg-gradient-to-t from-black/65 to-black/10"></div>
    <a
      href="{base}/"
      class="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/35 text-xl text-white"
      aria-label="Voltar">←</a
    >
    <div class="absolute bottom-3 left-4 right-4 text-white">
      <p class="text-2xl font-bold drop-shadow">{category.emoji} {category.title}</p>
      <p class="text-sm opacity-90">{category.summary}</p>
    </div>
  </Photo>
</div>

<main class="space-y-3 p-4 pb-12">
  {#each places as a (a.id)}
    <PlaceCard {a} />
  {/each}
</main>
