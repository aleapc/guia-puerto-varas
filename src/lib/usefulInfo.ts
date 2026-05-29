// Informações úteis / emergência — Puerto Varas e Puerto Montt.
// Em emergência real use sempre 131/132/133 (não falham). Telefones "verificar" tiveram
// pequenas divergências entre diretórios — confirme in loco.

export interface EmergencyNumber {
  label: string;
  number: string;
  emoji: string;
}

export interface UsefulPlace {
  name: string;
  detail?: string;
  phone?: string;
  address?: string;
  mapQuery?: string;
  note?: string;
}

export interface UsefulGroup {
  title: string;
  emoji: string;
  places: UsefulPlace[];
}

export const emergencyNumbers: EmergencyNumber[] = [
  { label: 'Ambulância / SAMU', number: '131', emoji: '🚑' },
  { label: 'Bombeiros', number: '132', emoji: '🚒' },
  { label: 'Carabineros (polícia)', number: '133', emoji: '🚓' },
  { label: 'PDI (investigação)', number: '134', emoji: '🕵️' },
  { label: 'Resgate marítimo', number: '137', emoji: '⛴️' },
  { label: 'Resgate na montanha', number: '136', emoji: '⛰️' }
];

export const emergencyNote =
  'Não existe um “911” único no Chile — use os números acima. Em trilhas e no Vulcão Osorno o sinal de celular falha; avise alguém do trajeto.';

export const usefulGroups: UsefulGroup[] = [
  {
    title: 'Saúde & urgência',
    emoji: '🏥',
    places: [
      {
        name: 'Clínica Puerto Varas',
        detail: 'Urgência 24h, 365 dias (privada)',
        phone: '+56652333300',
        address: 'Dr. Otto Bader 810, Puerto Varas',
        mapQuery: 'Clínica Puerto Varas'
      },
      {
        name: 'SAR Puerto Varas',
        detail: 'Urgência pública 24h (baixa complexidade)',
        address: 'Antonio Varas esq. Errázuriz, Puerto Varas',
        mapQuery: 'SAR Puerto Varas',
        note: 'Casos graves são transferidos pro Hospital de Puerto Montt.'
      },
      {
        name: 'Hospital Base de Puerto Montt',
        detail: 'Hospital público regional (alta complexidade) · ~20 min',
        phone: '+56652362682',
        address: 'Los Aromos 65, Puerto Montt',
        mapQuery: 'Hospital Base Puerto Montt'
      }
    ]
  },
  {
    title: 'Polícia & bombeiros',
    emoji: '🚓',
    places: [
      {
        name: '1ª Comisaría de Carabineros',
        phone: '+56652765100',
        address: 'San Francisco 241, Puerto Varas',
        mapQuery: 'Carabineros Puerto Varas',
        note: 'Emergência: 133'
      },
      {
        name: 'Bombeiros de Puerto Varas',
        address: 'San Francisco 601, Puerto Varas',
        mapQuery: 'Bomberos Puerto Varas',
        note: 'Emergência: 132'
      }
    ]
  },
  {
    title: 'Turismo & farmácia',
    emoji: 'ℹ️',
    places: [
      {
        name: 'Oficina de Informação Turística',
        detail: 'Atende em espanhol, inglês e português',
        address: 'Del Salvador 320, centro',
        mapQuery: 'Oficina de Turismo Puerto Varas',
        note: 'Seg–sex 10h–14h e 15h–18h; sáb 10h–13h.'
      },
      {
        name: 'Farmácia de turno (24h)',
        detail: 'Sempre há uma farmácia aberta 24h por comuna (rodízio)',
        note: 'Veja qual está de turno hoje: farmaciasdeturno.cl ou Salud Responde 600 360 7777. Cadeias: Cruz Verde, Salcobrand, Ahumada (no centro).'
      }
    ]
  },
  {
    title: 'Apoio ao brasileiro',
    emoji: '🇧🇷',
    places: [
      {
        name: 'Consulado-Geral do Brasil (Santiago)',
        detail: 'Não há consulado em Puerto Varas/Montt',
        phone: '+560993345103',
        address: 'Los Militares 6191, Las Condes, Santiago',
        note: 'Plantão consular de emergência 24h: +56 9 9334 5103. Itamaraty (Brasília): +55 61 98260 0610.'
      }
    ]
  }
];

export const safetyTips = [
  'Água da torneira é potável e segura em Puerto Varas.',
  'Sem risco de altitude na cidade (~70 m) — só atenção ao subir o Osorno (frio, vento, sol forte).',
  'Furtos são baixos, mas cuide de bolsos/mochilas em feiras e pontos lotados; não deixe nada à vista no carro.',
  'Região vulcânica e sísmica: siga as rotas de evacuação sinalizadas (sobretudo na costa de Puerto Montt).'
];
