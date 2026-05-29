<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { ensureWeather } from '$lib/state.svelte';

  let { children } = $props();

  onMount(() => {
    ensureWeather();
  });
</script>

<div class="mx-auto min-h-dvh max-w-md bg-sand">
  {@render children()}
</div>
