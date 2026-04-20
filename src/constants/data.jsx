// ─── Lawyers ────────────────────────────────────────────────────────────────

export const LAWYERS = [
    {
      id: '1',
      name: 'Dr. Carlos Mendes',
      initials: 'CM',
      oab: 'OAB/SP 123.456',
      area: 'DIREITO TRABALHISTA',
      specialties: ['Direito trabalhista', 'Direito Civil'],
      rating: 4.8,
      totalReviews: 32,
      clientsServed: 47,
      avatarColor: '#002D4B',
      about:
        'Especialista em causas trabalhistas com mais de 15 anos de experiência. Atuação em grandes empresas e pequenos negócios, sempre priorizando acordos extrajudiciais. Alta taxa de êxito em verbas rescisórias.',
      reviews: [
        {
          name: 'Juan Jesus',
          initials: 'JJ',
          rating: 5,
          timeAgo: 'Há 2 dias',
          text: 'Excelente profissional, resolveu meu caso rapidamente e com total transparência.',
        },
        {
          name: 'Maria Souza',
          initials: 'MS',
          rating: 5,
          timeAgo: 'Há 1 semana',
          text: 'Muito atencioso e competente. Recomendo fortemente.',
        },
      ],
    },
    {
      id: '2',
      name: 'Dra. Ana Paula Lima',
      initials: 'AP',
      oab: 'OAB/RJ 98.765',
      area: 'DIREITO DE FAMÍLIA',
      specialties: ['Direito de Família', 'Direito Sucessório'],
      rating: 4.9,
      totalReviews: 58,
      clientsServed: 93,
      avatarColor: '#006D77',
      about:
        'Advogada com ampla experiência em divórcios litigiosos, guarda compartilhada e inventários. Abordagem humanizada e foco no melhor interesse dos envolvidos, especialmente de crianças.',
      reviews: [
        {
          name: 'Roberto Alves',
          initials: 'RA',
          rating: 5,
          timeAgo: 'Há 3 dias',
          text: 'Dra. Ana Paula foi fundamental num momento muito difícil. Profissionalismo impecável.',
        },
        {
          name: 'Fernanda Costa',
          initials: 'FC',
          rating: 4,
          timeAgo: 'Há 2 semanas',
          text: 'Muito competente e empática. O processo foi menos doloroso graças à ela.',
        },
      ],
    },
    {
      id: '3',
      name: 'Dr. Ricardo Fonseca',
      initials: 'RF',
      oab: 'OAB/MG 54.321',
      area: 'DIREITO DO CONSUMIDOR',
      specialties: ['Direito do Consumidor', 'Direito Digital'],
      rating: 4.7,
      totalReviews: 21,
      clientsServed: 34,
      avatarColor: '#4A3728',
      about:
        'Especializado em defesa do consumidor, incluindo cobranças indevidas, negativações injustas e danos morais. Experiência crescente em direito digital e proteção de dados (LGPD).',
      reviews: [
        {
          name: 'Lucas Pinto',
          initials: 'LP',
          rating: 5,
          timeAgo: 'Há 5 dias',
          text: 'Resolveu minha negativação indevida em tempo recorde. Excelente!',
        },
        {
          name: 'Carla Nunes',
          initials: 'CN',
          rating: 4,
          timeAgo: 'Há 3 semanas',
          text: 'Atendimento ágil e resultado positivo. Super indico.',
        },
      ],
    },
    {
      id: '4',
      name: 'Dra. Juliana Torres',
      initials: 'JT',
      oab: 'OAB/SP 201.887',
      area: 'DIREITO PREVIDENCIÁRIO',
      specialties: ['Direito Previdenciário', 'INSS'],
      rating: 4.6,
      totalReviews: 44,
      clientsServed: 71,
      avatarColor: '#5B2D8E',
      about:
        'Focada em benefícios do INSS, aposentadorias, pensões por morte e revisão de benefícios negados. Atua com atenção especial a trabalhadores rurais e segurados de baixa renda.',
      reviews: [
        {
          name: 'José Oliveira',
          initials: 'JO',
          rating: 5,
          timeAgo: 'Há 1 dia',
          text: 'Consegui minha aposentadoria após anos de luta. Dra. Juliana foi incrível!',
        },
        {
          name: 'Tereza Melo',
          initials: 'TM',
          rating: 4,
          timeAgo: 'Há 1 mês',
          text: 'Muito paciente e explicou tudo claramente. Ótima profissional.',
        },
      ],
    },
  ];
  
  // ─── User Cases ──────────────────────────────────────────────────────────────
  
  export const USER_CASES = [
    {
      id: '1',
      title: 'Rescisão trabalhista indevida',
      area: 'DIREITO TRABALHISTA',
      status: 'ATIVO',
      filedAt: '12 Out. 2024',
      description:
        'Demissão sem justa causa com pagamento incorreto de verbas rescisórias. FGTS não depositado nos últimos 3 meses e aviso prévio não cumprido pela empresa.',
      interestedLawyerIds: ['1', '2'],
      documents: ['Carteira de trabalho', 'Contracheques', 'Termo de rescisão'],
      successProbability: 'Alta',
    },
    {
      id: '2',
      title: 'Pensão alimentícia em atraso',
      area: 'DIREITO DE FAMÍLIA',
      status: 'ATIVO',
      filedAt: '03 Nov. 2024',
      description:
        'Três parcelas de pensão alimentícia em atraso pelo alimentante. Acordo homologado em juízo prevê pagamento mensal até o dia 5 de cada mês.',
      interestedLawyerIds: ['2', '3'],
      documents: ['Acordo homologado', 'Comprovantes de não pagamento'],
      successProbability: 'Média',
    },
  ];
  
  // ─── Message Previews (keyed by lawyer id) ───────────────────────────────────
  
  export const MESSAGE_PREVIEWS = {
    '1': {
      text: 'Olá João! Vi seu caso e posso ajudar com as verbas rescisórias.',
      time: '09:41',
      caseTitle: 'Rescisão trabalhista indevida',
    },
    '2': {
      text: 'Recebi os documentos. Vamos agendar uma conversa esta semana?',
      time: '08:15',
      caseTitle: 'Pensão alimentícia em atraso',
    },
    '3': {
      text: 'O prazo para contestação vence na sexta. Precisamos agir rápido.',
      time: 'Ontem',
      caseTitle: 'Rescisão trabalhista indevida',
    },
    '4': {
      text: 'Boa tarde! Analisei seu caso e tenho boas notícias para compartilhar.',
      time: 'Seg',
      caseTitle: 'Pensão alimentícia em atraso',
    },
  };
  
  // ─── Star Labels ──────────────────────────────────────────────────────────────
  
  // Index 0 is intentionally empty (no rating selected yet).
  export const STAR_LABELS = ['', 'Ruim', 'Regular', 'Bom', 'Ótimo', 'Excelente'];