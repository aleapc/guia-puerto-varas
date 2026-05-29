// All trip content (type-safe, 100% offline). Mirrors the native app's TripContent.
// To add a place: append an Attraction. Photos: set `image` to a file in static/photos/.

export type WeatherFit = 'CLEAR_SKY' | 'RAIN_OK' | 'INDOOR' | 'ANY';

export interface OpeningHours {
  openDays?: number[]; // ISO weekday Mon=1..Sun=7; empty/undefined = every day
  openHour?: number;
  closeHour?: number;
  note?: string;
}

export interface LinkRef {
  label: string;
  url: string;
}

export interface Attraction {
  id: string;
  categoryId: string;
  name: string;
  tagline: string;
  description: string;
  whatToDo?: string[];
  whatToBring?: string[];
  whatToWear?: string[];
  kingTip?: string;
  whereToEat?: string;
  lat: number;
  lng: number;
  distanceKm?: number;
  driveMinutes?: number;
  durationLabel: string;
  fit: WeatherFit;
  windSensitive?: boolean;
  hours?: OpeningHours;
  mapQuery?: string;
  image?: string;
  /** Optional history/context shown in an expandable "Mais sobre o local" section. */
  history?: string;
  links?: LinkRef[];
}

export interface Category {
  id: string;
  title: string;
  emoji: string;
  summary: string;
  gradient: [string, string];
  image?: string;
}

export const trip = {
  homeName: 'Airbnb (Ruta 225, ao lado do Colegio Alemán)',
  homeLat: -41.3108,
  homeLng: -72.9455,
  weatherLat: -41.3195,
  weatherLng: -72.9854,
  timezone: 'America/Santiago',
  startDate: '2026-06-04',
  endDate: '2026-06-13'
};

export const categories: Category[] = [
  { id: 'apie', title: 'A pé, ao redor', emoji: '🥾', summary: 'Saindo do Airbnb sem pegar o carro: orla do lago, mirantes e o centro charmoso.', gradient: ['#2E7D5B', '#6FB98F'], image: 'puerto-varas.jpg' },
  { id: 'carro', title: 'Passeios de carro', emoji: '🚗', summary: 'A Ruta 225 sai da sua porta direto pros vulcões, saltos e o lago esmeralda.', gradient: ['#0E3A53', '#1E6F8E'], image: 'osorno.jpg' },
  { id: 'cidades', title: 'Cidades próximas', emoji: '🏘️', summary: 'Frutillar, Puerto Montt e arredores — cultura, kuchen e mais variedade.', gradient: ['#6A4C93', '#A084C7'], image: 'frutillar.jpg' },
  { id: 'chiloe', title: 'Chiloé', emoji: '🌊', summary: 'A ilha mística: palafitos, igrejas de madeira e atmosfera de fim de mundo.', gradient: ['#3A4A5A', '#7A8B9C'], image: 'castro.jpg' },
  { id: 'cultura', title: 'Cultura & história', emoji: '🏛️', summary: 'Museus, igrejas de madeira e o legado alemão e chilote da região.', gradient: ['#7A5230', '#B98E5E'], image: 'museo.jpg' },
  { id: 'mercados', title: 'Mercados & compras', emoji: '🛒', summary: 'Pro plano de café e jantar em casa: supermercados, peixe fresco e feiras.', gradient: ['#B5651D', '#E0A458'], image: 'mercado.jpg' },
  { id: 'restaurantes', title: 'Restaurantes', emoji: '🍽️', summary: 'Pros dias de sair: vista pro lago, fogo, frutos do mar e clássicos.', gradient: ['#9A2617', '#D96C4A'], image: 'seafood.jpg' },
  { id: 'roupa', title: 'Roupa de inverno', emoji: '🧥', summary: 'Onde comprar a camada certa: base, fleece e shell impermeável de verdade.', gradient: ['#1B5E5A', '#4FA39E'], image: 'jacket.jpg' }
];

export const attractions: Attraction[] = [
  // ---------- A PÉ ----------
  {
    id: 'costanera', categoryId: 'apie', name: 'Costanera do Lago Llanquihue',
    tagline: 'O cartão-postal, a pé de fim de tarde',
    description: 'A orla de Puerto Varas é plana e gostosa de caminhar, com vista pros vulcões Osorno, Calbuco e a silhueta do Tronador. Cafés e sorveterias no caminho.',
    whatToDo: ['Caminhar a beira-lago no fim de tarde', 'Parar num café ou sorveteria', 'Fotografar o Osorno se estiver aberto'],
    whatToBring: ['Câmera/celular', 'Guarda-chuva compacto'],
    whatToWear: ['Fleece + shell impermeável', 'Gorro (o vento bate forte na orla)'],
    kingTip: 'Se o Osorno estiver sem nuvem ao pôr do sol, é A foto da viagem. Olhe a Sugestão de hoje na home.',
    lat: -41.3195, lng: -72.9810, distanceKm: 4, driveMinutes: 9,
    durationLabel: '1–2h sem pressa', fit: 'CLEAR_SKY', windSensitive: true, image: 'puerto-varas.jpg',
    history: 'A orla foi urbanizada no século XX como cartão-postal da colonização alemã. O roseiral plantado para emoldurar a vista do Osorno deu à cidade o apelido de "Ciudad de las Rosas".'
  },
  {
    id: 'philippi', categoryId: 'apie', name: 'Parque & Mirador Philippi',
    tagline: 'Vista panorâmica do alto da cidade',
    description: 'Um morro arborizado dentro da cidade, com trilha curta porém íngreme até um mirante com vista de 360° do lago, da cidade e do Osorno.',
    whatToDo: ['Subir a trilha até o mirante', 'Piquenique no parque', 'Ver o pôr do sol sobre o lago'],
    whatToBring: ['Água', 'Calçado firme'],
    whatToWear: ['Tênis com boa aderência', 'Camadas (esquenta na subida)'],
    kingTip: 'Evite logo após chuva forte — a subida fica escorregadia. Vá num fim de tarde de céu limpo.',
    lat: -41.3232, lng: -72.9856, distanceKm: 4, driveMinutes: 10,
    durationLabel: '1–1h30', fit: 'CLEAR_SKY', windSensitive: true, image: 'puerto-varas.jpg',
    history: 'Leva o nome do naturalista Rudolph Amandus Philippi, figura ligada à colonização alemã da região de Los Lagos no século XIX.'
  },
  {
    id: 'centro', categoryId: 'apie', name: 'Centro histórico & casario alemão',
    tagline: 'Arquitetura chileno-alemã e cafés',
    description: 'O coração de Puerto Varas: casas patrimoniais alemãs, lojinhas e cafés de kuchen, com a Igreja do Sagrado Coração coroando a colina.',
    whatToDo: ['Circular pelas casas patrimoniais', 'Café com kuchen', "Garimpar 'cositas' nas lojinhas"],
    whatToBring: ['Carteira para as lojinhas'],
    whatToWear: ['Casaco impermeável', 'Calçado confortável'],
    kingTip: 'Dia chuvoso? É o passeio a pé ideal — quase tudo coberto e com café por perto.',
    lat: -41.3206, lng: -72.9840, distanceKm: 4, driveMinutes: 9,
    durationLabel: '1h', fit: 'INDOOR', image: 'puerto-varas.jpg'
  },
  {
    id: 'orla_leste', categoryId: 'apie', name: 'Orla leste — caminhada saindo do Airbnb',
    tagline: 'Da sua porta rumo à cidade, beirando o lago',
    description: 'Do Airbnb dá pra caminhar pela orla/Ruta 225 em direção ao centro, com o lago de um lado. Trecho tranquilo pra começar ou terminar o dia.',
    whatToDo: ['Caminhada matinal beirando o lago', 'Ir até um café no centro e voltar'],
    whatToBring: ['Água', 'Capa de chuva leve'],
    whatToWear: ['Camadas + corta-vento'],
    kingTip: 'Bom aquecimento de manhã antes do café. Atenção ao trânsito na 225 nos trechos sem calçada.',
    lat: -41.3108, lng: -72.9455, distanceKm: 0, driveMinutes: 0,
    durationLabel: '30–60 min', fit: 'ANY', windSensitive: true
  },

  // ---------- DE CARRO ----------
  {
    id: 'saltos_petrohue', categoryId: 'carro', name: 'Saltos del Petrohué',
    tagline: 'Quedas turquesa — mais cheias no inverno',
    description: 'No Parque Nacional Vicente Pérez Rosales, passarelas curtas levam às quedas de água azul-turquesa sobre rocha vulcânica, com o Osorno ao fundo. Com chuva o caudal aumenta e fica espetacular.',
    whatToDo: ['Percorrer as passarelas das quedas', 'Mirantes sobre o rio Petrohué', 'Combinar com o Lago Todos los Santos'],
    whatToBring: ['Cartão (pagamento preferencial em cartão)', 'Capa de chuva', 'Câmera'],
    whatToWear: ['Impermeável sério', 'Calçado de trilha / à prova d’água'],
    kingTip: 'Dia de chuva é BOM dia pros Saltos — mais água, menos gente. Mas confira: fecha às segundas.',
    whereToEat: 'Há quiosques no parque; ou leve lanche.',
    lat: -41.1690, lng: -72.4170, distanceKm: 62, driveMinutes: 70,
    durationLabel: 'Meio dia', fit: 'RAIN_OK', image: 'saltos.jpg',
    hours: { openDays: [2, 3, 4, 5, 6, 7], openHour: 9, closeHour: 17, note: 'Terça a domingo, 9h–17h (inverno). Fechado às segundas. Entrada ~CLP 7.000 estrangeiro.' },
    history: 'As quedas se formaram há cerca de 600 anos, quando fluxos de lava de uma erupção do Osorno solidificaram e canalizaram o rio Petrohué sobre o basalto.',
    links: [{ label: 'Comprar entrada (Pases Parques)', url: 'https://www.pasesparques.cl/es/parks/v-perez-rosales' }]
  },
  {
    id: 'todos_los_santos', categoryId: 'carro', name: 'Lago Todos los Santos (Petrohué)',
    tagline: 'O lago esmeralda aos pés do Osorno',
    description: 'Logo além dos Saltos, a vila de Petrohué se abre num lago de água verde-esmeralda cercado por montanhas. Praia de areia vulcânica escura e ponto de partida de navegações.',
    whatToDo: ['Contemplar a praia de areia preta', 'Ver o Osorno refletido na água', 'Passeio de barco (quando operando)'],
    whatToBring: ['Água', 'Lanche', 'Câmera'],
    whatToWear: ['Camadas + impermeável', 'Gorro (venta perto da água)'],
    kingTip: 'Junte num único dia: Ensenada → Saltos → Petrohué. Tudo na mesma estrada.',
    lat: -41.1370, lng: -72.4030, distanceKm: 64, driveMinutes: 75,
    durationLabel: 'Meio dia (com os Saltos)', fit: 'CLEAR_SKY', windSensitive: true, image: 'todos-los-santos.jpg',
    history: 'Foi "descoberto" por jesuítas em 1º de novembro — Dia de Todos os Santos — no século XVII. A cor verde-cristalina vem das águas glaciais.'
  },
  {
    id: 'osorno', categoryId: 'carro', name: 'Vulcão Osorno (mirantes / centro de ski)',
    tagline: 'O cone perfeito — só vale com céu azul',
    description: 'Subindo de Ensenada, a estrada leva a mirantes e ao centro de ski (La Burbuja) a ~1.200 m, com vistas amplas do lago Llanquihue. O cone nevado é o símbolo da região.',
    whatToDo: ['Parar nos mirantes da subida', 'Vistas do lago lá de cima', 'Café/centro de ski (se aberto)'],
    whatToBring: ['Correntes de pneu (pode ser exigido)', 'Casaco quente', 'Óculos de sol (neve reflete)'],
    whatToWear: ['Casaco impermeável quente', 'Luvas e gorro', 'Bota impermeável'],
    kingTip: 'Só suba com céu limpo — com nuvem você não vê nada. O centro de ski costuma abrir só a partir de meados de junho; confirme estrada/neve na cidade antes de subir.',
    lat: -41.1000, lng: -72.4930, distanceKm: 65, driveMinutes: 80,
    durationLabel: 'Meio dia', fit: 'CLEAR_SKY', windSensitive: true, image: 'osorno.jpg',
    history: 'Estratovulcão ativo de 2.652 m cujas erupções moldaram toda a paisagem do entorno (a última em meados do século XIX). No inverno abriga o centro de esqui Volcán Osorno.',
    links: [{ label: 'Condições do centro de ski', url: 'https://volcanosorno.com/' }]
  },
  {
    id: 'ensenada', categoryId: 'carro', name: 'Ensenada',
    tagline: 'Cruzamento dos passeios, à beira do lago',
    description: 'Pequeno povoado onde a Ruta 225 encontra a subida ao Osorno e segue pros Saltos. Bons pontos de parada, mirantes do lago e o Calbuco ao sul.',
    whatToDo: ['Parada de café no caminho', 'Mirantes do lago Llanquihue', 'Base pra decidir Osorno x Petrohué'],
    whatToWear: ['Camadas + impermeável'],
    kingTip: "Útil como 'pit stop' — encha o tanque e o estômago aqui antes de subir o vulcão.",
    lat: -41.2010, lng: -72.5870, distanceKm: 42, driveMinutes: 45,
    durationLabel: 'Passagem / 30 min', fit: 'ANY', image: 'llanquihue.jpg'
  },
  {
    id: 'las_cascadas', categoryId: 'carro', name: 'Las Cascadas',
    tagline: 'Bosque nativo e quedas na base do Osorno',
    description: 'Localidade tranquila na margem leste do lago, na base do vulcão, com bosque valdiviano e quedas d’água formadas pelos cursos que descem do Osorno.',
    whatToDo: ['Parar no caminho da volta ao lago', 'Bosque e cachoeiras', 'Praia de pedras no lago'],
    whatToWear: ['Impermeável + calçado fechado'],
    kingTip: 'Combina com a volta ao lago. Estrada de ripio em trechos — vá sem pressa.',
    lat: -41.0530, lng: -72.5160, distanceKm: 48, driveMinutes: 55,
    durationLabel: 'Parada / 1h', fit: 'RAIN_OK', image: 'llanquihue.jpg',
    history: 'Antigo enclave de colonos na encosta do vulcão; o nome vem das cascatas que descem em meio à floresta valdiviana.'
  },
  {
    id: 'centinela', categoryId: 'carro', name: 'Península de Centinela',
    tagline: 'A vista mais bonita do norte do lago',
    description: 'Estreita península arborizada que fecha a baía de Puerto Octay, com praias, mirante ao sul e vista frontal do Osorno.',
    whatToDo: ['Mirante da península', 'Caminhada curta entre as praias', 'Fotos do Osorno do norte do lago'],
    whatToWear: ['Camadas + corta-vento'],
    kingTip: 'Vá num dia de céu limpo. A casona histórica (1913) já hospedou príncipes ingleses.',
    lat: -41.0010, lng: -72.8870, distanceKm: 58, driveMinutes: 62,
    durationLabel: 'Meio dia (com Puerto Octay)', fit: 'CLEAR_SKY', windSensitive: true, image: 'llanquihue.jpg',
    history: 'A casona do Centinela, projetada por Josué Smith Solar em 1913, foi refúgio da elite de Santiago; em 1931 hospedou os príncipes Eduardo (futuro Eduardo VIII) e Jorge (futuro Jorge VI).'
  },
  {
    id: 'vuelta_lago', categoryId: 'carro', name: 'Volta ao Lago Llanquihue & cervejarias',
    tagline: 'Estrada cênica, miradouros e cerveja artesanal',
    description: 'O maior lago do Chile dá pra contornar de carro passando por Ensenada, Las Cascadas, Puerto Octay e Frutillar. Pelo caminho, cervejarias da tradição alemã (Kunstmann nasceu na região).',
    whatToDo: ['Dirigir devagar pelos miradouros', 'Parar numa cervejaria (chuleta defumada, kuchen)', 'Fotografar os vulcões de ângulos diferentes'],
    whatToBring: ['Tanque cheio', 'Lanche'],
    whatToWear: ['Confortável + impermeável'],
    kingTip: 'A volta inteira é longa (~190 km). Pra um dia tranquilo, faça só o trecho leste/norte até Frutillar e volte.',
    lat: -41.2010, lng: -72.5530, distanceKm: 42, driveMinutes: 45,
    durationLabel: 'Meio a dia inteiro', fit: 'RAIN_OK', image: 'llanquihue.jpg'
  },

  // ---------- CIDADES PRÓXIMAS ----------
  {
    id: 'frutillar', categoryId: 'cidades', name: 'Frutillar',
    tagline: 'A mais charmosa do lago — kuchen e cultura',
    description: 'Vila à beira do Llanquihue com casas alemãs, o icônico Teatro del Lago sobre a água, o Museu Colonial Alemão e a melhor vista frontal do Osorno. Capital do kuchen.',
    whatToDo: ['Café com vista no Teatro del Lago', 'Museu Colonial Alemão', 'Orla e muelle de Frutillar Bajo', 'Comer kuchen num salón de té'],
    whatToBring: ['Carteira', 'Câmera'],
    whatToWear: ['Casaco impermeável', 'Calçado confortável'],
    kingTip: 'Mesmo sem espetáculo, vale o café panorâmico do Teatro del Lago. Fim de tarde na orla com o Osorno ao fundo é imperdível.',
    whereToEat: 'Salón de Té Frutillar / Cafés da costanera (kuchen alemão).',
    lat: -41.1280, lng: -73.0555, distanceKm: 33, driveMinutes: 35,
    durationLabel: 'Meio dia', fit: 'INDOOR', image: 'frutillar.jpg',
    history: 'Frutillar Bajo nasceu como porto lacustre da colonização alemã (a partir de 1852) e preserva a tradição da konditorei (confeitaria) — o kuchen de framboesa é herança direta dos colonos.',
    links: [{ label: 'Programação Teatro del Lago', url: 'https://www.teatrodellago.cl/' }]
  },
  {
    id: 'puerto_montt', categoryId: 'cidades', name: 'Puerto Montt',
    tagline: 'Porto, frutos do mar e mais compras',
    description: 'A capital regional, a 20 min. Mais funcional que charmosa, mas tem o Mercado de Angelmó (frutos do mar e artesanato) e o Mall Paseo Costanera, com mais variedade de lojas e preços.',
    whatToDo: ['Mercado de Angelmó (curanto, frutos do mar)', 'Costanera e porto', 'Mall Paseo Costanera para compras'],
    whatToBring: ['Carteira'],
    whatToWear: ['Impermeável (venta no porto)'],
    kingTip: 'Vá a Angelmó com fome: barracas de marisco fresquíssimo. Bom plano pra um dia mais cinza.',
    whereToEat: 'Cocinerías de Angelmó (caldillo, curanto, ceviche).',
    lat: -41.4730, lng: -72.9430, distanceKm: 21, driveMinutes: 25,
    durationLabel: 'Meio dia', fit: 'INDOOR', mapQuery: 'Mall Paseo Costanera Puerto Montt', image: 'puerto-montt.jpg'
  },
  {
    id: 'puerto_octay', categoryId: 'cidades', name: 'Puerto Octay',
    tagline: 'Vilarejo patrimonial no norte do lago',
    description: 'Pequena e bucólica, na ponta norte do Llanquihue, com casario histórico de colonos e clima de cidade-museu pacata.',
    whatToDo: ['Casario alemão', 'Mirante da Península de Centinela', 'Parada tranquila na volta ao lago'],
    whatToWear: ['Camadas + impermeável'],
    kingTip: 'Combine com a Centinela num dia de céu limpo — rende fotos lindas.',
    lat: -40.9707, lng: -72.8870, distanceKm: 56, driveMinutes: 60,
    durationLabel: 'Meio dia (com a volta ao lago)', fit: 'CLEAR_SKY', windSensitive: true, image: 'llanquihue.jpg',
    history: 'Foi o primeiro porto de navegação a vapor do Llanquihue no fim do século XIX, escoando a produção dos colonos antes das estradas.'
  },
  {
    id: 'llanquihue', categoryId: 'cidades', name: 'Llanquihue (cidade)',
    tagline: 'Berço da cerveja artesanal regional',
    description: 'Cidade fabril às margens do lago, ponto tranquilo da volta ao Llanquihue e marco da tradição cervejeira alemã do sul do Chile.',
    whatToDo: ['Orla do lago', 'Cervejaria artesanal', 'Parada na volta ao lago'],
    whatToWear: ['Confortável + impermeável'],
    kingTip: 'Boa pra uma parada de cerveja artesanal a caminho de Frutillar.',
    lat: -41.2585, lng: -73.0090, distanceKm: 27, driveMinutes: 28,
    durationLabel: 'Parada / 1h', fit: 'ANY',
    history: 'Fundada em 1853 como núcleo da colonização alemã, deu nome ao lago e sediou a histórica Cervecería Llanquihue.'
  },

  // ---------- CHILOÉ ----------
  {
    id: 'castro', categoryId: 'chiloe', name: 'Castro & os palafitos',
    tagline: 'Dia longo OU (melhor) uma noite na ilha',
    description: 'A capital de Chiloé, famosa pelos palafitos coloridos sobre a água e pela igreja de madeira amarela e lilás (Patrimônio da UNESCO). Atmosfera de mar, vento, madeira e melancolia bonita.',
    whatToDo: ['Ver os palafitos de Gamboa', 'Igreja San Francisco de Castro', 'Mercado e feira de artesanato', 'Provar o curanto'],
    whatToBring: ['Tanque cheio', 'Dinheiro para artesanato', 'Capa de chuva'],
    whatToWear: ['Impermeável SÉRIO (vento marítimo)', 'Gorro + fleece + bota'],
    kingTip: 'Pelo perfil de vocês, vale MAIS com 1 noite do que bate-volta. Hotéis: Tierra Chiloé (experiência) ou OCIO Territorial (melhor custo-charme). Na chuva, a ilha fica cinematográfica.',
    whereToEat: 'Mercado de Castro / palafitos gastronômicos (curanto, milcao, cordeiro).',
    lat: -42.4830, lng: -73.7700, distanceKm: 215, driveMinutes: 230,
    durationLabel: 'Dia longo ou 1 noite', fit: 'RAIN_OK', windSensitive: true, image: 'castro.jpg',
    history: 'Castro foi fundada em 1576 — a terceira cidade mais antiga do Chile em funcionamento contínuo. Os palafitos surgiram no século XIX como moradias de pescadores, com frente pra rua e fundos sobre o mar.',
    links: [
      { label: 'Hotel Tierra Chiloé', url: 'https://www.tierrahotels.com/tierra-chiloe/' },
      { label: 'OCIO Territorial Hotel', url: 'https://www.ocioterritorial.com/' }
    ]
  },
  {
    id: 'dalcahue', categoryId: 'chiloe', name: 'Dalcahue',
    tagline: 'Igreja na orla e feira de artesanato',
    description: 'Vila portuária com igreja de madeira na beira-mar e mercado de artesanato e lã, porta de embarque para a Ilha Quinchao.',
    whatToDo: ['Feira de artesanato (melhor aos domingos)', 'Igreja de madeira na orla', 'Embarque pra Quinchao/Achao'],
    whatToWear: ['Impermeável + gorro'],
    kingTip: 'A feira dominical é um dos centros vivos do artesanato chilote.',
    lat: -42.3780, lng: -73.6500, distanceKm: 200, driveMinutes: 215,
    durationLabel: 'Parada (com Chiloé)', fit: 'RAIN_OK',
    history: 'A Iglesia Nuestra Señora de los Dolores (meados do século XIX) integra o conjunto UNESCO das igrejas de Chiloé, com o típico pórtico de arcos de madeira.'
  },
  {
    id: 'curaco_velez', categoryId: 'chiloe', name: 'Curaco de Vélez',
    tagline: 'Ostras e casario de tejuelas (Ilha Quinchao)',
    description: 'Vilarejo tranquilo na ilha Quinchao, famoso por ostras fresquíssimas, casario de tejuelas de alerce e um relógio de sol na praça.',
    whatToDo: ['Provar ostras na baía', 'Casario tradicional em tejuela', 'Praça e relógio de sol'],
    whatToWear: ['Impermeável + calçado fechado'],
    kingTip: 'A baía é um dos principais bancos de ostras do arquipélago.',
    lat: -42.4350, lng: -73.6050, distanceKm: 215, driveMinutes: 235,
    durationLabel: 'Parada (com Chiloé)', fit: 'RAIN_OK',
    history: 'Conhecido pela arquitetura em tejuela de alerce e por ter sido terra de marinheiros e caçadores de baleias no século XIX.'
  },
  {
    id: 'muelle_almas', categoryId: 'chiloe', name: 'Muelle de las Almas (Cucao)',
    tagline: 'O píer suspenso sobre o penhasco do Pacífico',
    description: 'Escultura de madeira em forma de píer suspenso encarando o oceano, ao fim de uma trilha por campos. Cenário e lenda inesquecíveis.',
    whatToDo: ['Trilha por campos até o penhasco (paga, terreno privado)', 'Fotos no muelle', 'Vista do Pacífico'],
    whatToBring: ['Dinheiro para o pedágio da trilha', 'Água', 'Capa de chuva'],
    whatToWear: ['Impermeável + bota (lama)', 'Corta-vento'],
    kingTip: 'Só com tempo bom — fecha/escorrega com vento forte ou chuva. Fica longe (sul de Chiloé): planeje bem.',
    lat: -42.6760, lng: -74.1290, distanceKm: 280, driveMinutes: 320,
    durationLabel: 'Dia inteiro (longe)', fit: 'CLEAR_SKY', windSensitive: true,
    history: 'Obra de Marcelo Orellana Rivera (2005). Inspira-se na mitologia chilota: as almas dos mortos chegariam ali para implorar ao barqueiro Tempilcahue que as leve ao mundo dos espíritos.'
  },
  {
    id: 'pn_chiloe', categoryId: 'chiloe', name: 'Parque Nacional Chiloé (Cucao)',
    tagline: 'Floresta valdiviana, dunas e praias selvagens',
    description: 'Parque na costa oeste da ilha, com bosque nativo úmido, dunas e o litoral aberto do Pacífico, com passarelas e trilhas curtas.',
    whatToDo: ['Passarelas pela floresta e dunas', 'Praia selvagem do Pacífico', 'Comunidade huilliche de Cucao'],
    whatToWear: ['Impermeável sério + bota', 'Camadas'],
    kingTip: 'Combina com o Muelle de las Almas (mesma região, sul de Chiloé).',
    lat: -42.6320, lng: -74.1000, distanceKm: 275, driveMinutes: 315,
    durationLabel: 'Dia inteiro (longe)', fit: 'RAIN_OK',
    history: 'Criado em 1982, protege bosque nativo, turfeiras e o litoral do Pacífico, próximo ao antigo limite sul da presença espanhola no arquipélago.'
  },

  // ---------- CULTURA & HISTÓRIA ----------
  {
    id: 'iglesia_sagrado', categoryId: 'cultura', name: 'Iglesia del Sagrado Corazón',
    tagline: 'Ícone creme-e-vermelho da Floresta Negra',
    description: 'Igreja de madeira pintada de creme e vermelho no alto de Puerto Varas, o cartão-postal arquitetônico da colonização alemã.',
    whatToDo: ['Visitar o interior', 'Fotos da fachada', 'Vista da colina'],
    whatToWear: ['Roupa confortável'],
    kingTip: 'A subida até a igreja já dá uma boa vista da cidade e do lago.',
    lat: -41.3186, lng: -72.9847, distanceKm: 4, driveMinutes: 9,
    durationLabel: '30 min', fit: 'INDOOR', image: 'iglesia.jpg',
    history: 'Construída entre 1915 e 1918 por padres alemães, inspirada na Marienkirche da Floresta Negra. É Monumento Nacional do Chile desde 1992 e une o barroco renano à tradição construtiva em madeira da região.'
  },
  {
    id: 'museo_pablo_fierro', categoryId: 'cultura', name: 'Museo Pablo Fierro',
    tagline: 'Casa-museu boêmia à beira-lago',
    description: 'Casa-museu de fachada cenográfica, à beira do lago, com objetos do cotidiano da colonização que você pode tocar — rádios antigos, máquinas de escrever, relógios cuco.',
    whatToDo: ['Ver o acervo afetivo da colonização', 'Conversar com o artista (se estiver)', 'Fotos da fachada icônica'],
    whatToWear: ['Roupa confortável'],
    kingTip: 'Entrada costuma ser por doação. Ótimo refúgio num dia de chuva.',
    lat: -41.3170, lng: -72.9805, distanceKm: 4, driveMinutes: 9,
    durationLabel: '45 min', fit: 'INDOOR', image: 'museo.jpg',
    history: 'Criado em 2002 pelo artista Pablo Fierro num antigo prédio de bombeamento de água. Retrata a fusão da cultura alemã com os costumes locais a partir de meados do século XIX.'
  },
  {
    id: 'casas_alemanas', categoryId: 'cultura', name: 'Casas patrimoniais alemãs',
    tagline: 'Circuito a pé pelos casarões de colonos',
    description: 'Conjunto de casarões de madeira do início do século XX (Casa Kuschel, Casa Yunge, Casa Maldonado) espalhados pelas ruas centrais de Puerto Varas.',
    whatToDo: ['Circuito a pé pelas casas', 'Fotografar os telhados íngremes e a tejuela', 'Combinar com o centro histórico'],
    whatToWear: ['Calçado confortável + impermeável'],
    kingTip: 'Várias são Monumentos Nacionais. Pegue o mapa do circuito na oficina de turismo (Del Salvador 320).',
    lat: -41.3205, lng: -72.9845, distanceKm: 4, driveMinutes: 9,
    durationLabel: '1h', fit: 'ANY',
    history: 'Erguidas por famílias de colonos alemães entre 1910 e 1930, exibem telhados íngremes e revestimento de tejuela (telha de madeira) típico do sul do Chile.'
  },
  {
    id: 'teatro_del_lago', categoryId: 'cultura', name: 'Teatro del Lago (Frutillar)',
    tagline: 'Sala de concertos de classe mundial sobre o lago',
    description: 'Teatro de telhado de cobre avançando sobre o lago, com vista de quatro vulcões. Vale o café panorâmico mesmo sem espetáculo.',
    whatToDo: ['Café/vista panorâmica', 'Conferir a programação', 'Combinar com a orla de Frutillar'],
    whatToWear: ['Casaco + calçado confortável'],
    kingTip: 'No fim de janeiro sedia as Semanas Musicales, principal festival de música clássica do Chile.',
    lat: -41.1268, lng: -73.0560, distanceKm: 33, driveMinutes: 35,
    durationLabel: '1–2h', fit: 'INDOOR', image: 'frutillar.jpg',
    history: 'Inaugurado em 2010 como Obra Bicentenária do Chile; a sala principal tem 1.178 lugares com paredes de faia para acústica.',
    links: [{ label: 'Programação Teatro del Lago', url: 'https://www.teatrodellago.cl/' }]
  },
  {
    id: 'museo_colonial_frutillar', categoryId: 'cultura', name: 'Museo Colonial Alemán (Frutillar)',
    tagline: 'Museu a céu aberto da colonização alemã',
    description: 'Três hectares com casas de colonos, moinho d’água funcionante, ferraria e capela — recriação dos primeiros assentamentos alemães do lago.',
    whatToDo: ['Percorrer as casas e o moinho', 'Jardins e capela', 'Vista do lago'],
    whatToWear: ['Calçado confortável + impermeável'],
    kingTip: 'Tem partes cobertas — funciona bem mesmo em dia de chuva.',
    lat: -41.1330, lng: -73.0490, distanceKm: 33, driveMinutes: 36,
    durationLabel: '1–1h30', fit: 'RAIN_OK', image: 'museo.jpg',
    history: 'Aberto em 1984 pela Universidad Austral de Chile, recria os assentamentos dos colonos chegados ao lago a partir de 1852, com mobiliário original da época.'
  },
  {
    id: 'iglesia_san_francisco', categoryId: 'cultura', name: 'Iglesia San Francisco de Castro',
    tagline: 'Igreja de madeira amarela e lilás — UNESCO',
    description: 'Imponente igreja de madeira neogótica na praça central de Castro, pintada de amarelo e lilás. A imagem mais fotografada de Chiloé.',
    whatToDo: ['Visitar o interior em madeira nativa', 'Fotos da fachada', 'Praça de Castro'],
    whatToWear: ['Impermeável (chove muito em Chiloé)'],
    kingTip: 'Combine com os palafitos de Gamboa, ali perto.',
    lat: -42.4824, lng: -73.7644, distanceKm: 215, driveMinutes: 230,
    durationLabel: '30 min (com Castro)', fit: 'INDOOR', image: 'castro.jpg',
    history: 'Patrimônio Mundial da UNESCO desde 2000, projetada pelo franciscano milanês Eduardo Provasoli e concluída em 1912, erguida inteiramente em madeira nativa segundo a tradição chilota.'
  },
  {
    id: 'iglesia_achao', categoryId: 'cultura', name: 'Iglesia Santa María de Loreto (Achao)',
    tagline: 'A igreja de madeira mais antiga de Chiloé',
    description: 'Na ilha de Quinchao, a igreja de madeira mais antiga do arquipélago, montada com encaixes e sem pregos de ferro.',
    whatToDo: ['Visitar o interior histórico', 'Vila de Achao', 'Ostras de Curaco no caminho'],
    whatToWear: ['Impermeável + gorro'],
    kingTip: 'Exige a balsa Dalcahue→Quinchao. Programe junto com Curaco de Vélez.',
    lat: -42.4673, lng: -73.4945, distanceKm: 230, driveMinutes: 260,
    durationLabel: 'Parada (com Quinchao)', fit: 'INDOOR',
    history: 'Construída pelos jesuítas por volta de 1740, é a igreja mais antiga de pé em Chiloé e Patrimônio UNESCO — erguida com encaixes de madeira (ciprés e alerce), técnica herdada da construção naval.'
  },

  // ---------- MERCADOS & COMPRAS ----------
  {
    id: 'jumbo', categoryId: 'mercados', name: 'Jumbo Puerto Varas',
    tagline: 'A compra grande do café + jantar em casa',
    description: 'O supermercado mais completo da cidade. Ideal pra abastecer no primeiro dia: padaria, hortifrúti, salmão/merluza, vinhos e tudo pro Airbnb.',
    whatToDo: ['Compra grande do início da estadia', 'Pegar vinhos e queijos locais'],
    kingTip: 'Faça uma compra grande no dia 1 aqui e vá complementando com peixe e pão fresco no Mercado Municipal.',
    lat: -41.3232, lng: -72.9762, durationLabel: '1h', fit: 'INDOOR', mapQuery: 'Jumbo Puerto Varas', image: 'mercado.jpg'
  },
  {
    id: 'santa_isabel', categoryId: 'mercados', name: 'Santa Isabel',
    tagline: 'Supermercado central, prático',
    description: 'Boa rede, bem localizada, pra reposições rápidas sem ir até o Jumbo.',
    whatToDo: ['Reposições do dia a dia'],
    lat: -41.3190, lng: -72.9820, durationLabel: '30 min', fit: 'INDOOR', mapQuery: 'Santa Isabel Puerto Varas'
  },
  {
    id: 'mercado_municipal', categoryId: 'mercados', name: 'Mercado Municipal',
    tagline: 'Peixe fresco e produtos locais',
    description: 'Onde os moradores compram peixe e frutos do mar fresquíssimos, frutas e verduras. Alma local da cidade.',
    whatToDo: ['Comprar salmão / merluza / mariscos', 'Frutas e verduras', 'Sentir o clima local'],
    kingTip: 'Salmão e merluza locais são excelentes e baratos — perfeitos pro jantar no Airbnb.',
    lat: -41.3210, lng: -72.9805, durationLabel: '30–45 min', fit: 'INDOOR', mapQuery: 'Mercado Puerto Varas', image: 'mercado.jpg'
  },
  {
    id: 'feria_rural', categoryId: 'mercados', name: 'Feria Puerto Varas Rural',
    tagline: 'Produtos rurais e artesanais — só aos sábados',
    description: 'Feira de produtores rurais com alimentos, conservas e artesanato. Acontece aos sábados pela manhã.',
    whatToDo: ['Produtos rurais e conservas', 'Artesanato local', 'Café da feira'],
    kingTip: 'Só sábado, 10h–14h. A Sugestão de hoje te lembra quando for sábado.',
    lat: -41.3188, lng: -72.9830, durationLabel: '1h', fit: 'ANY',
    hours: { openDays: [6], openHour: 10, closeHour: 14, note: 'Sábados, 10h–14h.' }
  },
  {
    id: 'mercado_vecinos', categoryId: 'mercados', name: 'Mercado Vecinos (agroecológico)',
    tagline: 'Verduras orgânicas, carnes grassfed, pão artesanal',
    description: 'Produtores locais agroecológicos com entregas na região. Bom pra quem quer ingredientes de qualidade pro jantar em casa.',
    whatToDo: ['Encomendar verduras e carnes', 'Pão artesanal'],
    lat: -41.3195, lng: -72.9854, durationLabel: 'Online / retirada', fit: 'INDOOR', mapQuery: 'Mercado Vecinos Puerto Varas',
    links: [{ label: 'Site Mercado Vecinos', url: 'https://mercadovecinos.cl/' }]
  },

  // ---------- RESTAURANTES ----------
  {
    id: 'casa_valdes', categoryId: 'restaurantes', name: 'Casa Valdés',
    tagline: 'Vista pro lago + frutos do mar',
    description: 'Um dos nomes mais emblemáticos da cidade, com vista direta pro lago e pro Osorno. Peixes e frutos do mar frescos com toque basco; ceviche e salmão grelhado de destaque.',
    kingTip: 'Reserve uma mesa na janela ao entardecer — vista ‘de rei’.',
    lat: -41.3208, lng: -72.9868, durationLabel: 'Jantar', fit: 'INDOOR', mapQuery: 'Casa Valdés Puerto Varas', image: 'seafood.jpg'
  },
  {
    id: 'mesa_tropera', categoryId: 'restaurantes', name: 'Mesa Tropera',
    tagline: 'Píer sobre o lago + cerveja própria',
    description: 'Restaurante-cervejaria com um píer avançando no lago. Pizzas, petiscos e cervejas próprias num ambiente descontraído e muito local.',
    kingTip: 'Ótimo no fim de tarde; chegue cedo pra pegar lugar no deck sobre a água.',
    lat: -41.3199, lng: -72.9851, durationLabel: 'Almoço / jantar', fit: 'INDOOR', mapQuery: 'Mesa Tropera Puerto Varas', image: 'beer.jpg'
  },
  {
    id: 'santo_fuego', categoryId: 'restaurantes', name: 'Santo Fuego',
    tagline: 'Tudo no fogo — perfeito pra noite fria',
    description: 'Conceito de fogo no centro de tudo: carnes, peixes, frutos do mar e legumes na brasa, em ambiente caloroso e descontraído.',
    kingTip: 'Numa noite gelada de inverno, o calor da brasa aqui acerta em cheio.',
    lat: -41.3185, lng: -72.9846, durationLabel: 'Jantar', fit: 'INDOOR', mapQuery: 'Santo Fuego Puerto Varas', image: 'grill.jpg'
  },
  {
    id: 'la_olla', categoryId: 'restaurantes', name: 'La Olla',
    tagline: 'Clássico chileno amado pelos locais',
    description: 'Cozinha chilena de sabores robustos e frutos do mar frescos. Um clássico tanto pra visitantes quanto pra moradores.',
    kingTip: 'Peça o prato de frutos do mar do dia — costuma ser o melhor.',
    lat: -41.3260, lng: -72.9720, durationLabel: 'Almoço / jantar', fit: 'INDOOR', mapQuery: 'La Olla Puerto Varas', image: 'seafood.jpg'
  },
  {
    id: 'ibis', categoryId: 'restaurantes', name: 'Restaurante Ibis',
    tagline: 'Variado e aconchegante',
    description: 'Cardápio amplo (panquecas, crepes, saladas, carnes, peixes) em ambiente acolhedor. Bom quando bate a indecisão ou pra agradar gostos diferentes.',
    lat: -41.3192, lng: -72.9858, durationLabel: 'Almoço / jantar', fit: 'INDOOR', mapQuery: 'Ibis Puerto Varas restaurante', image: 'kuchen.jpg'
  },

  // ---------- ROUPA DE INVERNO ----------
  {
    id: 'patagonia', categoryId: 'roupa', name: 'Patagonia',
    tagline: 'Premium impermeável e segunda pele',
    description: 'Casacos impermeáveis, fleece e base layers de alto nível. Na região úmida, vale investir em algo realmente waterproof.',
    kingTip: 'Priorize a shell impermeável aqui — é a peça que mais faz diferença no clima local.',
    lat: -41.3193, lng: -72.9843, durationLabel: 'Compras', fit: 'INDOOR', mapQuery: 'Patagonia Puerto Varas', image: 'jacket.jpg'
  },
  {
    id: 'north_face', categoryId: 'roupa', name: 'The North Face',
    tagline: 'Inverno e trekking leve, com pegada urbana',
    description: "Boa variedade pra turismo de inverno e trekking leve, com opções também mais 'urban outdoor'.",
    lat: -41.3191, lng: -72.9845, durationLabel: 'Compras', fit: 'INDOOR', mapQuery: 'The North Face Puerto Varas', image: 'jacket.jpg'
  },
  {
    id: 'andesgear', categoryId: 'roupa', name: 'Andesgear',
    tagline: 'Outdoor técnico + marcas chilenas',
    description: 'Forte em equipamentos e roupas outdoor mais técnicas, com marcas chilenas interessantes além das internacionais.',
    kingTip: 'Boa pra base layer e meias térmicas de qualidade a preço mais justo.',
    lat: -41.3189, lng: -72.9847, durationLabel: 'Compras', fit: 'INDOOR', mapQuery: 'Andesgear Puerto Varas', image: 'boots.jpg'
  },
  {
    id: 'lippi', categoryId: 'roupa', name: 'Lippi',
    tagline: 'Marca chilena, bom custo-benefício',
    description: 'Marca chilena conhecida, com bom custo-benefício em fleece, jaquetas e botas.',
    lat: -41.3194, lng: -72.9841, durationLabel: 'Compras', fit: 'INDOOR', mapQuery: 'Lippi Puerto Varas', image: 'jacket.jpg'
  },
  {
    id: 'wild_lama', categoryId: 'roupa', name: 'Wild Lama',
    tagline: 'Lifestyle patagônico estiloso',
    description: 'Estética moderna Patagonia/Lake District. Boa pras ‘cositas’ menos técnicas e mais bonitas.',
    lat: -41.3196, lng: -72.9839, durationLabel: 'Compras', fit: 'INDOOR', mapQuery: 'Wild Lama Puerto Varas', image: 'jacket.jpg'
  },
  {
    id: 'volkanica', categoryId: 'roupa', name: 'Volkanica',
    tagline: 'Outdoor + lifestyle casual',
    description: 'Mistura de outdoor e lifestyle patagônico — boa pra roupas casuais de inverno.',
    lat: -41.3187, lng: -72.9849, durationLabel: 'Compras', fit: 'INDOOR', mapQuery: 'Volkanica Puerto Varas', image: 'boots.jpg'
  },
  {
    id: 'mall_pm', categoryId: 'roupa', name: 'Mall Paseo Costanera (Puerto Montt)',
    tagline: 'Mais variedade e preços, a 25 min',
    description: 'Se faltar variedade em Puerto Varas, o shopping de Puerto Montt tem mais marcas e melhores preços.',
    kingTip: 'Combine com um dia em Puerto Montt + Angelmó.',
    lat: -41.4730, lng: -72.9430, distanceKm: 21, driveMinutes: 25,
    durationLabel: 'Compras', fit: 'INDOOR', mapQuery: 'Mall Paseo Costanera Puerto Montt', image: 'puerto-montt.jpg'
  }
];

export const categoryById = (id: string) => categories.find((c) => c.id === id);
export const attractionsOf = (categoryId: string) => attractions.filter((a) => a.categoryId === categoryId);
export const attractionById = (id: string) => attractions.find((a) => a.id === id);
