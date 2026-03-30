import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, FlatList, Image, StatusBar, Modal, Dimensions, Switch } from 'react-native';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, MessageSquare, User, Bell, Search, Briefcase, ChevronRight, CornerDownLeft, Paperclip, SendHorizontal, X, FileText, Sparkles, Star, Users, Folder, CheckCircle2 } from 'lucide-react-native';

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
        <View style={[estilos.miniAvatar, {backgroundColor: CORES.navy}]}><Text style={estilos.textoMiniAvatar}>CM</Text></View>
        <View style={[estilos.miniAvatar, {backgroundColor: CORES.petroleo, marginLeft: -8}]}><Text style={estilos.textoMiniAvatar}>A</Text></View>
        <View style={[estilos.miniAvatar, {backgroundColor: '#DDD', marginLeft: -8}]}><Text style={[estilos.textoMiniAvatar, {color: '#333'}]}>+1</Text></View>
      </View>
      <Text style={estilos.textoInteressados}>3 advogados entraram em contato</Text>
    </View>
  </TouchableOpacity>
);

// --- TELAS ---

const TelaInicio = ({ navigation }) => {
  const casos = [
    { id: '1', titulo: 'Rescisão trabalhista indevida', area: 'DIREITO TRABALHISTA', status: 'ATIVO' },
    { id: '2', titulo: 'Rescisão trabalhista indevida', area: 'DIREITO TRABALHISTA', status: 'ATIVO' },
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

          {[1, 2].map((i) => (
            <TouchableOpacity key={i} style={estilos.itemAdvogado} onPress={() => navigation.navigate('PerfilAdvogado')}>
              <View style={estilos.avatarCircular}><Text style={estilos.textoIniciais}>CM</Text></View>
              <View style={estilos.infoAdvogado}>
                <Text style={estilos.nomeAdvogado}>Dr. Carlos Mendes</Text>
                <Text style={estilos.areaAdvogado}>DIREITO TRABALHISTA</Text>
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
        <TouchableOpacity onPress={() => navigation.goBack()}><CornerDownLeft color={CORES.cinza} /></TouchableOpacity>
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
          <Text style={estilos.numeroDestaque}>3</Text>
        </View>

        <View style={estilos.cardAdvogadoInteresse}>
          <View style={estilos.cabecalhoInteresse}>
            <View style={estilos.avatarCircular}><Text style={estilos.textoIniciais}>CM</Text></View>
            <View>
              <Text style={estilos.nomeAdvogado}>Dr. Carlos Mendes</Text>
              <Text style={estilos.areaAdvogado}>DIREITO TRABALHISTA</Text>
            </View>
          </View>
          <View style={estilos.balaoResumo}>
            <Text style={estilos.textoResumo}>Sobre: Rescisão trabalhista indevida - Posso auxiliar na revisão das verbas rescisórias..."</Text>
          </View>
          <View style={estilos.grupoBotoes}>
            <TouchableOpacity style={estilos.btnChat} onPress={() => navigation.navigate('Chat')}><Text style={estilos.txtBranco}>Abrir Chat</Text></TouchableOpacity>
            <TouchableOpacity style={estilos.btnPerfil} onPress={() => navigation.navigate('PerfilAdvogado')}><Text style={estilos.txtPetroleo}>Perfil</Text></TouchableOpacity>
          </View>
        </View>
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

const TelaPerfilAdvogado = ({ navigation }) => (
  <SafeAreaView style={estilos.container}>
    <View style={estilos.cabecalhoSimples}>
      <TouchableOpacity onPress={() => navigation.goBack()}><CornerDownLeft color={CORES.cinza} /></TouchableOpacity>
      <Bell color={CORES.navy} size={24} />
    </View>
    <ScrollView showsVerticalScrollIndicator={false} style={estilos.paddingPadrao}>
      <View style={{alignItems: 'center', marginBottom: 20}}>
        <View style={estilos.avatarCircularGigante}><Text style={estilos.textoIniciaisGigante}>CM</Text></View>
        <Text style={estilos.nomeDestaque}>Dr. Carlos Mendes</Text>
        <Text style={estilos.subtituloCinza}>OAB/SP 123.456</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Star color={CORES.estrela} fill={CORES.estrela} size={18} />
          <Text style={{fontWeight: 'bold', marginLeft: 5, color: CORES.navy}}>4.8 <Text style={{fontWeight: 'normal', color: '#999'}}>(32 avaliações)</Text></Text>
        </View>
      </View>

      <View style={estilos.cardImpacto}>
        <View style={estilos.iconeImpacto}><Users color={CORES.navy} size={24} /></View>
        <View>
          <Text style={{fontSize: 10, color: '#999', fontWeight: 'bold'}}>IMPACTO</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: CORES.navy}}>47 clientes atendidos</Text>
        </View>
      </View>

      <Text style={estilos.labelSessao}>ESPECIALIDADES</Text>
      <View style={{flexDirection: 'row', gap: 10, marginBottom: 25}}>
        <View style={estilos.tagCinza}><Text style={estilos.txtTagCinza}>Direito trabalhista</Text></View>
        <View style={estilos.tagCinza}><Text style={estilos.txtTagCinza}>Direito Civil</Text></View>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
        <FileText color={CORES.navy} size={20} />
        <Text style={{fontWeight: 'bold', color: CORES.navy, marginLeft: 10}}>Sobre o Profissional</Text>
      </View>
      <View style={estilos.boxSobre}>
        <Text style={{fontSize: 13, color: CORES.navy, lineHeight: 20}}>Este caso apresenta alta probabilidade de exito com base em precedentes de demissão sem justa causa revertidos no TRT-2. Documentação inicial parece robusta...</Text>
      </View>

      <TouchableOpacity style={estilos.btnChatLargo} onPress={() => navigation.navigate('Chat')}>
        <MessageSquare color="#FFF" size={20} />
        <Text style={[estilos.txtBranco, {marginLeft: 10}]}>Iniciar conversa</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={estilos.btnBrancoLargo}>
        <Folder color={CORES.cinza} size={20} />
        <Text style={[estilos.txtCinza, {marginLeft: 10}]}>Ver documentos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={estilos.btnBrancoLargo} onPress={() => navigation.navigate('Avaliar')}>
        <Star color={CORES.cinza} size={20} />
        <Text style={[estilos.txtCinza, {marginLeft: 10}]}>Avaliar</Text>
      </TouchableOpacity>

      <View style={[estilos.linhaEspacada, {marginTop: 20}]}>
        <Text style={estilos.tituloSessao}>Ultimas Avaliações</Text>
        <Text style={{color: CORES.petroleo, fontWeight: 'bold'}}>Ver todas</Text>
      </View>

      <View style={estilos.cardAvaliacao}>
        <View style={[estilos.avatarCircularPequeno, {backgroundColor: CORES.navy}]}><Text style={{color: '#FFF', fontSize: 10}}>JJ</Text></View>
        <View style={{flex: 1, marginLeft: 10}}>
          <View style={estilos.linhaEspacada}>
            <Text style={{fontWeight: 'bold', color: CORES.navy}}>Juan Jesus</Text>
            <View style={{flexDirection: 'row'}}>{[1,2,3,4,5].map(s => <Star key={s} color={CORES.estrela} fill={CORES.estrela} size={10} />)}</View>
          </View>
          <Text style={{fontSize: 10, color: CORES.petroleo, fontWeight: 'bold'}}>Há 2 dias</Text>
          <Text style={{fontSize: 12, color: CORES.cinza, marginTop: 5}}>Sobre: Rescisão trabalhista indevida - Posso auxiliar na revisão das verbas rescisórias..."</Text>
        </View>
      </View>
      <View style={{height: 30}} />
    </ScrollView>
  </SafeAreaView>
);

const TelaConversas = ({ navigation }) => (
  <SafeAreaView style={estilos.container}>
    <View style={estilos.cabecalhoSimples}>
       <TouchableOpacity onPress={() => navigation.goBack()}><CornerDownLeft color={CORES.cinza} /></TouchableOpacity>
       <Text style={estilos.tituloHeader}>Conversas</Text>
       <Bell color={CORES.navy} size={24} />
    </View>
    <View style={estilos.barraBusca}>
      <Search color="#AAA" size={18} />
      <TextInput placeholder="Buscar advogado ou caso ..." style={estilos.inputBusca} />
    </View>
    <View style={estilos.filtros}>
      <View style={estilos.filtroAtivo}><Text style={estilos.txtBranco}>Todos</Text></View>
      <View style={estilos.filtroInativo}><Text style={estilos.txtCinza}>Não lidas</Text></View>
    </View>
    <ScrollView style={estilos.paddingPadrao}>
      {[1, 2, 3, 4].map(i => (
        <TouchableOpacity key={i} style={estilos.cardConversa} onPress={() => navigation.navigate('Chat')}>
          <View style={estilos.avatarCircular}><Text style={estilos.textoIniciais}>CM</Text></View>
          <View style={estilos.infoConversa}>
            <Text style={estilos.nomeAdvogado}>Dr. Carlos Mendes</Text>
            <Text style={estilos.subConversa}>Sobre: Rescisão trabalhista indevida</Text>
            <Text style={estilos.previewMsg} numberOfLines={1}>Olá João, recebi sua documentação e tal e zaz...</Text>
          </View>
          <View style={estilos.badge}><Text style={estilos.txtBadge}>2</Text></View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </SafeAreaView>
);

const TelaChat = ({ navigation }) => (
  <SafeAreaView style={estilos.container}>
    <View style={estilos.cabecalhoChat}>
      <TouchableOpacity onPress={() => navigation.goBack()}><CornerDownLeft color={CORES.cinza} /></TouchableOpacity>
      <View style={estilos.avatarCircularPequeno}><Text style={estilos.textoIniciais}>CM</Text></View>
      <View style={{flex: 1, marginLeft: 10}}>
        <Text style={estilos.nomeChat}>Dr. Carlos Mendes</Text>
        <Text style={estilos.statusChat}>Online</Text>
      </View>
    </View>
    <ScrollView style={estilos.paddingPadrao}>
       <View style={estilos.dataChat}><Text style={estilos.txtCinzaPequeno}>Hoje</Text></View>
       <View style={estilos.balaoEsquerda}><Text style={estilos.txtPreto}>Olá João! Sou especialista em direito trabalhista. Vi sua análise de IA e gostaria de ajudar.</Text><Text style={estilos.hora}>09:41</Text></View>
       <View style={estilos.balaoDireita}><Text style={estilos.txtBranco}>Olá Dr., obrigado! O que precisamos fazer agora?</Text><Text style={estilos.horaBranca}>09:43</Text></View>
       <View style={estilos.cardDocumento}>
          <View style={estilos.linhaDoc}>
             <FileText color={CORES.petroleo} size={24} />
             <View style={{marginLeft: 10}}>
               <Text style={estilos.labelDoc}>Documento solicitado</Text>
               <Text style={estilos.nomeDoc}>Contrato de trabalho</Text>
             </View>
          </View>
          <TouchableOpacity style={estilos.btnEnviarDoc}><Text style={estilos.txtBranco}>📄 Enviar documento</Text></TouchableOpacity>
       </View>
    </ScrollView>
  </SafeAreaView>
);

// --- TELA 7: AVALIAR ADVOGADO ---
const TelaAvaliar = ({ navigation }) => {
  const [anonimo, setAnonimo] = useState(false);
  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.cabecalhoSimples}>
        <TouchableOpacity onPress={() => navigation.goBack()}><CornerDownLeft color={CORES.cinza} /></TouchableOpacity>
        <Text style={estilos.tituloHeader}>Avaliar advogado</Text>
      </View>
      <ScrollView style={estilos.paddingPadrao}>
        <Text style={[estilos.tituloSessao, {fontSize: 22}]}>Avaliar advogado</Text>
        <Text style={estilos.subOla}>Sua avaliação ajuda outros clientes a encontrarem o advogado ideal.</Text>

        <View style={estilos.cardAvaliacaoSimples}>
          <View style={estilos.avatarCircular}><Text style={estilos.textoIniciais}>CM</Text></View>
          <View style={{marginLeft: 15}}>
            <Text style={estilos.nomeAdvogado}>Dr. Carlos Mendes</Text>
            <Text style={estilos.areaAdvogado}>DIREITO TRABALHISTA</Text>
            <Text style={estilos.textoPasta}>Sobre: Rescisão trabalhista indevida</Text>
          </View>
        </View>

        <Text style={[estilos.txtNegritoCentro, {marginTop: 30}]}>Como você avalia o atendimento?</Text>
        <View style={estilos.linhaEstrelasGrande}>
          {[1,2,3,4,5].map(i => <Star key={i} color="#33A3F2" fill={i <= 4 ? "#33A3F2" : "transparent"} size={42} />)}
        </View>

        <View style={estilos.linhaEspacada}>
          <Text style={{fontWeight: 'bold', color: CORES.navy}}>Deixe um comentário (opcional)</Text>
          <Text style={estilos.dataTexto}>120/500 caracteres</Text>
        </View>
        <TextInput multiline style={estilos.inputComentario} placeholder="Este caso apresenta alta probabilidade de êxito..." />

        <View style={estilos.cardAnonimo}>
          <View style={{flex: 1}}>
            <Text style={{fontWeight: 'bold', color: CORES.navy}}>Enviar avaliação anonimamente</Text>
            <Text style={estilos.dataTexto}>Seu nome não será exibido publicamente</Text>
          </View>
          <Switch value={anonimo} onValueChange={setAnonimo} trackColor={{ false: "#767577", true: "#33A3F2" }} thumbColor="#FFF" />
        </View>

        <TouchableOpacity style={[estilos.btnChatLargo, {marginTop: 20}]} onPress={() => navigation.navigate('Sucesso')}>
           <Text style={estilos.txtBranco}>Enviar avaliação</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- TELA 8: SUCESSO ---
const TelaSucesso = ({ navigation }) => (
  <SafeAreaView style={[estilos.container, {justifyContent: 'center'}]}>
    <View style={{alignItems: 'center', padding: 30}}>
       <View style={estilos.circuloCheck}><CheckCircle2 color="#33A3F2" size={80} /></View>
       <Text style={[estilos.olaTexto, {textAlign: 'center'}]}>Avaliação enviada!</Text>
       <Text style={[estilos.subOla, {textAlign: 'center', marginBottom: 40}]}>Obrigado pelo seu feedback. Ele é muito importante para nossa comunidade.</Text>
       
       <TouchableOpacity style={estilos.btnChatLargo} onPress={() => navigation.navigate('TelaInicio')}>
         <Home color="#FFF" size={20} />
         <Text style={[estilos.txtBranco, {marginLeft: 10}]}>Voltar ao início</Text>
       </TouchableOpacity>

       <TouchableOpacity style={estilos.btnBrancoLargo} onPress={() => navigation.navigate('Conversas')}>
         <MessageSquare color={CORES.cinza} size={20} />
         <Text style={[estilos.txtCinza, {marginLeft: 10}]}>Ver minhas conversas</Text>
       </TouchableOpacity>
    </View>
  </SafeAreaView>
);
// --- NAVEGAÇÃO ---

const AbasPrincipais = () => (
  <Abas.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: CORES.petroleo }}>
    <Abas.Screen name="Início" component={TelaInicio} options={{ tabBarIcon: ({color}) => <Home color={color} /> }} />
    <Abas.Screen name="ConversasTab" component={TelaConversas} options={{ tabBarIcon: ({color}) => <MessageSquare color={color} />, title: 'Mensagens' }} />
    <Abas.Screen name="Perfil" component={TelaPerfilAdvogado} options={{ tabBarIcon: ({color}) => <User color={color} /> }} />
  </Abas.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Pilha.Navigator screenOptions={{ headerShown: false }}>
        <Pilha.Screen name="Principal" component={AbasPrincipais} />
        <Pilha.Screen name="Detalhe" component={TelaDetalhe} />
        <Pilha.Screen name="PerfilAdvogado" component={TelaPerfilAdvogado} />
        <Pilha.Screen name="Conversas" component={TelaConversas} />
        <Pilha.Screen name="Chat" component={TelaChat} />
        <Pilha.Screen name="Avaliar" component={TelaAvaliar} />
        <Pilha.Screen name="Sucesso" component={TelaSucesso} />
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
  textoTagArea: { fontSize: 10, color: CORES.petroleo, fontWeight: 'bold' },
  tagStatus: { backgroundColor: '#E8F5E9', padding: 4, borderRadius: 4 },
  textoTagStatus: { fontSize: 10, color: '#2E7D32', fontWeight: 'bold' },
  tituloCardCaso: { fontSize: 17, fontWeight: 'bold', color: CORES.navy, marginVertical: 15 },
  rodapeCardCaso: { flexDirection: 'row', alignItems: 'center' },
  grupoAvatares: { flexDirection: 'row', alignItems: 'center' },
  miniAvatar: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  textoMiniAvatar: { fontSize: 8, color: '#FFF', fontWeight: 'bold' },
  textoInteressados: { fontSize: 10, color: CORES.cinza, marginLeft: 10 },
  itemAdvogado: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderColor: '#F5F5F5' },
  avatarCircular: { width: 50, height: 50, borderRadius: 25, backgroundColor: CORES.navy, justifyContent: 'center', alignItems: 'center' },
  avatarCircularGigante: { width: 100, height: 100, borderRadius: 50, backgroundColor: CORES.navy, justifyContent: 'center', alignItems: 'center' },
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
  nomeChat: { fontWeight: 'bold', color: CORES.navy, marginLeft: 15 },
  balaoEsquerda: { backgroundColor: '#F0F2F5', padding: 15, borderRadius: 15, borderTopLeftRadius: 0, alignSelf: 'flex-start', maxWidth: '80%', marginBottom: 15 },
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
  // Estilos Novas Telas
  cardAvaliacaoSimples: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#FFF', borderRadius: 15, borderWidth: 1, borderColor: '#EEE', borderLeftWidth: 5, borderLeftColor: CORES.petroleo },
  txtNegritoCentro: { textAlign: 'center', fontWeight: 'bold', color: CORES.navy, fontSize: 16 },
  linhaEstrelasGrande: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginVertical: 20 },
  inputComentario: { backgroundColor: '#F0F2F5', borderRadius: 12, padding: 15, height: 120, textAlignVertical: 'top', marginTop: 10 },
  cardAnonimo: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#EEE', marginTop: 20 },
  circuloCheck: { width: 150, height: 150, borderRadius: 75, backgroundColor: '#E1F5FE', justifyContent: 'center', alignItems: 'center', marginBottom: 30, elevation: 5 }
});

registerRootComponent(App);