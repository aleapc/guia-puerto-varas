<script lang="ts">
  import { onMount } from 'svelte';
  import TopBar from '$lib/components/TopBar.svelte';
  import {
    tripPlan,
    persistTrip,
    addAttachment,
    getAttachmentURL,
    loadAttachMeta,
    removeAttachment,
    type AttachmentMeta
  } from '$lib/tripData.svelte';

  // Persist on any change.
  $effect(() => {
    JSON.stringify(tripPlan);
    persistTrip();
  });

  const field = 'w-full rounded-lg border border-deep/15 bg-white px-3 py-2 text-sm outline-none focus:border-teal';
  const lbl = 'text-[11px] font-semibold uppercase tracking-wide text-deep/50';

  let attachments = $state<{ meta: AttachmentMeta; url: string | null }[]>([]);

  onMount(async () => {
    const metas = loadAttachMeta();
    attachments = await Promise.all(metas.map(async (m) => ({ meta: m, url: await getAttachmentURL(m.id) })));
  });

  async function onFile(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files) return;
    for (const f of Array.from(input.files)) {
      const meta = await addAttachment(f);
      const url = await getAttachmentURL(meta.id);
      attachments = [...attachments, { meta, url }];
    }
    input.value = '';
  }

  async function del(id: string) {
    await removeAttachment(id);
    attachments = attachments.filter((a) => a.meta.id !== id);
  }
</script>

<TopBar title="Nossa viagem" />

<main class="space-y-6 p-4 pb-14">
  <p class="text-sm text-deep/70">
    Já deixei seus voos e o Airbnb preenchidos (dos prints). Edite à vontade — tudo fica salvo <strong>no seu
    aparelho</strong>. Códigos de reserva entram como texto; comprovantes você anexa como foto/arquivo abaixo.
  </p>

  <!-- VOOS -->
  <section>
    <h2 class="mb-2 text-lg font-bold">✈️ Voos</h2>
    <div class="space-y-3">
      {#each tripPlan.flights as f, i (i)}
        <div class="rounded-2xl bg-white p-3 shadow-sm">
          <input class="{field} mb-2 font-semibold" bind:value={tripPlan.flights[i].journey} />
          <div class="grid grid-cols-2 gap-2">
            <div><span class={lbl}>Cia</span><input class={field} bind:value={tripPlan.flights[i].airline} /></div>
            <div><span class={lbl}>Voo</span><input class={field} bind:value={tripPlan.flights[i].flightNo} /></div>
            <div><span class={lbl}>De</span><input class={field} bind:value={tripPlan.flights[i].from} /></div>
            <div><span class={lbl}>Para</span><input class={field} bind:value={tripPlan.flights[i].to} /></div>
            <div><span class={lbl}>Partida</span><input class={field} bind:value={tripPlan.flights[i].depart} /></div>
            <div><span class={lbl}>Chegada</span><input class={field} bind:value={tripPlan.flights[i].arrive} /></div>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- HOSPEDAGEM -->
  <section>
    <h2 class="mb-2 text-lg font-bold">🏠 Hospedagem</h2>
    <div class="space-y-2 rounded-2xl bg-white p-3 shadow-sm">
      <div><span class={lbl}>Nome</span><input class={field} bind:value={tripPlan.stayName} /></div>
      <div><span class={lbl}>Endereço</span><input class={field} bind:value={tripPlan.stayAddress} /></div>
      <div class="grid grid-cols-2 gap-2">
        <div><span class={lbl}>Check-in</span><input class={field} type="date" bind:value={tripPlan.stayCheckin} /></div>
        <div><span class={lbl}>Check-out</span><input class={field} type="date" bind:value={tripPlan.stayCheckout} /></div>
      </div>
      <div><span class={lbl}>Código de reserva</span><input class={field} bind:value={tripPlan.stayCode} /></div>
      <div><span class={lbl}>Anotações</span><input class={field} bind:value={tripPlan.stayNote} /></div>
    </div>
  </section>

  <!-- CARRO -->
  <section>
    <h2 class="mb-2 text-lg font-bold">🚗 Aluguel de carro</h2>
    <div class="space-y-2 rounded-2xl bg-white p-3 shadow-sm">
      <div><span class={lbl}>Locadora</span><input class={field} bind:value={tripPlan.carCompany} placeholder="ex.: Hertz, Europcar…" /></div>
      <div class="grid grid-cols-2 gap-2">
        <div><span class={lbl}>Retirada</span><input class={field} bind:value={tripPlan.carPickup} /></div>
        <div><span class={lbl}>Devolução</span><input class={field} bind:value={tripPlan.carDropoff} /></div>
      </div>
      <div><span class={lbl}>Código de reserva</span><input class={field} bind:value={tripPlan.carCode} /></div>
      <div><span class={lbl}>Anotações</span><input class={field} bind:value={tripPlan.carNote} /></div>
    </div>
  </section>

  <!-- DOCUMENTOS -->
  <section>
    <h2 class="mb-2 text-lg font-bold">📎 Documentos & comprovantes</h2>
    <div class="space-y-3 rounded-2xl bg-white p-3 shadow-sm">
      <textarea
        class="{field} h-20"
        bind:value={tripPlan.docsNote}
        placeholder="Passaportes, seguros, lembretes…"
      ></textarea>
      <label class="block">
        <span class="inline-block cursor-pointer rounded-xl bg-teal px-4 py-2 text-sm font-semibold text-white">
          + Anexar foto / arquivo
        </span>
        <input type="file" accept="image/*,application/pdf" multiple class="hidden" onchange={onFile} />
      </label>
      {#if attachments.length}
        <div class="grid grid-cols-3 gap-2">
          {#each attachments as a (a.meta.id)}
            <div class="relative overflow-hidden rounded-xl border border-deep/10">
              {#if a.meta.kind === 'image' && a.url}
                <img src={a.url} alt={a.meta.name} class="h-24 w-full object-cover" />
              {:else}
                <div class="flex h-24 flex-col items-center justify-center bg-black/5 p-1 text-center">
                  <span class="text-2xl">📄</span>
                  <span class="line-clamp-2 text-[10px] text-deep/60">{a.meta.name}</span>
                </div>
              {/if}
              <button
                onclick={() => del(a.meta.id)}
                class="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-xs text-white"
                aria-label="Remover">×</button>
            </div>
          {/each}
        </div>
      {/if}
      <p class="text-[11px] text-deep/45">Anexos ficam só neste aparelho (não sobem pra internet).</p>
    </div>
  </section>
</main>
