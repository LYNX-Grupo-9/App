import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, FlatList, StatusBar, Modal, Dimensions, Switch } from 'react-native';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, MessageSquare, User, Bell, Search, Briefcase, ChevronRight, Paperclip, SendHorizontal, X, FileText, Sparkles, Star, Users, Folder, CheckCircle2 } from 'lucide-react-native';
import Svg, { Path, Line } from 'react-native-svg';

const SetaVoltar = ({ color = '#666666', size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="20" y1="12" x2="4" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M10 6L4 12L10 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

const { width } = Dimensions.get('window');
const Pilha = createStackNavigator();
const Abas = createBottomTabNavigator();

const CORES = {
  fundo: '#F8F9FB',
  branco: '#FFFFFF',
  petroleo: '#006D77',
  petroleoClaro: '#83C5BE',
  navy: '#002D4B',
  cinza: '#666666',
  cinzaBorda: '#EEEEEE',
  azulOk: '#1E90FF',
  estrela: '#FFB400'
};

// --- BANCO DE DADOS DE ADVOGADOS ---

const ADVOGADOS = [
  {
    id: '1',
    nome: 'Dr. Carlos Mendes',
    iniciais: 'CM',
    oab: 'OAB/SP 123.456',
    area: 'DIREITO TRABALHISTA',
    especialidades: ['Direito trabalhista', 'Direito Civil'],
    nota: 4.8,
    totalAvaliacoes: 32,
    clientesAtendidos: 47,
    corAvatar: '#002D4B',
    sobre: 'Especialista em causas trabalhistas com mais de 15 anos de experiência. Atuação em grandes empresas e pequenos negócios, sempre priorizando acordos extrajudiciais. Alta taxa de êxito em verbas rescisórias.',
    avaliacoes: [
      { nome: 'Juan Jesus', iniciais: 'JJ', nota: 5, tempo: 'Há 2 dias', texto: 'Excelente profissional, resolveu meu caso rapidamente e com total transparência.' },
      { nome: 'Maria Souza', iniciais: 'MS', nota: 5, tempo: 'Há 1 semana', texto: 'Muito atencioso e competente. Recomendo fortemente.' },
    ],
  },
  {
    id: '2',
    nome: 'Dra. Ana Paula Lima',
    iniciais: 'AP',
    oab: 'OAB/RJ 98.765',
    area: 'DIREITO DE FAMÍLIA',
    especialidades: ['Direito de Família', 'Direito Sucessório'],
    nota: 4.9,
    totalAvaliacoes: 58,
    clientesAtendidos: 93,
    corAvatar: '#006D77',
    sobre: 'Advogada com ampla experiência em divórcios litigiosos, guarda compartilhada e inventários. Abordagem humanizada e foco no melhor interesse dos envolvidos, especialmente de crianças.',
    avaliacoes: [
      { nome: 'Roberto Alves', iniciais: 'RA', nota: 5, tempo: 'Há 3 dias', texto: 'Dra. Ana Paula foi fundamental num momento muito difícil. Profissionalismo impecável.' },
      { nome: 'Fernanda Costa', iniciais: 'FC', nota: 4, tempo: 'Há 2 semanas', texto: 'Muito competente e empática. O processo foi menos doloroso graças à ela.' },
    ],
  },
  {
    id: '3',
    nome: 'Dr. Ricardo Fonseca',
    iniciais: 'RF',
    oab: 'OAB/MG 54.321',
    area: 'DIREITO DO CONSUMIDOR',
    especialidades: ['Direito do Consumidor', 'Direito Digital'],
    nota: 4.7,
    totalAvaliacoes: 21,
    clientesAtendidos: 34,
    corAvatar: '#4A3728',
    sobre: 'Especializado em defesa do consumidor, incluindo cobranças indevidas, negativações injustas e danos morais. Experiência crescente em direito digital e proteção de dados (LGPD).',
    avaliacoes: [
      { nome: 'Lucas Pinto', iniciais: 'LP', nota: 5, tempo: 'Há 5 dias', texto: 'Resolveu minha negativação indevida em tempo recorde. Excelente!' },
      { nome: 'Carla Nunes', iniciais: 'CN', nota: 4, tempo: 'Há 3 semanas', texto: 'Atendimento ágil e resultado positivo. Super indico.' },
    ],
  },
  {
    id: '4',
    nome: 'Dra. Juliana Torres',
    iniciais: 'JT',
    oab: 'OAB/SP 201.887',
    area: 'DIREITO PREVIDENCIÁRIO',
    especialidades: ['Direito Previdenciário', 'INSS'],
    nota: 4.6,
    totalAvaliacoes: 44,
    clientesAtendidos: 71,
    corAvatar: '#5B2D8E',
    sobre: 'Focada em benefícios do INSS, aposentadorias, pensões por morte e revisão de benefícios negados. Atua com atenção especial a trabalhadores rurais e segurados de baixa renda.',
    avaliacoes: [
      { nome: 'José Oliveira', iniciais: 'JO', nota: 5, tempo: 'Há 1 dia', texto: 'Consegui minha aposentadoria após anos de luta. Dra. Juliana foi incrível!' },
      { nome: 'Tereza Melo', iniciais: 'TM', nota: 4, tempo: 'Há 1 mês', texto: 'Muito paciente e explicou tudo claramente. Ótima profissional.' },
    ],
  },
];

// --- BANCO DE DADOS DE CASOS ---

const CASOS_USUARIO = [
  {
    id: '1',
    titulo: 'Rescisão trabalhista indevida',
    area: 'DIREITO TRABALHISTA',
    status: 'ATIVO',
    protocolo: '12 Out. 2024',
    descricao: 'Demissão sem justa causa com pagamento incorreto de verbas rescisórias. FGTS não depositado nos últimos 3 meses e aviso prévio não cumprido pela empresa.',
    advogadosInteressados: ['1', '2'],
    documentos: ['Carteira de trabalho', 'Contracheques', 'Termo de rescisão'],
    probabilidade: 'Alta',
  },
  {
    id: '2',
    titulo: 'Pensão alimentícia em atraso',
    area: 'DIREITO DE FAMÍLIA',
    status: 'ATIVO',
    protocolo: '03 Nov. 2024',
    descricao: 'Três parcelas de pensão alimentícia em atraso pelo alimentante. Acordo homologado em juízo prevê pagamento mensal até o dia 5 de cada mês.',
    advogadosInteressados: ['2', '3'],
    documentos: ['Acordo homologado', 'Comprovantes de não pagamento'],
    probabilidade: 'Média',
  },
];

// --- COMPONENTES ---

const CardCasoCarrossel = ({ titulo, area, status, onPress }) => (
  <TouchableOpacity style={estilos.cardCarrossel} onPress={onPress}>
    <View style={estilos.linhaEspacada}>
      <View style={estilos.tagArea}><Text style={estilos.textoTagArea}>{area}</Text></View>
      <View style={estilos.tagStatus}><Text style={estilos.textoTagStatus}>{status}</Text></View>
    </View>
    <Text style={estilos.tituloCardCaso}>{titulo}</Text>
    <View style={estilos.rodapeCardCaso}>
      <View style={estilos.grupoAvatares}>
        {ADVOGADOS.slice(0, 3).map((adv, idx) => (
          <View key={adv.id} style={[estilos.miniAvatar, { backgroundColor: adv.corAvatar, marginLeft: idx === 0 ? 0 : -8 }]}>
            <Text style={estilos.textoMiniAvatar}>{adv.iniciais.charAt(0)}</Text>
          </View>
        ))}
      </View>
      <Text style={estilos.textoInteressados}>{ADVOGADOS.length} advogados entraram em contato</Text>
    </View>
  </TouchableOpacity>
);

// --- TELAS ---

const TelaInicio = ({ navigation }) => {
  const casos = [
    { id: '1', titulo: 'Rescisão trabalhista indevida', area: 'DIREITO TRABALHISTA', status: 'ATIVO' },
    { id: '2', titulo: 'Pensão alimentícia em atraso', area: 'DIREITO DE FAMÍLIA', status: 'ATIVO' },
  ];

  return (
    <SafeAreaView style={estilos.container}>
      <StatusBar barStyle="dark-content" />
      <View style={estilos.cabecalhoHome}>
        <Text style={estilos.logoTexto}>JurisMatch</Text>
        <Bell color={CORES.navy} size={24} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={estilos.paddingPadrao}>
          <Text style={estilos.olaTexto}>Olá, João</Text>
          <Text style={estilos.subOla}>Confira o andamento dos seus casos hoje</Text>

          <View style={estilos.linhaEspacada}>
            <Text style={estilos.tituloSessao}>Meus Casos</Text>
            <TouchableOpacity style={estilos.botaoNovoCaso}><Text style={estilos.textoBotaoNovo}>+ Novo caso</Text></TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={casos}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
          renderItem={({ item }) => (
            <CardCasoCarrossel
              titulo={item.titulo}
              area={item.area}
              status={item.status}
              onPress={() => navigation.navigate('Detalhe')}
            />
          )}
          keyExtractor={item => item.id}
        />

        <View style={estilos.paddingPadrao}>
          <Text style={estilos.tituloSessao}>Advogados interessados</Text>
          <Text style={estilos.subOla}>Advogados que desejam falar com você</Text>

          {ADVOGADOS.map((adv) => (
            <TouchableOpacity
              key={adv.id}
              style={estilos.itemAdvogado}
              onPress={() => navigation.navigate('PerfilAdvogado', { advogadoId: adv.id })}
            >
              <View style={[estilos.avatarCircular, { backgroundColor: adv.corAvatar }]}>
                <Text style={estilos.textoIniciais}>{adv.iniciais}</Text>
              </View>
              <View style={estilos.infoAdvogado}>
                <Text style={estilos.nomeAdvogado}>{adv.nome}</Text>
                <Text style={estilos.areaAdvogado}>{adv.area}</Text>
                <View style={estilos.pastaCaso}>
                  <Briefcase size={14} color={CORES.cinza} />
                  <Text style={estilos.textoPasta}>Sobre: Rescisão trabalhista indevida</Text>
                </View>
              </View>
              <ChevronRight color="#CCC" size={20} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const TelaDetalhe = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.cabecalhoSimples}>
        <TouchableOpacity onPress={() => navigation.goBack()}><SetaVoltar color={CORES.cinza} /></TouchableOpacity>
        <Text style={estilos.tituloHeader}>Rescisão trabalhista ...</Text>
        <Bell color={CORES.navy} size={24} />
      </View>

      <ScrollView style={estilos.paddingPadrao}>
        <View style={estilos.linhaEspacada}>
          <View style={estilos.tagStatusVerde}><Text style={estilos.textoTagStatus}>ATIVO</Text></View>
          <Text style={estilos.dataTexto}>Protocolado em 12 Out.</Text>
        </View>

        <View style={estilos.cardIA}>
          <View style={estilos.linhaIA}>
            <Sparkles color={CORES.petroleoClaro} size={18} />
            <Text style={estilos.tituloIA}>Análise da IA</Text>
          </View>
          <Text style={estilos.textoIA}>Este caso apresenta alta probabilidade de êxito com base em precedentes de demissão sem justa causa revertidos no TRT-2...</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={estilos.linkIA}>Ver análise completa ➔</Text>
          </TouchableOpacity>
        </View>

        <View style={estilos.linhaEspacada}>
          <Text style={estilos.tituloSessao}>Advogados interessados</Text>
          <Text style={estilos.numeroDestaque}>{ADVOGADOS.length}</Text>
        </View>

        {ADVOGADOS.map((adv) => (
          <View key={adv.id} style={estilos.cardAdvogadoInteresse}>
            <View style={estilos.cabecalhoInteresse}>
              <View style={[estilos.avatarCircular, { backgroundColor: adv.corAvatar }]}>
                <Text style={estilos.textoIniciais}>{adv.iniciais}</Text>
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={estilos.nomeAdvogado}>{adv.nome}</Text>
                <Text style={estilos.areaAdvogado}>{adv.area}</Text>
              </View>
            </View>
            <View style={estilos.balaoResumo}>
              <Text style={estilos.textoResumo}>"{adv.sobre.substring(0, 80)}..."</Text>
            </View>
            <View style={estilos.grupoBotoes}>
              <TouchableOpacity style={estilos.btnChat} onPress={() => navigation.navigate('Chat', { advogadoId: adv.id })}>
                <Text style={estilos.txtBranco}>Abrir Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity style={estilos.btnPerfil} onPress={() => navigation.navigate('PerfilAdvogado', { advogadoId: adv.id })}>
                <Text style={estilos.txtPetroleo}>Perfil</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={estilos.modalOverlay}>
          <View style={estilos.modalCorpo}>
            <View style={estilos.cabecalhoModal}>
              <Sparkles color={CORES.azulOk} size={20} />
              <Text style={estilos.tituloModal}>Análise da IA</Text>
            </View>
            <Text style={estilos.textoModalCompleto}>O caso apresenta fortes indícios de rescisão indireta devido ao atraso reiterado no pagamento de salários e ausência de depósitos de FGTS...</Text>
            <Text style={estilos.avisoModal}>Esta análise é automática e serve apenas para triagem inicial.</Text>
            <TouchableOpacity style={estilos.btnOk} onPress={() => setModalVisible(false)}><Text style={estilos.txtBranco}>OK</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const TelaPerfilAdvogado = ({ navigation, route }) => {
  const advogadoId = route?.params?.advogadoId || '1';
  const adv = ADVOGADOS.find(a => a.id === advogadoId) || ADVOGADOS[0];

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.cabecalhoSimples}>
        <TouchableOpacity onPress={() => navigation.goBack()}><SetaVoltar color={CORES.cinza} /></TouchableOpacity>
        <Bell color={CORES.navy} size={24} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={estilos.paddingPadrao}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <View style={[estilos.avatarCircularGigante, { backgroundColor: adv.corAvatar }]}>
            <Text style={estilos.textoIniciaisGigante}>{adv.iniciais}</Text>
          </View>
          <Text style={estilos.nomeDestaque}>{adv.nome}</Text>
          <Text style={estilos.subtituloCinza}>{adv.oab}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Star color={CORES.estrela} fill={CORES.estrela} size={18} />
            <Text style={{ fontWeight: 'bold', marginLeft: 5, color: CORES.navy }}>
              {adv.nota} <Text style={{ fontWeight: 'normal', color: '#999' }}>({adv.totalAvaliacoes} avaliações)</Text>
            </Text>
          </View>
        </View>

        <View style={estilos.cardImpacto}>
          <View style={estilos.iconeImpacto}><Users color={CORES.navy} size={24} /></View>
          <View>
            <Text style={{ fontSize: 10, color: '#999', fontWeight: 'bold' }}>IMPACTO</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: CORES.navy }}>{adv.clientesAtendidos} clientes atendidos</Text>
          </View>
        </View>

        <Text style={estilos.labelSessao}>ESPECIALIDADES</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 25 }}>
          {adv.especialidades.map((esp, idx) => (
            <View key={idx} style={estilos.tagCinza}><Text style={estilos.txtTagCinza}>{esp}</Text></View>
          ))}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          <FileText color={CORES.navy} size={20} />
          <Text style={{ fontWeight: 'bold', color: CORES.navy, marginLeft: 10 }}>Sobre o Profissional</Text>
        </View>
        <View style={estilos.boxSobre}>
          <Text style={{ fontSize: 13, color: CORES.navy, lineHeight: 20 }}>{adv.sobre}</Text>
        </View>

        <TouchableOpacity style={estilos.btnChatLargo} onPress={() => navigation.navigate('Chat', { advogadoId: adv.id })}>
          <MessageSquare color="#FFF" size={20} />
          <Text style={[estilos.txtBranco, { marginLeft: 10 }]}>Iniciar conversa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.btnBrancoLargo}>
          <Folder color={CORES.cinza} size={20} />
          <Text style={[estilos.txtCinza, { marginLeft: 10 }]}>Ver documentos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.btnBrancoLargo} onPress={() => navigation.navigate('Avaliar', { advogadoId: adv.id })}>
          <Star color={CORES.cinza} size={20} />
          <Text style={[estilos.txtCinza, { marginLeft: 10 }]}>Avaliar</Text>
        </TouchableOpacity>

        <View style={[estilos.linhaEspacada, { marginTop: 20 }]}>
          <Text style={estilos.tituloSessao}>Últimas Avaliações</Text>
          <Text style={{ color: CORES.petroleo, fontWeight: 'bold' }}>Ver todas</Text>
        </View>

        {adv.avaliacoes.map((av, idx) => (
          <View key={idx} style={[estilos.cardAvaliacao, { marginBottom: 12 }]}>
            <View style={[estilos.avatarCircularPequeno, { backgroundColor: CORES.navy }]}>
              <Text style={{ color: '#FFF', fontSize: 10 }}>{av.iniciais}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <View style={estilos.linhaEspacada}>
                <Text style={{ fontWeight: 'bold', color: CORES.navy }}>{av.nome}</Text>
                <View style={{ flexDirection: 'row' }}>
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} color={CORES.estrela} fill={s <= av.nota ? CORES.estrela : 'transparent'} size={10} />
                  ))}
                </View>
              </View>
              <Text style={{ fontSize: 10, color: CORES.petroleo, fontWeight: 'bold' }}>{av.tempo}</Text>
              <Text style={{ fontSize: 12, color: CORES.cinza, marginTop: 5 }}>{av.texto}</Text>
            </View>
          </View>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const MENSAGENS_PREVIEW = {
  '1': { texto: 'Olá João! Vi seu caso e posso ajudar com as verbas rescisórias.', hora: '09:41', caso: 'Rescisão trabalhista indevida' },
  '2': { texto: 'Recebi os documentos. Vamos agendar uma conversa esta semana?', hora: '08:15', caso: 'Pensão alimentícia em atraso' },
  '3': { texto: 'O prazo para contestação vence na sexta. Precisamos agir rápido.', hora: 'Ontem', caso: 'Rescisão trabalhista indevida' },
  '4': { texto: 'Boa tarde! Analisei seu caso e tenho boas notícias para compartilhar.', hora: 'Seg', caso: 'Pensão alimentícia em atraso' },
};

const TelaConversas = ({ navigation, lidos, marcarLido }) => {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('todos');

  const conversasFiltradas = ADVOGADOS.filter((adv) => {
    const foiLido = lidos.includes(adv.id);
    const preview = MENSAGENS_PREVIEW[adv.id];
    const termoBusca = busca.toLowerCase();

    const passaBusca = termoBusca === '' ||
      adv.nome.toLowerCase().includes(termoBusca) ||
      adv.area.toLowerCase().includes(termoBusca) ||
      preview?.caso.toLowerCase().includes(termoBusca) ||
      preview?.texto.toLowerCase().includes(termoBusca);

    const passaFiltro = filtro === 'todos' || (filtro === 'nao_lidas' && !foiLido);

    return passaBusca && passaFiltro;
  });

  const totalNaoLidas = ADVOGADOS.filter(a => !lidos.includes(a.id)).length;

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.cabecalhoSimples}>
        <TouchableOpacity onPress={() => navigation.goBack()}><SetaVoltar color={CORES.cinza} /></TouchableOpacity>
        <Text style={estilos.tituloHeader}>Conversas</Text>
        <Bell color={CORES.navy} size={24} />
      </View>

      <View style={estilos.barraBusca}>
        <Search color="#AAA" size={18} />
        <TextInput
          placeholder="Buscar advogado ou caso..."
          style={estilos.inputBusca}
          value={busca}
          onChangeText={setBusca}
          placeholderTextColor="#AAA"
        />
        {busca.length > 0 && (
          <TouchableOpacity onPress={() => setBusca('')}>
            <X color="#AAA" size={16} />
          </TouchableOpacity>
        )}
      </View>

      <View style={estilos.filtros}>
        <TouchableOpacity
          style={filtro === 'todos' ? estilos.filtroAtivo : estilos.filtroInativo}
          onPress={() => setFiltro('todos')}
        >
          <Text style={filtro === 'todos' ? estilos.txtBranco : estilos.txtCinza}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={filtro === 'nao_lidas' ? estilos.filtroAtivo : estilos.filtroInativo}
          onPress={() => setFiltro('nao_lidas')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={filtro === 'nao_lidas' ? estilos.txtBranco : estilos.txtCinza}>Não lidas</Text>
            {totalNaoLidas > 0 && (
              <View style={[estilos.badge, { width: 18, height: 18, backgroundColor: filtro === 'nao_lidas' ? CORES.petroleoClaro : CORES.petroleo }]}>
                <Text style={[estilos.txtBadge, { fontSize: 9 }]}>{totalNaoLidas}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled">
        {conversasFiltradas.length === 0 ? (
          <View style={{ alignItems: 'center', paddingTop: 60 }}>
            <Search color="#CCC" size={40} />
            <Text style={{ color: '#AAA', fontSize: 15, marginTop: 12 }}>
              {busca ? 'Nenhum resultado encontrado' : 'Nenhuma conversa não lida'}
            </Text>
            {busca.length > 0 && (
              <TouchableOpacity onPress={() => setBusca('')} style={{ marginTop: 12 }}>
                <Text style={{ color: CORES.petroleo, fontWeight: 'bold' }}>Limpar busca</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          conversasFiltradas.map((adv) => {
            const foiLido = lidos.includes(adv.id);
            const preview = MENSAGENS_PREVIEW[adv.id];
            return (
              <TouchableOpacity
                key={adv.id}
                style={[estilos.cardConversa, !foiLido && { borderLeftWidth: 4, borderLeftColor: CORES.petroleo }]}
                onPress={() => { marcarLido(adv.id); navigation.navigate('Chat', { advogadoId: adv.id }); }}
              >
                <View>
                  <View style={[estilos.avatarCircular, { backgroundColor: adv.corAvatar }]}>
                    <Text style={estilos.textoIniciais}>{adv.iniciais}</Text>
                  </View>
                  {adv.id === '1' && (
                    <View style={estilos.indicadorOnline} />
                  )}
                </View>
                <View style={estilos.infoConversa}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={[estilos.nomeAdvogado, !foiLido && { color: CORES.navy }]}>{adv.nome}</Text>
                    <Text style={[estilos.dataTexto, !foiLido && { color: CORES.petroleo, fontWeight: 'bold' }]}>
                      {preview?.hora}
                    </Text>
                  </View>
                  <Text style={estilos.subConversa} numberOfLines={1}>📁 {preview?.caso}</Text>
                  <Text style={[estilos.previewMsg, !foiLido && { fontWeight: '600', color: '#333' }]} numberOfLines={1}>
                    {preview?.texto}
                  </Text>
                </View>
                {!foiLido && (
                  <View style={[estilos.badge, { marginLeft: 8 }]}>
                    <Text style={estilos.txtBadge}>2</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const TelaChat = ({ navigation, route }) => {
  const advogadoId = route?.params?.advogadoId || '1';
  const adv = ADVOGADOS.find(a => a.id === advogadoId) || ADVOGADOS[0];

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.cabecalhoChat}>
        <TouchableOpacity onPress={() => navigation.goBack()}><SetaVoltar color={CORES.cinza} /></TouchableOpacity>
        <View style={[estilos.avatarCircularPequeno, { backgroundColor: adv.corAvatar, marginLeft: 10 }]}>
          <Text style={estilos.textoIniciais}>{adv.iniciais}</Text>
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={estilos.nomeChat}>{adv.nome}</Text>
          <Text style={estilos.statusChat}>Online</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('PerfilAdvogado', { advogadoId: adv.id })}>
          <Text style={{ color: CORES.petroleo, fontWeight: 'bold', fontSize: 12 }}>Ver perfil</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={estilos.paddingPadrao}>
        <View style={estilos.dataChat}><Text style={estilos.txtCinzaPequeno}>Hoje</Text></View>
        <View style={estilos.balaoEsquerda}>
          <Text style={estilos.txtPreto}>Olá João! Sou especialista em {adv.especialidades[0].toLowerCase()}. Vi sua análise de IA e gostaria de ajudar.</Text>
          <Text style={estilos.hora}>09:41</Text>
        </View>
        <View style={estilos.balaoDireita}>
          <Text style={estilos.txtBranco}>Olá {adv.nome.split(' ')[1]}, obrigado! O que precisamos fazer agora?</Text>
          <Text style={estilos.horaBranca}>09:43</Text>
        </View>
        <View style={estilos.cardDocumento}>
          <View style={estilos.linhaDoc}>
            <FileText color={CORES.petroleo} size={24} />
            <View style={{ marginLeft: 10 }}>
              <Text style={estilos.labelDoc}>Documento solicitado</Text>
              <Text style={estilos.nomeDoc}>Contrato de trabalho</Text>
            </View>
          </View>
          <TouchableOpacity style={estilos.btnEnviarDoc}><Text style={estilos.txtBranco}>📄 Enviar documento</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const LIMITE_COMENTARIO = 500;

const ROTULOS_ESTRELA = ['', 'Ruim', 'Regular', 'Bom', 'Ótimo', 'Excelente'];

const TelaAvaliar = ({ navigation, route }) => {
  const advogadoId = route?.params?.advogadoId || '1';
  const adv = ADVOGADOS.find(a => a.id === advogadoId) || ADVOGADOS[0];

  const [nota, setNota] = useState(0);
  const [notaHover, setNotaHover] = useState(0);
  const [comentario, setComentario] = useState('');
  const [anonimo, setAnonimo] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erroNota, setErroNota] = useState(false);

  const estrelasExibidas = notaHover || nota;
  const charRestantes = LIMITE_COMENTARIO - comentario.length;
  const corContador = charRestantes <= 50 ? '#E53935' : charRestantes <= 100 ? '#F57F17' : CORES.cinza;

  const handleEnviar = () => {
    if (nota === 0) {
      setErroNota(true);
      return;
    }
    setErroNota(false);
    setEnviando(true);

    // Simula chamada ao backend
    setTimeout(() => {
      setEnviando(false);
      navigation.navigate('Sucesso', {
        advogadoNome: adv.nome,
        nota,
        comentario: comentario.trim(),
        anonimo,
      });
    }, 1200);
  };

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.cabecalhoSimples}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SetaVoltar color={CORES.cinza} />
        </TouchableOpacity>
        <Text style={estilos.tituloHeader}>Avaliar advogado</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={estilos.paddingPadrao} keyboardShouldPersistTaps="handled">

        {/* Card do advogado */}
        <View style={estilos.cardAvaliacaoSimples}>
          <View style={[estilos.avatarCircular, { backgroundColor: adv.corAvatar }]}>
            <Text style={estilos.textoIniciais}>{adv.iniciais}</Text>
          </View>
          <View style={{ marginLeft: 15, flex: 1 }}>
            <Text style={estilos.nomeAdvogado}>{adv.nome}</Text>
            <Text style={estilos.areaAdvogado}>{adv.area}</Text>
            <Text style={estilos.textoPasta}>{adv.oab}</Text>
          </View>
        </View>

        {/* Estrelas */}
        <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 8 }}>
          <Text style={[estilos.txtNegritoCentro, erroNota && { color: '#E53935' }]}>
            {erroNota ? 'Selecione uma nota para continuar' : 'Como você avalia o atendimento?'}
          </Text>

          <View style={[estilos.linhaEstrelasGrande, { marginBottom: 6 }]}>
            {[1, 2, 3, 4, 5].map(i => (
              <TouchableOpacity
                key={i}
                onPress={() => { setNota(i); setErroNota(false); }}
                onPressIn={() => setNotaHover(i)}
                onPressOut={() => setNotaHover(0)}
                activeOpacity={0.7}
              >
                <Star
                  color={i <= estrelasExibidas ? '#FFB400' : '#DDDDDD'}
                  fill={i <= estrelasExibidas ? '#FFB400' : 'transparent'}
                  size={44}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Rótulo da nota */}
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: nota > 0 ? '#FFB400' : 'transparent', marginBottom: 10 }}>
            {ROTULOS_ESTRELA[nota] || ' '}
          </Text>
        </View>

        {/* Comentário */}
        <View style={estilos.linhaEspacada}>
          <Text style={{ fontWeight: 'bold', color: CORES.navy }}>Comentário <Text style={{ fontWeight: 'normal', color: CORES.cinza }}>(opcional)</Text></Text>
          <Text style={[estilos.dataTexto, { color: corContador }]}>{comentario.length}/{LIMITE_COMENTARIO}</Text>
        </View>
        <TextInput
          multiline
          maxLength={LIMITE_COMENTARIO}
          style={estilos.inputComentario}
          placeholder="Descreva sua experiência com este advogado..."
          placeholderTextColor="#AAA"
          value={comentario}
          onChangeText={setComentario}
          textAlignVertical="top"
        />

        {/* Aviso de limite próximo */}
        {charRestantes <= 50 && (
          <Text style={{ fontSize: 12, color: corContador, marginTop: 4 }}>
            {charRestantes === 0 ? 'Limite de caracteres atingido.' : `${charRestantes} caracteres restantes.`}
          </Text>
        )}

        {/* Switch anônimo */}
        <View style={[estilos.cardAnonimo, { marginTop: 20 }]}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', color: CORES.navy }}>Enviar anonimamente</Text>
            <Text style={estilos.dataTexto}>Seu nome não será exibido publicamente</Text>
          </View>
          <Switch
            value={anonimo}
            onValueChange={setAnonimo}
            trackColor={{ false: '#DDDDDD', true: CORES.petroleo }}
            thumbColor="#FFF"
          />
        </View>

        {/* Preview do nome */}
        <View style={{ marginTop: 10, marginBottom: 5, paddingHorizontal: 4 }}>
          <Text style={{ fontSize: 12, color: CORES.cinza }}>
            Sua avaliação aparecerá como:{' '}
            <Text style={{ fontWeight: 'bold', color: CORES.navy }}>
              {anonimo ? 'Usuário anônimo' : 'João Vitor'}
            </Text>
          </Text>
        </View>

        {/* Botão enviar */}
        <TouchableOpacity
          style={[estilos.btnChatLargo, { marginTop: 20, opacity: enviando ? 0.7 : 1 }]}
          onPress={handleEnviar}
          disabled={enviando}
        >
          {enviando
            ? <Text style={estilos.txtBranco}>Enviando...</Text>
            : <Text style={estilos.txtBranco}>Enviar avaliação</Text>
          }
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const TelaSucesso = ({ navigation, route }) => {
  const { advogadoNome, nota, comentario, anonimo } = route?.params || {};

  return (
    <SafeAreaView style={[estilos.container, { justifyContent: 'center' }]}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 30 }}>
        <View style={estilos.circuloCheck}>
          <CheckCircle2 color="#33A3F2" size={80} />
        </View>

        <Text style={[estilos.olaTexto, { textAlign: 'center' }]}>Avaliação enviada!</Text>
        <Text style={[estilos.subOla, { textAlign: 'center' }]}>
          Obrigado pelo seu feedback. Ele é muito importante para nossa comunidade.
        </Text>

        {/* Resumo da avaliação */}
        {nota > 0 && (
          <View style={estilos.cardResumoAvaliacao}>
            <Text style={{ fontSize: 11, color: '#999', fontWeight: 'bold', marginBottom: 6 }}>SUA AVALIAÇÃO</Text>

            {advogadoNome && (
              <Text style={{ fontWeight: 'bold', color: CORES.navy, fontSize: 15, marginBottom: 10 }}>
                {advogadoNome}
              </Text>
            )}

            {/* Estrelas */}
            <View style={{ flexDirection: 'row', gap: 4, marginBottom: 8 }}>
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} color={CORES.estrela} fill={i <= nota ? CORES.estrela : 'transparent'} size={22} />
              ))}
              <Text style={{ marginLeft: 8, color: CORES.navy, fontWeight: 'bold', fontSize: 14 }}>
                {ROTULOS_ESTRELA[nota]}
              </Text>
            </View>

            {/* Comentário (se houver) */}
            {comentario ? (
              <View style={{ backgroundColor: '#F8F9FB', borderRadius: 8, padding: 12, marginTop: 4 }}>
                <Text style={{ fontSize: 13, color: CORES.cinza, lineHeight: 19, fontStyle: 'italic' }}>
                  "{comentario}"
                </Text>
              </View>
            ) : null}

            {/* Enviado como */}
            <Text style={{ fontSize: 12, color: '#999', marginTop: 10 }}>
              Enviado como:{' '}
              <Text style={{ fontWeight: 'bold', color: CORES.navy }}>
                {anonimo ? 'Usuário anônimo' : 'João Vitor'}
              </Text>
            </Text>
          </View>
        )}

        <TouchableOpacity style={[estilos.btnChatLargo, { width: '100%' }]} onPress={() => navigation.navigate('Principal')}>
          <Home color="#FFF" size={20} />
          <Text style={[estilos.txtBranco, { marginLeft: 10 }]}>Voltar ao início</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[estilos.btnBrancoLargo, { width: '100%' }]} onPress={() => navigation.navigate('Principal', { screen: 'ConversasTab' })}>
          <MessageSquare color={CORES.cinza} size={20} />
          <Text style={[estilos.txtCinza, { marginLeft: 10 }]}>Ver minhas conversas</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// Tela de perfil do usuário (aba Perfil)
const TelaMeusCasos = ({ navigation }) => {
  const corProbabilidade = (prob) => {
    if (prob === 'Alta') return { bg: '#E8F5E9', txt: '#2E7D32' };
    if (prob === 'Média') return { bg: '#FFF8E1', txt: '#F57F17' };
    return { bg: '#FFEBEE', txt: '#C62828' };
  };

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.cabecalhoSimples}>
        <TouchableOpacity onPress={() => navigation.goBack()}><SetaVoltar color={CORES.cinza} /></TouchableOpacity>
        <Text style={estilos.tituloHeader}>Meus Casos</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={estilos.paddingPadrao} showsVerticalScrollIndicator={false}>
        <Text style={estilos.subOla}>{CASOS_USUARIO.length} casos ativos no momento</Text>

        {CASOS_USUARIO.map((caso) => {
          const advs = ADVOGADOS.filter(a => caso.advogadosInteressados.includes(a.id));
          const cores = corProbabilidade(caso.probabilidade);
          return (
            <View key={caso.id} style={estilos.cardCasoCompleto}>

              {/* Cabeçalho */}
              <View style={estilos.linhaEspacada}>
                <View style={estilos.tagArea}><Text style={estilos.textoTagArea}>{caso.area}</Text></View>
                <View style={estilos.tagStatus}><Text style={estilos.textoTagStatus}>{caso.status}</Text></View>
              </View>

              <Text style={estilos.tituloCasoCompleto}>{caso.titulo}</Text>
              <Text style={estilos.dataTexto}>Protocolado em {caso.protocolo}</Text>

              {/* Descrição */}
              <Text style={estilos.descricaoCaso}>{caso.descricao}</Text>

              {/* Probabilidade de êxito */}
              <View style={[estilos.tagProbabilidade, { backgroundColor: cores.bg }]}>
                <Sparkles color={cores.txt} size={13} />
                <Text style={[estilos.txtProbabilidade, { color: cores.txt }]}>
                  Probabilidade de êxito: {caso.probabilidade}
                </Text>
              </View>

              {/* Documentos */}
              <Text style={[estilos.labelSessao, { marginTop: 15, marginBottom: 8 }]}>DOCUMENTOS</Text>
              {caso.documentos.map((doc, idx) => (
                <View key={idx} style={estilos.linhaDocumento}>
                  <FileText color={CORES.petroleo} size={14} />
                  <Text style={estilos.textoDocumento}>{doc}</Text>
                </View>
              ))}

              {/* Advogados interessados */}
              <Text style={[estilos.labelSessao, { marginTop: 15, marginBottom: 8 }]}>ADVOGADOS INTERESSADOS</Text>
              {advs.map((adv) => (
                <TouchableOpacity
                  key={adv.id}
                  style={estilos.miniCardAdvogado}
                  onPress={() => navigation.navigate('PerfilAdvogado', { advogadoId: adv.id })}
                >
                  <View style={[estilos.avatarCircularPequeno, { backgroundColor: adv.corAvatar }]}>
                    <Text style={{ color: '#FFF', fontSize: 11, fontWeight: 'bold' }}>{adv.iniciais}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ fontWeight: 'bold', color: CORES.navy, fontSize: 14 }}>{adv.nome}</Text>
                    <Text style={estilos.areaAdvogado}>{adv.area}</Text>
                  </View>
                  <TouchableOpacity
                    style={estilos.btnMiniChat}
                    onPress={() => navigation.navigate('Chat', { advogadoId: adv.id })}
                  >
                    <MessageSquare color="#FFF" size={14} />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}

              {/* Botão detalhe */}
              <TouchableOpacity
                style={[estilos.btnChatLargo, { marginTop: 15 }]}
                onPress={() => navigation.navigate('Detalhe')}
              >
                <Text style={estilos.txtBranco}>Ver detalhes do caso</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const TelaPerfilUsuario = ({ navigation }) => {
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const [emailAtivo, setEmailAtivo] = useState(false);

  const totalAdvogadosContatados = ADVOGADOS.length;
  const totalCasos = CASOS_USUARIO.length;
  const totalMensagensNaoLidas = 3;

  return (
    <SafeAreaView style={estilos.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Banner de cabeçalho */}
        <View style={estilos.bannerPerfil}>
          <View style={estilos.avatarPerfilGrande}>
            <Text style={estilos.textoIniciaisGigante}>JV</Text>
          </View>
          <Text style={[estilos.nomeDestaque, { color: '#FFF' }]}>João Vitor</Text>
          <Text style={{ color: CORES.petroleoClaro, fontSize: 13, marginTop: 2 }}>joao.vitor@email.com</Text>
          <View style={estilos.tagClienteDesde}>
            <Text style={{ fontSize: 11, color: CORES.petroleoClaro, fontWeight: 'bold' }}>✦ Cliente desde Out. 2024</Text>
          </View>
        </View>

        <View style={estilos.paddingPadrao}>

          {/* Cards de stats */}
          <View style={estilos.linhaStats}>
            <View style={estilos.cardStat}>
              <Text style={estilos.numStat}>{totalCasos}</Text>
              <Text style={estilos.labelStat}>Casos ativos</Text>
            </View>
            <View style={[estilos.cardStat, { borderLeftWidth: 1, borderRightWidth: 1, borderColor: CORES.cinzaBorda }]}>
              <Text style={estilos.numStat}>{totalAdvogadosContatados}</Text>
              <Text style={estilos.labelStat}>Advogados</Text>
            </View>
            <View style={estilos.cardStat}>
              <Text style={estilos.numStat}>{totalMensagensNaoLidas}</Text>
              <Text style={estilos.labelStat}>Não lidas</Text>
            </View>
          </View>

          {/* Meus Casos */}
          <Text style={[estilos.labelSessao, { marginTop: 24 }]}>ACESSO RÁPIDO</Text>

          <TouchableOpacity style={estilos.itemMenuPerfil} onPress={() => navigation.navigate('MeusCasos')}>
            <View style={[estilos.iconeMenu, { backgroundColor: '#E8F4FF' }]}><Briefcase color={CORES.azulOk} size={20} /></View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={estilos.tituloItemMenu}>Meus casos</Text>
              <Text style={estilos.subItemMenu}>{totalCasos} casos ativos</Text>
            </View>
            <ChevronRight color="#CCC" size={18} />
          </TouchableOpacity>

          <TouchableOpacity style={estilos.itemMenuPerfil} onPress={() => navigation.navigate('ConversasTab')}>
            <View style={[estilos.iconeMenu, { backgroundColor: '#E8F9F5' }]}><MessageSquare color={CORES.petroleo} size={20} /></View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={estilos.tituloItemMenu}>Minhas conversas</Text>
              <Text style={estilos.subItemMenu}>{totalMensagensNaoLidas} mensagens não lidas</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={estilos.badge}><Text style={estilos.txtBadge}>{totalMensagensNaoLidas}</Text></View>
              <ChevronRight color="#CCC" size={18} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.itemMenuPerfil}>
            <View style={[estilos.iconeMenu, { backgroundColor: '#FFF4E0' }]}><FileText color="#F57F17" size={20} /></View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={estilos.tituloItemMenu}>Meus documentos</Text>
              <Text style={estilos.subItemMenu}>5 arquivos enviados</Text>
            </View>
            <ChevronRight color="#CCC" size={18} />
          </TouchableOpacity>

          <TouchableOpacity style={estilos.itemMenuPerfil}>
            <View style={[estilos.iconeMenu, { backgroundColor: '#FFF0F5' }]}><Star color="#D4537E" size={20} /></View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={estilos.tituloItemMenu}>Minhas avaliações</Text>
              <Text style={estilos.subItemMenu}>2 avaliações enviadas</Text>
            </View>
            <ChevronRight color="#CCC" size={18} />
          </TouchableOpacity>

          {/* Advogados recentes */}
          <Text style={[estilos.labelSessao, { marginTop: 28 }]}>ADVOGADOS RECENTES</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20, paddingHorizontal: 20 }}>
            {ADVOGADOS.map((adv) => (
              <TouchableOpacity
                key={adv.id}
                style={estilos.cardAdvRecente}
                onPress={() => navigation.navigate('PerfilAdvogado', { advogadoId: adv.id })}
              >
                <View style={[estilos.avatarCircular, { backgroundColor: adv.corAvatar, width: 44, height: 44, borderRadius: 22 }]}>
                  <Text style={estilos.textoIniciais}>{adv.iniciais}</Text>
                </View>
                <Text style={estilos.nomeAdvRecente} numberOfLines={1}>{adv.nome.replace('Dr. ', '').replace('Dra. ', '')}</Text>
                <Text style={estilos.areaAdvRecente} numberOfLines={1}>{adv.especialidades[0].split(' ').slice(-1)[0]}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                  <Star color={CORES.estrela} fill={CORES.estrela} size={10} />
                  <Text style={{ fontSize: 11, color: CORES.cinza, marginLeft: 3 }}>{adv.nota}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Notificações */}
          <Text style={[estilos.labelSessao, { marginTop: 28 }]}>NOTIFICAÇÕES</Text>

          <View style={estilos.itemMenuPerfil}>
            <View style={[estilos.iconeMenu, { backgroundColor: '#F0F2F5' }]}><Bell color={CORES.cinza} size={20} /></View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={estilos.tituloItemMenu}>Notificações push</Text>
              <Text style={estilos.subItemMenu}>Avisos de novas mensagens</Text>
            </View>
            <Switch
              value={notificacoesAtivas}
              onValueChange={setNotificacoesAtivas}
              trackColor={{ false: '#DDD', true: CORES.petroleo }}
              thumbColor="#FFF"
            />
          </View>

          <View style={[estilos.itemMenuPerfil, { borderBottomWidth: 0 }]}>
            <View style={[estilos.iconeMenu, { backgroundColor: '#F0F2F5' }]}><User color={CORES.cinza} size={20} /></View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={estilos.tituloItemMenu}>Resumo por e-mail</Text>
              <Text style={estilos.subItemMenu}>Receba atualizações semanais</Text>
            </View>
            <Switch
              value={emailAtivo}
              onValueChange={setEmailAtivo}
              trackColor={{ false: '#DDD', true: CORES.petroleo }}
              thumbColor="#FFF"
            />
          </View>

          {/* Sair */}
          <TouchableOpacity style={[estilos.btnBrancoLargo, { marginTop: 28, borderColor: '#FFCDD2' }]}>
            <Text style={{ color: '#E53935', fontWeight: 'bold' }}>Sair da conta</Text>
          </TouchableOpacity>

          <View style={{ height: 30 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- NAVEGAÇÃO ---

const AbasPrincipais = ({ lidos, marcarLido }) => (
  <Abas.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: CORES.petroleo }}>
    <Abas.Screen name="Início" component={TelaInicio} options={{ tabBarIcon: ({ color }) => <Home color={color} /> }} />
    <Abas.Screen name="ConversasTab" options={{ tabBarIcon: ({ color }) => <MessageSquare color={color} />, title: 'Mensagens' }}>
      {(props) => <TelaConversas {...props} lidos={lidos} marcarLido={marcarLido} />}
    </Abas.Screen>
    <Abas.Screen name="Perfil" component={TelaPerfilUsuario} options={{ tabBarIcon: ({ color }) => <User color={color} /> }} />
  </Abas.Navigator>
);

export default function App() {
  const [lidos, setLidos] = useState([]);
  const marcarLido = (id) => { if (!lidos.includes(id)) setLidos([...lidos, id]); };

  return (
    <NavigationContainer>
      <Pilha.Navigator screenOptions={{ headerShown: false }}>
        <Pilha.Screen name="Principal">
          {(props) => <AbasPrincipais {...props} lidos={lidos} marcarLido={marcarLido} />}
        </Pilha.Screen>
        <Pilha.Screen name="Detalhe" component={TelaDetalhe} />
        <Pilha.Screen name="PerfilAdvogado" component={TelaPerfilAdvogado} />
        <Pilha.Screen name="Conversas" component={TelaConversas} />
        <Pilha.Screen name="Chat" component={TelaChat} />
        <Pilha.Screen name="Avaliar" component={TelaAvaliar} />
        <Pilha.Screen name="Sucesso" component={TelaSucesso} />
        <Pilha.Screen name="MeusCasos" component={TelaMeusCasos} />
      </Pilha.Navigator>
    </NavigationContainer>
  );
}

// --- ESTILOS ---

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: CORES.branco },
  paddingPadrao: { padding: 20 },
  cabecalhoHome: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  logoTexto: { fontSize: 22, fontWeight: 'bold', color: CORES.navy },
  olaTexto: { fontSize: 28, fontWeight: 'bold', color: CORES.navy },
  subOla: { fontSize: 14, color: CORES.cinza, marginBottom: 20 },
  linhaEspacada: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  tituloSessao: { fontSize: 18, fontWeight: 'bold', color: CORES.navy },
  botaoNovoCaso: { backgroundColor: CORES.petroleo, paddingVertical: 8, paddingHorizontal: 15, borderRadius: 15 },
  textoBotaoNovo: { color: '#FFF', fontWeight: 'bold' },
  cardCarrossel: { backgroundColor: '#FFF', width: width * 0.75, marginRight: 15, padding: 20, borderRadius: 15, borderWidth: 1, borderColor: CORES.cinzaBorda, borderLeftWidth: 5, borderLeftColor: CORES.petroleo },
  tagArea: { backgroundColor: '#F0F9F9', padding: 4, borderRadius: 4 },
  tagStatus: { backgroundColor: '#E8F5E9', padding: 4, borderRadius: 4 },
  textoTagArea: { fontSize: 10, color: CORES.petroleo, fontWeight: 'bold' },
  textoTagStatus: { fontSize: 10, color: '#2E7D32', fontWeight: 'bold' },
  tituloCardCaso: { fontSize: 17, fontWeight: 'bold', color: CORES.navy, marginVertical: 15 },
  rodapeCardCaso: { flexDirection: 'row', alignItems: 'center' },
  grupoAvatares: { flexDirection: 'row', alignItems: 'center' },
  miniAvatar: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  textoMiniAvatar: { fontSize: 8, color: '#FFF', fontWeight: 'bold' },
  textoInteressados: { fontSize: 10, color: CORES.cinza, marginLeft: 10 },
  itemAdvogado: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderColor: '#F5F5F5' },
  avatarCircular: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  avatarCircularGigante: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center' },
  avatarCircularPequeno: { width: 40, height: 40, borderRadius: 20, backgroundColor: CORES.navy, justifyContent: 'center', alignItems: 'center' },
  textoIniciais: { color: '#FFF', fontWeight: 'bold' },
  textoIniciaisGigante: { color: '#FFF', fontWeight: 'bold', fontSize: 32 },
  infoAdvogado: { flex: 1, marginLeft: 15 },
  nomeAdvogado: { fontWeight: 'bold', color: CORES.navy, fontSize: 16 },
  nomeDestaque: { fontSize: 24, fontWeight: 'bold', color: CORES.navy, marginTop: 10 },
  subtituloCinza: { color: '#999', fontSize: 16 },
  areaAdvogado: { fontSize: 12, color: CORES.petroleo, fontWeight: 'bold' },
  pastaCaso: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  textoPasta: { fontSize: 12, color: CORES.cinza, marginLeft: 5 },
  cabecalhoSimples: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  tituloHeader: { fontSize: 18, fontWeight: 'bold', color: CORES.navy },
  tagStatusVerde: { backgroundColor: '#E8F5E9', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 4 },
  dataTexto: { fontSize: 12, color: CORES.cinza },
  cardIA: { backgroundColor: CORES.navy, padding: 20, borderRadius: 15, marginVertical: 20 },
  linhaIA: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  tituloIA: { color: '#FFF', fontWeight: 'bold', marginLeft: 10 },
  textoIA: { color: '#FFF', fontSize: 13, lineHeight: 18 },
  linkIA: { color: CORES.petroleoClaro, fontWeight: 'bold', marginTop: 15 },
  numeroDestaque: { fontSize: 24, fontWeight: 'bold', color: CORES.petroleo },
  cardAdvogadoInteresse: { backgroundColor: '#FFF', padding: 15, borderRadius: 15, borderWidth: 1, borderColor: CORES.cinzaBorda, borderLeftWidth: 5, borderLeftColor: CORES.petroleo, marginBottom: 15 },
  cabecalhoInteresse: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  balaoResumo: { backgroundColor: '#F8F9FB', padding: 10, borderRadius: 8, marginBottom: 15 },
  textoResumo: { fontSize: 12, color: CORES.cinza },
  grupoBotoes: { flexDirection: 'row', gap: 10 },
  btnChat: { flex: 1, backgroundColor: CORES.navy, padding: 12, borderRadius: 8, alignItems: 'center' },
  btnChatLargo: { backgroundColor: CORES.navy, flexDirection: 'row', padding: 15, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  btnBrancoLargo: { backgroundColor: '#FFF', flexDirection: 'row', padding: 15, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#EEE', marginBottom: 10 },
  btnPerfil: { backgroundColor: '#E0F2F1', padding: 12, borderRadius: 8, paddingHorizontal: 20 },
  txtPetroleo: { color: CORES.petroleo, fontWeight: 'bold' },
  cardImpacto: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 15, borderWidth: 1, borderColor: '#EEE', borderLeftWidth: 5, borderLeftColor: CORES.petroleo, marginVertical: 20 },
  iconeImpacto: { backgroundColor: '#E0F2F1', padding: 10, borderRadius: 10, marginRight: 15 },
  labelSessao: { fontSize: 10, color: '#999', fontWeight: 'bold', marginBottom: 10 },
  tagCinza: { backgroundColor: '#F0F2F5', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  txtTagCinza: { color: CORES.cinza, fontWeight: 'bold', fontSize: 12 },
  boxSobre: { backgroundColor: '#F0F2F5', padding: 20, borderRadius: 15, marginBottom: 20 },
  cardAvaliacao: { flexDirection: 'row', backgroundColor: '#FFF', padding: 15, borderRadius: 15, borderWidth: 1, borderColor: '#EEE', borderLeftWidth: 5, borderLeftColor: CORES.petroleo },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalCorpo: { backgroundColor: '#FFF', width: '85%', borderRadius: 20, padding: 25 },
  cabecalhoModal: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  tituloModal: { fontSize: 18, fontWeight: 'bold', marginLeft: 10, color: CORES.navy },
  textoModalCompleto: { fontSize: 13, color: '#333', lineHeight: 20, textAlign: 'justify' },
  avisoModal: { fontSize: 12, fontWeight: 'bold', color: CORES.petroleo, textAlign: 'center', marginVertical: 20 },
  btnOk: { backgroundColor: CORES.azulOk, padding: 15, borderRadius: 10, alignItems: 'center' },
  barraBusca: { flexDirection: 'row', backgroundColor: '#F0F2F5', margin: 20, padding: 12, borderRadius: 10, alignItems: 'center' },
  inputBusca: { flex: 1, marginLeft: 10 },
  filtros: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginBottom: 15 },
  filtroAtivo: { backgroundColor: CORES.navy, paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  filtroInativo: { backgroundColor: '#F0F2F5', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  cardConversa: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderColor: '#F5F5F5' },
  infoConversa: { flex: 1, marginLeft: 15 },
  subConversa: { fontSize: 12, color: CORES.petroleo, fontWeight: 'bold' },
  previewMsg: { fontSize: 12, color: CORES.cinza, marginTop: 4 },
  badge: { backgroundColor: CORES.petroleo, width: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center' },
  txtBadge: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  cabecalhoChat: { flexDirection: 'row', padding: 20, alignItems: 'center', borderBottomWidth: 1, borderColor: '#EEE' },
  nomeChat: { fontWeight: 'bold', color: CORES.navy },
  statusChat: { fontSize: 12, color: '#4CAF50' },
  dataChat: { alignItems: 'center', marginVertical: 15 },
  balaoEsquerda: { backgroundColor: '#F0F2F5', padding: 15, borderRadius: 15, borderTopLeftRadius: 0, alignSelf: 'flex-start', maxWidth: '80%', marginBottom: 15, marginTop: 15 },
  balaoDireita: { backgroundColor: CORES.petroleo, padding: 15, borderRadius: 15, borderTopRightRadius: 0, alignSelf: 'flex-end', maxWidth: '80%', marginBottom: 15 },
  hora: { fontSize: 10, color: '#AAA', textAlign: 'right', marginTop: 5 },
  horaBranca: { fontSize: 10, color: 'rgba(255,255,255,0.6)', textAlign: 'right', marginTop: 5 },
  cardDocumento: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EEE', borderRadius: 12, padding: 15, alignSelf: 'flex-start', width: '80%', marginBottom: 20, borderLeftWidth: 5, borderLeftColor: CORES.petroleo },
  linhaDoc: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  labelDoc: { fontSize: 10, color: CORES.cinza },
  nomeDoc: { fontWeight: 'bold', color: CORES.navy },
  btnEnviarDoc: { backgroundColor: CORES.navy, padding: 12, borderRadius: 8, alignItems: 'center' },
  txtBranco: { color: '#FFF', fontWeight: 'bold' },
  txtCinza: { color: CORES.cinza, fontWeight: 'bold' },
  txtCinzaPequeno: { color: CORES.cinza, fontSize: 12, backgroundColor: '#F0F2F5', paddingHorizontal: 10, paddingVertical: 2, borderRadius: 10 },
  txtPreto: { color: '#000' },
  cardAvaliacaoSimples: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#FFF', borderRadius: 15, borderWidth: 1, borderColor: '#EEE', borderLeftWidth: 5, borderLeftColor: CORES.petroleo },
  txtNegritoCentro: { textAlign: 'center', fontWeight: 'bold', color: CORES.navy, fontSize: 16 },
  linhaEstrelasGrande: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginVertical: 20 },
  inputComentario: { backgroundColor: '#F0F2F5', borderRadius: 12, padding: 15, height: 120, textAlignVertical: 'top', marginTop: 10 },
  cardAnonimo: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#EEE', marginTop: 20 },
  circuloCheck: { width: 150, height: 150, borderRadius: 75, backgroundColor: '#E1F5FE', justifyContent: 'center', alignItems: 'center', marginBottom: 30, elevation: 5 },
  cardCasoCompleto: { backgroundColor: '#FFF', borderRadius: 16, borderWidth: 1, borderColor: CORES.cinzaBorda, borderLeftWidth: 5, borderLeftColor: CORES.petroleo, padding: 18, marginBottom: 20 },
  tituloCasoCompleto: { fontSize: 18, fontWeight: 'bold', color: CORES.navy, marginVertical: 8 },
  descricaoCaso: { fontSize: 13, color: CORES.cinza, lineHeight: 20, marginVertical: 10 },
  tagProbabilidade: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, alignSelf: 'flex-start' },
  txtProbabilidade: { fontSize: 12, fontWeight: 'bold' },
  linhaDocumento: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 5, borderBottomWidth: 1, borderColor: '#F5F5F5' },
  textoDocumento: { fontSize: 13, color: CORES.navy },
  miniCardAdvogado: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#F5F5F5' },
  btnMiniChat: { backgroundColor: CORES.petroleo, padding: 8, borderRadius: 8 },
  cardResumoAvaliacao: { width: '100%', backgroundColor: '#FFF', borderRadius: 16, borderWidth: 1, borderColor: CORES.cinzaBorda, borderLeftWidth: 5, borderLeftColor: '#FFB400', padding: 18, marginBottom: 24 },

  // Perfil do usuário
  bannerPerfil: { backgroundColor: CORES.navy, paddingTop: 40, paddingBottom: 30, alignItems: 'center' },
  avatarPerfilGrande: { width: 88, height: 88, borderRadius: 44, backgroundColor: CORES.petroleo, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: CORES.petroleoClaro, marginBottom: 12 },
  tagClienteDesde: { marginTop: 10, backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  linhaStats: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 16, borderWidth: 1, borderColor: CORES.cinzaBorda, overflow: 'hidden', marginTop: 20 },
  cardStat: { flex: 1, alignItems: 'center', paddingVertical: 18 },
  numStat: { fontSize: 24, fontWeight: 'bold', color: CORES.navy },
  labelStat: { fontSize: 11, color: CORES.cinza, marginTop: 2 },
  itemMenuPerfil: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderColor: '#F5F5F5' },
  iconeMenu: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  tituloItemMenu: { fontSize: 15, fontWeight: 'bold', color: CORES.navy },
  subItemMenu: { fontSize: 12, color: CORES.cinza, marginTop: 1 },
  cardAdvRecente: { alignItems: 'center', backgroundColor: '#FFF', borderRadius: 14, borderWidth: 1, borderColor: CORES.cinzaBorda, padding: 14, marginRight: 12, width: 100 },
  nomeAdvRecente: { fontSize: 12, fontWeight: 'bold', color: CORES.navy, marginTop: 8, textAlign: 'center' },
  areaAdvRecente: { fontSize: 10, color: CORES.petroleo, fontWeight: 'bold', textAlign: 'center', marginTop: 2 },

  // Conversas
  indicadorOnline: { width: 11, height: 11, borderRadius: 6, backgroundColor: '#4CAF50', borderWidth: 2, borderColor: '#FFF', position: 'absolute', bottom: 0, right: 0 },
});

registerRootComponent(App);