<script lang="ts">
  import TopBar from '$lib/components/TopBar.svelte';
  import { emergencyNumbers, emergencyNote, usefulGroups, safetyTips } from '$lib/usefulInfo';

  function mapSearch(q: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  }
</script>

<TopBar title="Informações úteis" />

<main class="space-y-6 p-4 pb-14">
  <!-- Emergency numbers -->
  <section>
    <h2 class="mb-2 text-lg font-bold">🆘 Emergência (Chile)</h2>
    <div class="grid grid-cols-3 gap-2">
      {#each emergencyNumbers as n (n.number)}
        <a
          href="tel:{n.number}"
          class="flex flex-col items-center rounded-2xl bg-red-700 p-3 text-center text-white shadow-sm"
        >
          <span class="text-2xl">{n.emoji}</span>
          <span class="mt-1 text-2xl font-extrabold leading-none">{n.number}</span>
          <span class="mt-1 text-[11px] leading-tight opacity-90">{n.label}</span>
        </a>
      {/each}
    </div>
    <p class="mt-2 text-xs text-deep/55">{emergencyNote}</p>
  </section>

  {#each usefulGroups as g (g.title)}
    <section>
      <h2 class="mb-2 text-lg font-bold">{g.emoji} {g.title}</h2>
      <div class="space-y-2">
        {#each g.places as p (p.name)}
          <div class="rounded-2xl bg-white p-3 shadow-sm">
            <p class="font-bold leading-tight">{p.name}</p>
            {#if p.detail}<p class="text-xs text-deep/60">{p.detail}</p>{/if}
            {#if p.address}<p class="mt-1 text-sm text-deep/80">📍 {p.address}</p>{/if}
            {#if p.note}<p class="mt-1 text-xs text-deep/55">{p.note}</p>{/if}
            <div class="mt-2 flex flex-wrap gap-2">
              {#if p.phone}
                <a href="tel:{p.phone}" class="rounded-lg bg-forest px-3 py-1.5 text-xs font-semibold text-white">📞 Ligar</a>
              {/if}
              {#if p.mapQuery || p.address}
                <a
                  href={mapSearch(p.mapQuery ?? p.address ?? p.name)}
                  target="_blank"
                  rel="noopener"
                  class="rounded-lg border border-deep/20 px-3 py-1.5 text-xs font-semibold text-deep">🗺️ Mapa</a
                >
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </section>
  {/each}

  <section>
    <h2 class="mb-2 text-lg font-bold">💡 Dicas de segurança & saúde</h2>
    <ul class="space-y-1 rounded-2xl bg-white p-4 shadow-sm">
      {#each safetyTips as t (t)}
        <li class="flex gap-2 text-sm text-deep/85"><span class="text-teal">•</span><span>{t}</span></li>
      {/each}
    </ul>
  </section>

  <p class="text-center text-[11px] text-deep/40">
    Em emergência real, ligue 131/132/133 — esses não falham. Demais telefones: confirme in loco.
  </p>
</main>
