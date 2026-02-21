/**
 * Dados mock para o protótipo do Futuro em Rede.
 * Simulam contribuições, oficinas, eventos e itens da biblioteca
 * que no produto final viriam da base de dados PostgreSQL via Supabase.
 */

export interface Contribution {
  id: string;
  type: 'text' | 'audio' | 'image' | 'video' | 'vote_result';
  content_text?: string;
  content_duration_seconds?: number;
  theme: string;
  context_type: string;
  context_id?: string;
  author_type: 'named' | 'pseudonym' | 'anonymous';
  author_display?: string;
  license: string;
  geo_label?: string;
  tags: string[];
  in_response_to?: string;
  status: string;
  created_at: string;
}

export interface Workshop {
  id: string;
  slug: string;
  title: string;
  description: string;
  theme: string;
  form_config: {
    main_question: string;
    instructions: string;
    accepted_types: string[];
    text_placeholder: string;
    text_max_chars: number;
    audio_max_seconds: number;
    custom_tags: string[];
    allow_anonymous: boolean;
    confirmation_message: string;
  };
  status: 'draft' | 'active' | 'closed';
  active_from?: string;
  active_until?: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  content?: string;
  author_display?: string;
  tags: string[];
  created_at: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  location?: string;
  starts_at: string;
  ends_at?: string;
  organizer_display?: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface NeighborhoodMessage {
  id: string;
  content: string;
  author_display?: string;
  totem_origin: string;
  totem_destination?: string;
  created_at: string;
  expires_at?: string;
}

/* ─── Contribuições mock ─── */
export const mockContributions: Contribution[] = [
  {
    id: "c1",
    type: "text",
    content_text: "Lembro-me de quando o rio corria limpo e as crianças brincavam na margem. Quero que os meus netos possam fazer o mesmo.",
    theme: "memory",
    context_type: "workshop",
    context_id: "workshop_memory_1",
    author_type: "named",
    author_display: "Maria da Conceição",
    license: "CC-BY-SA-4.0",
    geo_label: "Praça do Totem A",
    tags: ["rio", "infância", "natureza"],
    status: "published",
    created_at: "2027-01-15T10:30:00Z",
  },
  {
    id: "c2",
    type: "audio",
    content_text: "Testemunho sobre a horta comunitária e o futuro da alimentação no bairro.",
    content_duration_seconds: 150,
    theme: "ecological_futures",
    context_type: "totem",
    context_id: "totem_a",
    author_type: "pseudonym",
    author_display: "Jardineiro do Bairro",
    license: "CC-BY-SA-4.0",
    tags: ["horta", "alimentação", "comunidade"],
    status: "published",
    created_at: "2027-01-20T14:15:00Z",
  },
  {
    id: "c3",
    type: "text",
    content_text: "Imagino o Bairro C em 2050 com árvores nas ruas, painéis solares em todos os telhados e uma cooperativa de energia local.",
    theme: "ecological_futures",
    context_type: "online",
    author_type: "anonymous",
    license: "CC-BY-SA-4.0",
    tags: ["energia", "solar", "cooperativa"],
    status: "published",
    created_at: "2027-02-01T09:00:00Z",
  },
  {
    id: "c4",
    type: "image",
    content_text: "Desenho feito pelas crianças da escola: o bairro do futuro com jardins verticais.",
    theme: "childhood_futures",
    context_type: "workshop",
    context_id: "workshop_childhood_1",
    author_type: "named",
    author_display: "Turma 4ºB",
    license: "CC-BY-SA-4.0",
    geo_label: "Escola do Bairro C",
    tags: ["desenho", "crianças", "jardins"],
    status: "published",
    created_at: "2027-02-10T11:00:00Z",
  },
  {
    id: "c5",
    type: "text",
    content_text: "A mercearia da Dona Rosa fechou em 2019. Era o coração do bairro. Precisamos de espaços de comércio local que resistam.",
    theme: "proximity_economy",
    context_type: "totem",
    context_id: "totem_b",
    author_type: "named",
    author_display: "António Silva",
    license: "CC-BY-SA-4.0",
    tags: ["comércio", "local", "mercearia"],
    status: "published",
    created_at: "2027-02-15T16:30:00Z",
  },
  {
    id: "c6",
    type: "text",
    content_text: "E se transformássemos os dados da qualidade do ar em música? Cada sensor um instrumento, cada dia uma composição.",
    theme: "data_art",
    context_type: "online",
    author_type: "pseudonym",
    author_display: "Artista do Ar",
    license: "CC-BY-SA-4.0",
    tags: ["arte", "dados", "ar", "música"],
    status: "published",
    created_at: "2027-03-01T18:00:00Z",
  },
  {
    id: "c7",
    type: "audio",
    content_text: "Canção tradicional do bairro, gravada com a D. Fernanda, 82 anos.",
    content_duration_seconds: 210,
    theme: "memory",
    context_type: "kit_loan",
    context_id: "kit_007",
    author_type: "named",
    author_display: "Fernanda Oliveira",
    license: "CC-BY-SA-4.0",
    geo_label: "Casa da D. Fernanda",
    tags: ["canção", "tradição", "memória oral"],
    status: "published",
    created_at: "2027-03-05T10:00:00Z",
  },
];

/* ─── Oficinas mock ─── */
export const mockWorkshops: Workshop[] = [
  {
    id: "w1",
    slug: "workshop_ecological_futures",
    title: "Como imaginas o Bairro C em 2050?",
    description: "Uma conversa sobre futuros ecológicos — como será viver aqui com as mudanças climáticas? O que queremos preservar e o que queremos mudar?",
    theme: "ecological_futures",
    form_config: {
      main_question: "Como imaginas o Bairro C em 2050 com +3°C?",
      instructions: "Podes escrever, gravar a tua voz ou tirar uma foto. Não há resposta certa.",
      accepted_types: ["text", "audio", "image"],
      text_placeholder: "Descreve em poucas palavras...",
      text_max_chars: 500,
      audio_max_seconds: 180,
      custom_tags: ["floresta", "água", "calor", "comunidade", "comida"],
      allow_anonymous: true,
      confirmation_message: "Obrigada! A tua contribuição foi guardada no arquivo do bairro.",
    },
    status: "active",
    active_from: "2027-01-01T00:00:00Z",
    active_until: "2027-06-30T23:59:59Z",
  },
  {
    id: "w2",
    slug: "workshop_memory",
    title: "Memórias do Bairro — O que não queremos esquecer",
    description: "Partilha as tuas memórias do bairro. Histórias, sons, cheiros, lugares que já não existem.",
    theme: "memory",
    form_config: {
      main_question: "Que memória do bairro queres guardar para sempre?",
      instructions: "Conta-nos uma história, grava a tua voz ou partilha uma fotografia antiga.",
      accepted_types: ["text", "audio", "image"],
      text_placeholder: "A minha memória do bairro...",
      text_max_chars: 1000,
      audio_max_seconds: 300,
      custom_tags: ["infância", "família", "rua", "festa", "escola"],
      allow_anonymous: true,
      confirmation_message: "Obrigada! A tua memória ficará guardada no arquivo do bairro.",
    },
    status: "active",
    active_from: "2027-02-01T00:00:00Z",
  },
  {
    id: "w3",
    slug: "workshop_economy",
    title: "Economia de Proximidade",
    description: "Como fortalecer o comércio local e as trocas entre vizinhos?",
    theme: "proximity_economy",
    form_config: {
      main_question: "O que faz falta no bairro? O que podemos trocar entre nós?",
      instructions: "Partilha ideias para fortalecer a economia local do Bairro C.",
      accepted_types: ["text"],
      text_placeholder: "A minha ideia para a economia do bairro...",
      text_max_chars: 500,
      audio_max_seconds: 0,
      custom_tags: ["trocas", "comércio", "cooperativa", "mercado"],
      allow_anonymous: true,
      confirmation_message: "Obrigada! A tua ideia foi registada.",
    },
    status: "closed",
  },
];

/* ─── Biblioteca mock ─── */
export const mockLibraryItems: LibraryItem[] = [
  {
    id: "l1",
    title: "Receita da Sopa de Nabiças da D. Fernanda",
    description: "Receita tradicional do bairro, passada de geração em geração.",
    category: "recipe",
    content: "Ingredientes: nabiças, batata, chouriço, azeite. Cozinhar em lume brando durante 40 minutos...",
    author_display: "Fernanda Oliveira",
    tags: ["receita", "tradição", "sopa"],
    created_at: "2027-01-20T10:00:00Z",
  },
  {
    id: "l2",
    title: "Como compostar no apartamento",
    description: "Guia prático para começar a compostar em espaços pequenos.",
    category: "knowledge",
    content: "Passo 1: Arranjar um balde com tampa...",
    author_display: "Horta Comunitária",
    tags: ["compostagem", "sustentabilidade"],
    created_at: "2027-02-05T14:00:00Z",
  },
  {
    id: "l3",
    title: "Contacto: Canalizador de confiança",
    description: "O Sr. Manuel, canalizador no bairro há 30 anos.",
    category: "contact",
    author_display: "António Silva",
    tags: ["serviços", "canalizador"],
    created_at: "2027-02-10T09:00:00Z",
  },
  {
    id: "l4",
    title: "Kit de ferramentas comunitário",
    description: "Ferramentas disponíveis para empréstimo na sede da associação.",
    category: "tool",
    content: "Berbequim, serra tico-tico, nível, martelo, chaves de fendas. Pedir emprestado na sede, devolver em 48h.",
    tags: ["ferramentas", "partilha"],
    created_at: "2027-03-01T11:00:00Z",
  },
];

/* ─── Calendário mock ─── */
export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: "e1",
    title: "Oficina: Futuros Ecológicos",
    description: "Conversa comunitária sobre o futuro do bairro face às alterações climáticas.",
    location: "Sede da Associação, Bairro C",
    starts_at: "2027-04-15T18:00:00Z",
    ends_at: "2027-04-15T20:00:00Z",
    organizer_display: "Tabea (Facilitadora)",
    status: "approved",
  },
  {
    id: "e2",
    title: "Mercado de trocas",
    description: "Traga o que não precisa, leve o que precisa. Sem dinheiro.",
    location: "Praça do Totem A",
    starts_at: "2027-04-20T10:00:00Z",
    ends_at: "2027-04-20T13:00:00Z",
    organizer_display: "Vizinhos do Bairro",
    status: "approved",
  },
  {
    id: "e3",
    title: "Sessão de gravação de memórias",
    description: "Vem gravar a tua memória do bairro para o arquivo.",
    location: "Casa da D. Fernanda",
    starts_at: "2027-05-01T15:00:00Z",
    ends_at: "2027-05-01T17:00:00Z",
    status: "pending",
  },
];

/* ─── Mensagens de vizinhança mock ─── */
export const mockMessages: NeighborhoodMessage[] = [
  {
    id: "m1",
    content: "Alguém tem ovos para emprestar? Estou a fazer um bolo para a festa do bairro!",
    author_display: "Rosa",
    totem_origin: "totem_a",
    created_at: "2027-03-10T09:30:00Z",
    expires_at: "2027-03-13T09:30:00Z",
  },
  {
    id: "m2",
    content: "A horta comunitária precisa de voluntários este sábado de manhã. Tragam luvas!",
    author_display: "Horta do Bairro",
    totem_origin: "totem_b",
    created_at: "2027-03-11T14:00:00Z",
    expires_at: "2027-03-15T14:00:00Z",
  },
  {
    id: "m3",
    content: "Encontrei um gato cinzento perto do totem B. Alguém reconhece?",
    totem_origin: "totem_a",
    totem_destination: "totem_b",
    created_at: "2027-03-12T11:00:00Z",
    expires_at: "2027-03-14T11:00:00Z",
  },
];
