<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { ensureWeather } from '$lib/state.svelte';
  import { lock, initLock, unlock, setPin, resetProtected } from '$lib/secure.svelte';
  import { seedExistsInRepo, loadSeedFromRepo, persistTrip } from '$lib/tripData.svelte';

  let { children } = $props();
  let pin = $state('');
  let err = $state(false);
  let busy = $state(false);
  let needsBootstrap = $state(false);

  onMount(async () => {
    initLock();
    ensureWeather();
    if (!lock.enabled) {
      needsBootstrap = await seedExistsInRepo();
    }
  });

  const showGate = $derived(lock.ready && ((lock.enabled && lock.locked) || needsBootstrap));

  async function doUnlock() {
    if (busy) return;
    err = false;
    busy = true;
    if (lock.enabled) {
      if (!(await unlock(pin))) err = true;
    } else {
      // Fresh device: bootstrap from the encrypted bundle committed to the repo.
      if (await loadSeedFromRepo(pin)) {
        await setPin(pin);
        await persistTrip();
        needsBootstrap = false;
      } else {
        err = true;
      }
    }
    if (err) pin = '';
    busy = false;
  }

  function forgot() {
    if (confirm('Isso APAGA os dados protegidos deste aparelho (ficam cifrados com a senha). Se houver o pacote no repo, dá pra recomeçar com a senha compartilhada. Continuar?')) {
      resetProtected();
      location.reload();
    }
  }
</script>

<div class="mx-auto min-h-dvh max-w-md bg-sand">
  {#if showGate}
    <div
      class="flex min-h-dvh flex-col items-center justify-center gap-4 bg-gradient-to-br from-deep to-teal p-8 text-white"
      style="padding-top: calc(env(safe-area-inset-top) + 2rem)"
    >
      <span class="text-5xl">🔒</span>
      <h1 class="text-xl font-bold">Guia Puerto Varas</h1>
      <p class="max-w-xs text-center text-sm text-white/80">
        {needsBootstrap && !lock.enabled
          ? 'Digite a senha da viagem (a mesma combinada entre vocês) para carregar os dados neste aparelho.'
          : 'Digite sua senha para desbloquear seus dados de viagem.'}
      </p>
      <input
        bind:value={pin}
        type="password"
        autocomplete="current-password"
        placeholder="Senha da viagem"
        onkeydown={(e) => e.key === 'Enter' && doUnlock()}
        class="w-64 rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-center text-lg text-white outline-none placeholder:text-white/40"
      />
      {#if err}<p class="text-sm text-red-200">Senha incorreta.</p>{/if}
      <button onclick={doUnlock} disabled={busy} class="rounded-xl bg-white px-10 py-3 font-bold text-deep disabled:opacity-60">
        {busy ? 'Verificando…' : 'Desbloquear'}
      </button>
      <button onclick={forgot} class="mt-2 text-xs text-white/50 underline">Esqueci a senha</button>
    </div>
  {:else}
    {@render children()}
  {/if}
</div>
