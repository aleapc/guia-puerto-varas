# Guia Puerto Varas 🌋 (PWA)

Guia de viagem **offline** (iOS + Android) para Puerto Varas / região dos lagos, Chile.
SvelteKit + Tailwind + PWA. Feito para a viagem de Alê & Andréia (4–13 jun 2026).

**Live:** https://aleapc.github.io/guia-puerto-varas/

## O que faz
- **Plano de hoje** gerado pela previsão: dia de sol → vulcão/mirantes; chuva → Saltos/cidade/coberto.
- **Marcar "já fizemos"** em cada local → o motor para de recomendar o que já foi feito.
- **Guia por categorias** (a pé / carro / cidades / Chiloé / mercados / restaurantes / roupa) → locais → detalhe
  (o que fazer/levar/vestir, dica de rei, onde comer, horários, **"Como chegar" abre o Google/Apple Maps**).
- **Previsão 10 dias** (Open-Meteo, sem API key) + **alertas inteligentes** (melhor dia de céu limpo pro Osorno,
  Parque fecha 2ª, feira no sábado, vento).
- **100% offline** após a 1ª abertura no wi-fi (service worker pré-cacheia app + fotos).
- Anotações por local; estado salvo no aparelho (localStorage).

## Instalar no celular
Abra **https://aleapc.github.io/guia-puerto-varas/** com internet e:
- **iPhone (Safari):** Compartilhar → *Adicionar à Tela de Início*.
- **Android (Chrome):** menu ⋮ → *Instalar app* / *Adicionar à tela inicial*.

Abra o app 1× no wi-fi (toque ↻ pra baixar a previsão) → depois funciona sem internet.

## Desenvolver
```powershell
npm install
npm run dev        # http://localhost:5173
npm run build      # gera /build (estático)
npm run preview
```

## Publicar (GitHub Pages)
```powershell
.\deploy.ps1       # build com BASE_PATH=/guia-puerto-varas e push pra branch gh-pages
```

## Editar conteúdo
- Locais e categorias: `src/lib/content.ts` (TypeScript tipado).
- Fotos: `npm` → `pwsh scripts/fetch-photos.ps1` (Wikimedia Commons) ou ponha arquivos em `static/photos/`
  e referencie em `content.ts` (`image: 'arquivo.jpg'`). Créditos em `src/lib/photoCredits.ts`.
- Ícones do PWA: `powershell scripts/make-icons.ps1`.
- Datas da viagem / Airbnb: `trip` em `src/lib/content.ts`.

## Stack
SvelteKit 2 · Svelte 5 · adapter-static · Tailwind 3 · @vite-pwa/sveltekit · Open-Meteo · Wikimedia Commons (fotos).
Espelha o setup do projeto `rotina-ale`.
