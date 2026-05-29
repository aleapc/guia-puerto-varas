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
    generateSeedString,
    type AttachmentMeta
  } from '$lib/tripData.svelte';
  import { lock, setPin } from '$lib/secure.svelte';
  import { reencryptCouple } from '$lib/personalize.svelte';

  let loaded = $state(false);
  let pw1 = $state('');
  let pw2 = $state('');
  let savingPin = $state(false);
  let pinMsg = $state('');

  function strength(p: string): string {
    if (!p) return '';
    if (p.length < 8) return 'curta (mín. 8)';
    let classes = 0;
    if (/[a-z]/.test(p)) classes++;
    if (/[A-Z]/.test(p)) classes++;
    if (/[0-9]/.test(p)) classes++;
    if (/[^A-Za-z0-9]/.test(p)) classes++;
    if (p.length >= 12 && classes >= 3) return 'forte ✅';
    if (p.length >= 10 && classes >= 2) return 'ok';
    return 'fraca';
  }

  // Persist on change — but only after the initial load, to avoid overwriting saved data.
  $effect(() => {
    JSON.stringify(tripPlan);
    if (loaded) persistTrip();
  });

  async function protectWithPassword() {
    if (pw1.length < 8) {
      pinMsg = 'Use ao menos 8 caracteres.';
      return;
    }
    if (pw1 !== pw2) {
      pinMsg = 'As senhas não conferem.';
      return;
    }
    savingPin = true;
    await setPin(pw1);
    await persistTrip();
    await reencryptAttachments();
    await reencryptCouple();
    pw1 = '';
    pw2 = '';
    savingPin = false;
    pinMsg = 'Protegido com senha! Ela será pedida ao abrir o app.';
  }

  // Encrypted bundle to commit to the repo (so both phones load it with one shared password).
  let seedPw = $state('');
  let seedOut = $state('');
  let genBusy = $state(false);
  let genMsg = $state('');
  async function genSeed() {
    if (seedPw.length < 8) {
      genMsg = 'Use uma senha de 8+ caracteres (de preferência 5–6 palavras).';
      seedOut = '';
      return;
    }
    genBusy = true;
    seedOut = await generateSeedString(seedPw);
    genBusy = false;
    genMsg = 'Pronto! Copie e cole em static/trip-seed.txt (ou me mande — é texto cifrado, seguro).';
  }
  async function copySeed() {
    try {
      await navigator.clipboard.writeText(seedOut);
      genMsg = 'Copiado!';
    } catch {
      genMsg = 'Selecione e copie manualmente.';
    }
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
      <p class="font-bold text-forest">🔒 Protegido com senha</p>
      <p class="mt-1 text-sm text-deep/70">
        Viagem, anexos e foto de vocês ficam <strong>cifrados (AES-256)</strong> neste aparelho. A senha é pedida ao abrir o app.
      </p>
    {:else}
      <p class="font-bold">🔒 Proteger com senha forte</p>
      <p class="mt-1 text-sm text-deep/70">
        Opcional: cifra a viagem, os anexos e a foto de vocês neste aparelho (AES-256). Só quem tiver a senha
        acessa. Se esquecer a senha, os dados protegidos <strong>se perdem</strong> (não há como recuperar).
      </p>
      <div class="mt-2 space-y-2">
        <input bind:value={pw1} type="password" autocomplete="new-password" placeholder="Senha forte (8+ caracteres)" class={field} />
        <input bind:value={pw2} type="password" autocomplete="new-password" placeholder="Confirme a senha" class={field} />
        {#if pw1}<p class="text-xs text-deep/55">Força: {strength(pw1)}</p>{/if}
        <button
          onclick={protectWithPassword}
          disabled={savingPin}
          class="w-full rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {savingPin ? '…' : 'Ativar criptografia'}
        </button>
      </div>
    {/if}
    {#if pinMsg}<p class="mt-2 text-xs text-deep/60">{pinMsg}</p>{/if}
  </section>

  <!-- Pacote cifrado pro repo (compartilhar entre os 2 celulares) -->
  <section class="rounded-2xl border border-deep/10 bg-white p-4 shadow-sm">
    <p class="font-bold">📦 Levar a viagem pros 2 celulares</p>
    <p class="mt-1 text-sm text-deep/70">
      Gera um <strong>pacote cifrado</strong> dos dados acima pra commitar no repo (em <code>static/trip-seed.txt</code>).
      Aí o seu celular e o da Andréia abrem com <strong>a mesma senha</strong> — sem redigitar tudo.
    </p>
    <div class="mt-2 space-y-2">
      <input bind:value={seedPw} type="password" autocomplete="new-password" placeholder="Senha compartilhada (5–6 palavras)" class={field} />
      <button onclick={genSeed} disabled={genBusy} class="w-full rounded-lg bg-deep px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
        {genBusy ? '…' : 'Gerar pacote cifrado'}
      </button>
      {#if seedOut}
        <textarea readonly rows="3" class="{field} font-mono text-[10px]">{seedOut}</textarea>
        <button onclick={copySeed} class="rounded-lg border border-deep/20 px-4 py-1.5 text-xs font-semibold text-deep">Copiar</button>
      {/if}
      {#if genMsg}<p class="text-xs text-deep/60">{genMsg}</p>{/if}
    </div>
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
