<script lang="ts">
  import { base } from '$app/paths';
  import { categories } from '$lib/content';
  import { weatherStore, doneStore, refreshWeather } from '$lib/state.svelte';
  import { buildAlerts } from '$lib/alerts';
  import { buildPlan } from '$lib/plan';
  import { tripDayLabel, todayISO } from '$lib/dates';
  import WeatherStrip from '$lib/components/WeatherStrip.svelte';
  import AlertCard from '$lib/components/AlertCard.svelte';
  import CategoryCard from '$lib/components/CategoryCard.svelte';

  const today = todayISO();
  let refreshing = $state(false);

  const alerts = $derived(buildAlerts(weatherStore.data, doneStore.ids, today));
  const plan = $derived(buildPlan(weatherStore.data, doneStore.ids, today));

  async function doRefresh() {
    refreshing = true;
    await refreshWeather();
    refreshing = false;
  }
</script>

<header class="relative overflow-hidden rounded-b-3xl bg-gradient-to-br from-deep to-teal px-5 pb-6 pt-6 text-white">
  <button
    onclick={doRefresh}
    class="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/20 text-xl"
    aria-label="Atualizar previsão"
  >
    <span class={refreshing ? 'inline-block animate-spin' : 'inline-block'}>↻</span>
  </button>
  <span class="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold">{tripDayLabel(today)}</span>
  <h1 class="mt-2 text-3xl font-bold leading-tight">Puerto Varas</h1>
  <p class="text-sm text-white/90">Alê &amp; Andréia · região dos lagos 🇨🇱</p>
</header>

<main class="space-y-6 p-4 pb-12">
  <!-- Plano de hoje -->
  <section>
    <h2 class="mb-2 text-lg font-bold">📋 Plano de hoje</h2>
    <div class="rounded-2xl bg-white p-4 shadow-sm">
      <p class="font-bold">{plan.title}</p>
      <p class="mt-0.5 text-sm text-deep/70">{plan.reason}</p>
      {#if plan.emptyMsg}
        <p class="mt-3 text-sm">{plan.emptyMsg}</p>
      {:else}
        <ul class="mt-3 space-y-2.5">
          {#each plan.items as it (it.when)}
            <li class="flex gap-3">
              <span class="mt-0.5 w-24 shrink-0 text-[11px] font-bold uppercase tracking-wide text-teal">{it.when}</span>
              <div class="min-w-0">
                <a href="{base}/local/{it.id}" class="font-semibold underline decoration-teal/40 underline-offset-2">{it.name}</a>
                <p class="text-xs text-deep/60">{it.why}</p>
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </section>

  <!-- Previsão -->
  <section>
    <h2 class="mb-2 text-lg font-bold">🌤️ Previsão dos próximos dias</h2>
    <WeatherStrip data={weatherStore.data} loading={weatherStore.loading} {today} />
  </section>

  <!-- Alertas -->
  <section>
    <h2 class="mb-2 text-lg font-bold">💡 Dicas &amp; alertas</h2>
    <div class="space-y-2">
      {#each alerts as alert (alert.title)}
        <AlertCard {alert} />
      {/each}
    </div>
  </section>

  <!-- Categorias -->
  <section>
    <h2 class="mb-2 text-lg font-bold">🧭 Explorar por categoria</h2>
    <div class="grid grid-cols-2 gap-3">
      {#each categories as c (c.id)}
        <CategoryCard category={c} />
      {/each}
    </div>
  </section>

  <p class="pt-1 text-center text-xs text-deep/50">
    Previsão Open-Meteo · funciona offline · toque ↻ no wi-fi para atualizar
  </p>
</main>
