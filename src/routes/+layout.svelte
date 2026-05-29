<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { ensureWeather } from '$lib/state.svelte';
  import { lock, initLock, unlock, resetProtected } from '$lib/secure.svelte';

  let { children } = $props();
  let pin = $state('');
  let err = $state(false);

  onMount(() => {
    initLock();
    ensureWeather();
  });

  async function doUnlock() {
    err = false;
    const ok = await unlock(pin);
    if (!ok) {
      err = true;
      pin = '';
    }
  }

  function forgot() {
    if (confirm('Isso APAGA os dados protegidos (viagem e anexos) deste aparelho, pois estão cifrados com o PIN. Continuar?')) {
      resetProtected();
      location.reload();
    }
  }
</script>

<div class="mx-auto min-h-dvh max-w-md bg-sand">
  {#if lock.ready && lock.enabled && lock.locked}
    <div
      class="flex min-h-dvh flex-col items-center justify-center gap-4 bg-gradient-to-br from-deep to-teal p-8 text-white"
      style="padding-top: calc(env(safe-area-inset-top) + 2rem)"
    >
      <span class="text-5xl">🔒</span>
      <h1 class="text-xl font-bold">Guia Puerto Varas</h1>
      <p class="max-w-xs text-center text-sm text-white/80">Digite o PIN para desbloquear seus dados de viagem neste aparelho.</p>
      <input
        bind:value={pin}
        type="password"
        inputmode="numeric"
        autocomplete="off"
        onkeydown={(e) => e.key === 'Enter' && doUnlock()}
        class="w-44 rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-center text-2xl tracking-widest text-white outline-none"
      />
      {#if err}<p class="text-sm text-red-200">PIN incorreto.</p>{/if}
      <button onclick={doUnlock} class="rounded-xl bg-white px-10 py-3 font-bold text-deep">Desbloquear</button>
      <button onclick={forgot} class="mt-2 text-xs text-white/50 underline">Esqueci o PIN</button>
    </div>
  {:else}
    {@render children()}
  {/if}
</div>
