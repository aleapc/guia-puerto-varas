<script lang="ts">
  import { browser } from '$app/environment';
  import TopBar from '$lib/components/TopBar.svelte';

  function loadNum(key: string, def: number): number {
    if (!browser) return def;
    const v = Number(localStorage.getItem(key));
    return v > 0 ? v : def;
  }
  // Taxas aproximadas (edite à vontade — ficam salvas).
  let clpPerUsd = $state(loadNum('gpv-rate-clp', 950));
  let brlPerUsd = $state(loadNum('gpv-rate-brl', 5.4));
  let usd = $state(10); // fonte da verdade

  $effect(() => {
    if (browser) {
      localStorage.setItem('gpv-rate-clp', String(clpPerUsd));
      localStorage.setItem('gpv-rate-brl', String(brlPerUsd));
    }
  });

  const clp = $derived(usd * clpPerUsd);
  const brl = $derived(usd * brlPerUsd);
  const num = (v: string) => {
    const n = Number(v.replace(',', '.'));
    return isFinite(n) ? n : 0;
  };
  const fmtCLP = (v: number) => Math.round(v).toLocaleString('es-CL');
  const fmtBRL = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtUSD = (v: number) => v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const field = 'w-full rounded-lg border border-deep/15 bg-white px-3 py-2 text-right text-lg font-semibold outline-none focus:border-teal';

  const phrases: { group: string; items: [string, string][] }[] = [
    {
      group: 'Básico',
      items: [
        ['Olá / Bom dia', 'Hola / Buenos días'],
        ['Obrigado(a)', 'Gracias'],
        ['Por favor', 'Por favor'],
        ['Desculpe', 'Disculpe'],
        ['Você fala português/inglês?', '¿Habla portugués/inglés?'],
        ['Não entendi', 'No entendí']
      ]
    },
    {
      group: 'No restaurante / café',
      items: [
        ['A conta, por favor', 'La cuenta, por favor'],
        ['Sem gelo', 'Sin hielo'],
        ['Aceita cartão?', '¿Aceptan tarjeta?'],
        ['Estava ótimo!', '¡Estuvo riquísimo!'],
        ['Uma mesa para dois', 'Una mesa para dos']
      ]
    },
    {
      group: 'Na rua / dirigindo',
      items: [
        ['Onde fica…?', '¿Dónde queda…?'],
        ['À direita / à esquerda', 'A la derecha / a la izquierda'],
        ['Posto de gasolina', 'Bencinera'],
        ['Encher o tanque', 'Llenar el estanque'],
        ['Estacionamento', 'Estacionamiento']
      ]
    },
    {
      group: 'Compras',
      items: [
        ['Quanto custa?', '¿Cuánto vale?'],
        ['Tem desconto?', '¿Tiene descuento?'],
        ['Só estou olhando', 'Solo estoy mirando']
      ]
    },
    {
      group: 'Emergência',
      items: [
        ['Preciso de ajuda', 'Necesito ayuda'],
        ['Chame uma ambulância', 'Llame una ambulancia'],
        ['Onde fica a farmácia?', '¿Dónde hay una farmacia?'],
        ['Estou perdido(a)', 'Estoy perdido(a)']
      ]
    }
  ];
</script>

<TopBar title="Bolso do viajante" />

<main class="space-y-6 p-4 pb-14">
  <!-- Conversor -->
  <section>
    <h2 class="mb-2 text-lg font-bold">💱 Conversor</h2>
    <div class="space-y-2 rounded-2xl bg-white p-4 shadow-sm">
      <label class="flex items-center gap-2">
        <span class="w-16 text-sm font-semibold text-deep/70">🇨🇱 CLP</span>
        <input class={field} inputmode="decimal" value={fmtCLP(clp)} oninput={(e) => (usd = num((e.target as HTMLInputElement).value) / clpPerUsd)} />
      </label>
      <label class="flex items-center gap-2">
        <span class="w-16 text-sm font-semibold text-deep/70">🇧🇷 BRL</span>
        <input class={field} inputmode="decimal" value={fmtBRL(brl)} oninput={(e) => (usd = num((e.target as HTMLInputElement).value) / brlPerUsd)} />
      </label>
      <label class="flex items-center gap-2">
        <span class="w-16 text-sm font-semibold text-deep/70">🇺🇸 USD</span>
        <input class={field} inputmode="decimal" value={fmtUSD(usd)} oninput={(e) => (usd = num((e.target as HTMLInputElement).value))} />
      </label>
      <div class="mt-2 grid grid-cols-2 gap-2 border-t border-deep/10 pt-2 text-xs text-deep/60">
        <label class="flex items-center gap-1">US$1 = <input class="w-20 rounded border border-deep/15 px-2 py-1 text-right" inputmode="decimal" value={clpPerUsd} oninput={(e) => (clpPerUsd = num((e.target as HTMLInputElement).value) || clpPerUsd)} /> CLP</label>
        <label class="flex items-center gap-1">US$1 = R$<input class="w-16 rounded border border-deep/15 px-2 py-1 text-right" inputmode="decimal" value={brlPerUsd} oninput={(e) => (brlPerUsd = num((e.target as HTMLInputElement).value) || brlPerUsd)} /></label>
      </div>
      <p class="text-[11px] text-deep/45">Taxas aproximadas e editáveis — confira a do dia antes de gastar.</p>
    </div>
  </section>

  <!-- Dicas -->
  <section>
    <h2 class="mb-2 text-lg font-bold">💡 Dinheiro & dicas</h2>
    <ul class="space-y-1 rounded-2xl bg-white p-4 text-sm text-deep/85 shadow-sm">
      <li class="flex gap-2"><span class="text-teal">•</span> Gorjeta (propina): ~<strong>10%</strong> em restaurantes (costuma vir sugerida na conta).</li>
      <li class="flex gap-2"><span class="text-teal">•</span> Hotéis: pagando em <strong>US$</strong> e mostrando o cartão de imigração, há <strong>isenção dos 19% de IVA</strong>. Em pesos, paga o imposto.</li>
      <li class="flex gap-2"><span class="text-teal">•</span> Cartão é aceito quase em todo lugar; tenha algum <strong>peso em dinheiro</strong> pra feiras/pedágios.</li>
      <li class="flex gap-2"><span class="text-teal">•</span> Carro: combustível se diz <strong>“bencina”</strong>; o frentista costuma abastecer pra você.</li>
    </ul>
  </section>

  <!-- Frases -->
  <section>
    <h2 class="mb-2 text-lg font-bold">🗣️ Frases úteis (espanhol)</h2>
    <div class="space-y-3">
      {#each phrases as g (g.group)}
        <div class="rounded-2xl bg-white p-3 shadow-sm">
          <p class="mb-1 text-xs font-bold uppercase tracking-wide text-teal">{g.group}</p>
          <ul class="divide-y divide-deep/5">
            {#each g.items as [pt, es] (es)}
              <li class="flex items-baseline justify-between gap-3 py-1.5">
                <span class="text-sm text-deep/60">{pt}</span>
                <span class="text-right text-sm font-semibold">{es}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </section>
</main>
