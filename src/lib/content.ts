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
  { id: 'mercados', title: 'Mercados & compras', emoji: '🛒', summary: 'Pro plano de café e jantar em casa: supermercados, peixe fresco e feiras.', gradient: ['#B5651D', '#E0A458'] },
  { id: 'restaurantes', title: 'Restaurantes', emoji: '🍽️', summary: 'Pros dias de sair: vista pro lago, fogo, frutos do mar e clássicos.', gradient: ['#9A2617', '#D96C4A'] },
  { id: 'roupa', title: 'Roupa de inverno', emoji: '🧥', summary: 'Onde comprar a camada certa: base, fleece e shell impermeável de verdade.', gradient: ['#1B5E5A', '#4FA39E'] }
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
    kingTip: 'Se o Osorno estiver sem nuvem ao pôr do sol, é A foto da viagem. Olhe o plano do dia na home.',
    lat: -41.3197, lng: -72.9826, distanceKm: 4, driveMinutes: 9,
    durationLabel: '1–2h sem pressa', fit: 'CLEAR_SKY', windSensitive: true, image: 'puerto-varas.jpg'
  },
  {
    id: 'philippi', categoryId: 'apie', name: 'Parque & Mirador Philippi',
    tagline: 'Vista panorâmica do alto da cidade',
    description: 'Um morro arborizado dentro da cidade, com trilha curta porém íngreme até um mirante com vista de 360° do lago, da cidade e do Osorno.',
    whatToDo: ['Subir a trilha até o mirante', 'Piquenique no parque', 'Ver o pôr do sol sobre o lago'],
    whatToBring: ['Água', 'Calçado firme'],
    whatToWear: ['Tênis com boa aderência', 'Camadas (esquenta na subida)'],
    kingTip: 'Evite logo após chuva forte — a subida fica escorregadia. Vá num fim de tarde de céu limpo.',
    lat: -41.3168, lng: -72.9810, distanceKm: 4, driveMinutes: 10,
    durationLabel: '1–1h30', fit: 'CLEAR_SKY', windSensitive: true, image: 'puerto-varas.jpg'
  },
  {
    id: 'centro', categoryId: 'apie', name: 'Centro histórico & Igreja do Sagrado Coração',
    tagline: 'Arquitetura chileno-alemã e cafés',
    description: 'O coração de Puerto Varas: a igreja de 1915 inspirada na Floresta Negra, casas patrimoniais alemãs, lojinhas e cafés de kuchen.',
    whatToDo: ['Ver a Iglesia del Sagrado Corazón', 'Circular pelas casas patrimoniais', 'Café com kuchen', "Garimpar 'cositas' nas lojinhas"],
    whatToBring: ['Carteira para as lojinhas'],
    whatToWear: ['Casaco impermeável', 'Calçado confortável'],
    kingTip: 'Dia chuvoso? É o passeio a pé ideal — quase tudo coberto e com café por perto.',
    lat: -41.3206, lng: -72.9840, distanceKm: 4, driveMinutes: 9,
    durationLabel: '1h', fit: 'INDOOR', image: 'iglesia.jpg'
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
    lat: -41.1700, lng: -72.4189, distanceKm: 62, driveMinutes: 70,
    durationLabel: 'Meio dia', fit: 'RAIN_OK', image: 'saltos.jpg',
    hours: { openDays: [2, 3, 4, 5, 6, 7], openHour: 9, closeHour: 17, note: 'Terça a domingo, 9h–17h (inverno). Fechado às segundas. Entrada ~CLP 7.000 estrangeiro.' },
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
    lat: -41.1330, lng: -72.4170, distanceKm: 64, driveMinutes: 75,
    durationLabel: 'Meio dia (com os Saltos)', fit: 'CLEAR_SKY', windSensitive: true, image: 'todos-los-santos.jpg'
  },
  {
    id: 'osorno', categoryId: 'carro', name: 'Vulcão Osorno (mirantes / centro de ski)',
    tagline: 'O cone perfeito — só vale com céu azul',
    description: 'Subindo de Ensenada, a estrada leva a mirantes e ao centro de ski (La Burbuja) a ~1.200 m, com vistas amplas do lago Llanquihue. O cone nevado é o símbolo da região.',
    whatToDo: ['Parar nos mirantes da subida', 'Vistas do lago lá de cima', 'Café/centro de ski (se aberto)'],
    whatToBring: ['Correntes de pneu (pode ser exigido)', 'Casaco quente', 'Óculos de sol (neve reflete)'],
    whatToWear: ['Casaco impermeável quente', 'Luvas e gorro', 'Bota impermeável'],
    kingTip: 'Só suba com céu limpo — com nuvem você não vê nada. O centro de ski costuma abrir só a partir de meados de junho; confirme estrada/neve na cidade antes de subir.',
    lat: -41.0980, lng: -72.4940, distanceKm: 65, driveMinutes: 80,
    durationLabel: 'Meio dia', fit: 'CLEAR_SKY', windSensitive: true, image: 'osorno.jpg',
    links: [{ label: 'Condições do centro de ski', url: 'https://volcanosorno.com/' }]
  },
  {
    id: 'ensenada', categoryId: 'carro', name: 'Ensenada',
    tagline: 'Cruzamento dos passeios, à beira do lago',
    description: 'Pequeno povoado onde a Ruta 225 encontra a subida ao Osorno e segue pros Saltos. Bons pontos de parada, mirantes do lago e o Calbuco ao sul.',
    whatToDo: ['Parada de café no caminho', 'Mirantes do lago Llanquihue', 'Base pra decidir Osorno x Petrohué'],
    whatToWear: ['Camadas + impermeável'],
    kingTip: "Útil como 'pit stop' — encha o tanque e o estômago aqui antes de subir o vulcão.",
    lat: -41.2010, lng: -72.5530, distanceKm: 42, driveMinutes: 45,
    durationLabel: 'Passagem / 30 min', fit: 'ANY', image: 'llanquihue.jpg'
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
    lat: -41.1240, lng: -73.0560, distanceKm: 33, driveMinutes: 35,
    durationLabel: 'Meio dia', fit: 'INDOOR', image: 'frutillar.jpg',
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
    tagline: 'Vilarejo tranquilo no norte do lago',
    description: 'Pequena e bucólica, na ponta norte do Llanquihue, com casario histórico e a Península de Centinela — uma das vistas mais bonitas do lago e dos vulcões.',
    whatToDo: ['Mirante da Península de Centinela', 'Casario alemão', 'Parada tranquila na volta ao lago'],
    whatToWear: ['Camadas + impermeável'],
    kingTip: 'Combine com a volta ao lago num dia de céu limpo — a Centinela rende fotos lindas.',
    lat: -40.9710, lng: -72.8870, distanceKm: 56, driveMinutes: 60,
    durationLabel: 'Meio dia (com a volta ao lago)', fit: 'CLEAR_SKY', windSensitive: true, image: 'llanquihue.jpg'
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
    lat: -42.4805, lng: -73.7650, distanceKm: 215, driveMinutes: 230,
    durationLabel: 'Dia longo ou 1 noite', fit: 'RAIN_OK', windSensitive: true, image: 'castro.jpg',
    links: [
      { label: 'Hotel Tierra Chiloé', url: 'https://www.tierrahotels.com/tierra-chiloe/' },
      { label: 'OCIO Territorial Hotel', url: 'https://www.ocioterritorial.com/' }
    ]
  },

  // ---------- MERCADOS & COMPRAS ----------
  {
    id: 'jumbo', categoryId: 'mercados', name: 'Jumbo Puerto Varas',
    tagline: 'A compra grande do café + jantar em casa',
    description: 'O supermercado mais completo da cidade. Ideal pra abastecer no primeiro dia: padaria, hortifrúti, salmão/merluza, vinhos e tudo pro Airbnb.',
    whatToDo: ['Compra grande do início da estadia', 'Pegar vinhos e queijos locais'],
    kingTip: 'Faça uma compra grande no dia 1 aqui e vá complementando com peixe e pão fresco no Mercado Municipal.',
    lat: -41.3232, lng: -72.9762, durationLabel: '1h', fit: 'INDOOR', mapQuery: 'Jumbo Puerto Varas'
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
    lat: -41.3210, lng: -72.9805, durationLabel: '30–45 min', fit: 'INDOOR', mapQuery: 'Mercado Puerto Varas'
  },
  {
    id: 'feria_rural', categoryId: 'mercados', name: 'Feria Puerto Varas Rural',
    tagline: 'Produtos rurais e artesanais — só aos sábados',
    description: 'Feira de produtores rurais com alimentos, conservas e artesanato. Acontece aos sábados pela manhã.',
    whatToDo: ['Produtos rurais e conservas', 'Artesanato local', 'Café da feira'],
    kingTip: 'Só sábado, 10h–14h. O plano do dia te lembra quando for sábado.',
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
    lat: -41.3208, lng: -72.9868, durationLabel: 'Jantar', fit: 'INDOOR', mapQuery: 'Casa Valdés Puerto Varas'
  },
  {
    id: 'mesa_tropera', categoryId: 'restaurantes', name: 'Mesa Tropera',
    tagline: 'Píer sobre o lago + cerveja própria',
    description: 'Restaurante-cervejaria com um píer avançando no lago. Pizzas, petiscos e cervejas próprias num ambiente descontraído e muito local.',
    kingTip: 'Ótimo no fim de tarde; chegue cedo pra pegar lugar no deck sobre a água.',
    lat: -41.3199, lng: -72.9851, durationLabel: 'Almoço / jantar', fit: 'INDOOR', mapQuery: 'Mesa Tropera Puerto Varas'
  },
  {
    id: 'santo_fuego', categoryId: 'restaurantes', name: 'Santo Fuego',
    tagline: 'Tudo no fogo — perfeito pra noite fria',
    description: 'Conceito de fogo no centro de tudo: carnes, peixes, frutos do mar e legumes na brasa, em ambiente caloroso e descontraído.',
    kingTip: 'Numa noite gelada de inverno, o calor da brasa aqui acerta em cheio.',
    lat: -41.3185, lng: -72.9846, durationLabel: 'Jantar', fit: 'INDOOR', mapQuery: 'Santo Fuego Puerto Varas'
  },
  {
    id: 'la_olla', categoryId: 'restaurantes', name: 'La Olla',
    tagline: 'Clássico chileno amado pelos locais',
    description: 'Cozinha chilena de sabores robustos e frutos do mar frescos. Um clássico tanto pra visitantes quanto pra moradores.',
    kingTip: 'Peça o prato de frutos do mar do dia — costuma ser o melhor.',
    lat: -41.3260, lng: -72.9720, durationLabel: 'Almoço / jantar', fit: 'INDOOR', mapQuery: 'La Olla Puerto Varas'
  },
  {
    id: 'ibis', categoryId: 'restaurantes', name: 'Restaurante Ibis',
    tagline: 'Variado e aconchegante',
    description: 'Cardápio amplo (panquecas, crepes, saladas, carnes, peixes) em ambiente acolhedor. Bom quando bate a indecisão ou pra agradar gostos diferentes.',
    lat: -41.3192, lng: -72.9858, durationLabel: 'Almoço / jantar', fit: 'INDOOR', mapQuery: 'Ibis Puerto Varas restaurante'
  },

  // ---------- ROUPA DE INVERNO ----------
  {
    id: 'patagonia', categoryId: 'roupa', name: 'Patagonia',
    tagline: 'Premium impermeável e segunda pele',
    description: 'Casacos impermeáveis, fleece e base layers de alto nível. Na região úmida, vale investir em algo realmente waterproof.',
    kingTip: 'Priorize a shell impermeável aqui — é a peça que mais faz diferença no clima local.',
    lat: -41.3193, lng: -72.9843, durationLabel: 'Compras', fit: 'INDOOR', mapQuery: 'Patagonia Puerto Varas'
  },
  {
    id: 'north_face', categoryId: 'roupa', name: 'The North Face',
    tagline: 'Inverno e trekking leve, com pegada urbana',
    description: "Boa variedade pra turismo de inverno e trekking leve, com opções também mais 'urban outdoor'.",
    lat: -41.3191, lng: -72.9845, durationLabel: 'Compras', fit: 'INDOOR', mapQuery: 'The North Face Puerto Varas'
  },
  {
    id: 'andesgear', categoryId: 'roupa', name: 'Andesgear',
    tagline: 'Outdoor técnico + marcas chilenas',
    description: 'Forte em equipamentos e roupas outdoor mais técnicas, com marcas chilenas interessantes além das internacionais.',
    kingTip: 'Boa pra base layer e meias térmicas de qualidade a preço mais justo.',
    lat: -41.3189, lng: -72.9847, durationLabel: 'Compras', fit: 'INDOOR', mapQuery: 'Andesgear Puerto Varas'
  },
  {
    id: 'lippi', categoryId: 'roupa', name: 'Lippi',
    tagline: 'Marca chilena, bom custo-benefício',
    description: 'Marca chilena conhecida, com bom custo-benefício em fleece, jaquetas e botas.',
    lat: -41.3194, lng: -72.9841, durationLabel: 'Compras', fit: 'INDOOR', mapQuery: 'Lippi Puerto Varas'
  },
  {
    id: 'wild_lama', categoryId: 'roupa', name: 'Wild Lama',
    tagline: 'Lifestyle patagônico estiloso',
    description: 'Estética moderna Patagonia/Lake District. Boa pras ‘cositas’ menos técnicas e mais bonitas.',
    lat: -41.3196, lng: -72.9839, durationLabel: 'Compras', fit: 'INDOOR', mapQuery: 'Wild Lama Puerto Varas'
  },
  {
    id: 'volkanica', categoryId: 'roupa', name: 'Volkanica',
    tagline: 'Outdoor + lifestyle casual',
    description: 'Mistura de outdoor e lifestyle patagônico — boa pra roupas casuais de inverno.',
    lat: -41.3187, lng: -72.9849, durationLabel: 'Compras', fit: 'INDOOR', mapQuery: 'Volkanica Puerto Varas'
  },
  {
    id: 'mall_pm', categoryId: 'roupa', name: 'Mall Paseo Costanera (Puerto Montt)',
    tagline: 'Mais variedade e preços, a 25 min',
    description: 'Se faltar variedade em Puerto Varas, o shopping de Puerto Montt tem mais marcas e melhores preços.',
    kingTip: 'Combine com um dia em Puerto Montt + Angelmó.',
    lat: -41.4730, lng: -72.9430, distanceKm: 21, driveMinutes: 25,
    durationLabel: 'Compras', fit: 'INDOOR', mapQuery: 'Mall Paseo Costanera Puerto Montt'
  }
];

export const categoryById = (id: string) => categories.find((c) => c.id === id);
export const attractionsOf = (categoryId: string) => attractions.filter((a) => a.categoryId === categoryId);
export const attractionById = (id: string) => attractions.find((a) => a.id === id);
