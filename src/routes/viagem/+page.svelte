<script lang="ts">
  import { onMount } from 'svelte';
  import TopBar from '$lib/components/TopBar.svelte';
  import {
    tripPlan,
    persistTrip,
    loadTripFromStorage,
    addAttachment,
    getAttachmentURL,
    loadAttachMeta,
    removeAttachment,
    reencryptAttachments,
    type AttachmentMeta
  } from '$lib/tripData.svelte';
  import { lock, setPin } from '$lib/secure.svelte';
  import { reencryptCouple } from '$lib/personalize.svelte';

  let loaded = $state(false);
  let pin1 = $state('');
  let savingPin = $state(false);
  let pinMsg = $state('');

  // Persist on change — but only after the initial load, to avoid overwriting saved data.
  $effect(() => {
    JSON.stringify(tripPlan);
    if (loaded) persistTrip();
  });

  async function protectWithPin() {
    if (pin1.length < 4) {
      pinMsg = 'Use ao menos 4 dígitos.';
      return;
    }
    savingPin = true;
    await setPin(pin1);
    await persistTrip();
    await reencryptAttachments();
    await reencryptCouple();
    pin1 = '';
    savingPin = false;
    pinMsg = 'Protegido! O PIN será pedido ao abrir o app.';
  }

  const field = 'w-full rounded-lg border border-deep/15 bg-white px-3 py-2 text-sm outline-none focus:border-teal';
  const lbl = 'text-[11px] font-semibold uppercase tracking-wide text-deep/50';

  let attachments = $state<{ meta: AttachmentMeta; url: string | null }[]>([]);

  onMount(async () => {
    await loadTripFromStorage();
    const metas = loadAttachMeta();
    attachments = await Promise.all(metas.map(async (m) => ({ meta: m, url: await getAttachmentURL(m.id) })));
    loaded = true;
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
    Tudo aqui fica salvo <strong>só no seu aparelho</strong> — nunca sobe pra internet nem entra no código do app.
    Preencha voos, hospedagem e carro; anexe os comprovantes (foto/PDF) abaixo.
  </p>

  <!-- Proteção por PIN -->
  <section class="rounded-2xl border border-deep/10 bg-white p-4 shadow-sm">
    {#if lock.enabled}
      <p class="font-bold text-forest">🔒 Protegido com PIN</p>
      <p class="mt-1 text-sm text-deep/70">
        Viagem e anexos ficam <strong>cifrados</strong> neste aparelho. O PIN é pedido ao abrir o app.
      </p>
    {:else}
      <p class="font-bold">🔒 Proteger com um PIN</p>
      <p class="mt-1 text-sm text-deep/70">
        Opcional: cifra a viagem e os anexos no aparelho e pede um PIN ao abrir. Se esquecer o PIN, os dados
        protegidos se perdem (não há como recuperar).
      </p>
      <div class="mt-2 flex gap-2">
        <input bind:value={pin1} type="password" inputmode="numeric" placeholder="PIN (4+ dígitos)" class="{field} flex-1" />
        <button
          onclick={protectWithPin}
          disabled={savingPin}
          class="rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {savingPin ? '…' : 'Ativar'}
        </button>
      </div>
    {/if}
    {#if pinMsg}<p class="mt-2 text-xs text-deep/60">{pinMsg}</p>{/if}
  </section>

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
        placeholder="Ticket de bagagem despachada, passaportes, seguros, lembretes…"
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
