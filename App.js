import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, MessageSquare, Settings, Upload } from 'lucide-react-native';

import TemisLogoImg from './assets/images/temis-logo.png';

const Stack = createStackNavigator();

const THEME = {
  bgNavy: '#002D4B',
  orange: '#E89E32',
  white: '#FFFFFF',
  textGray: '#CCCCCC',
};

// header
const Logo = () => (
  <View style={styles.logoContainer}>
    <Image source={TemisLogoImg} style={styles.logoImage} resizeMode="contain" />
    <Text style={styles.logoText}>TemisHub</Text>
  </View>
);

// tela 1
const RegisterScreen = ({ navigation }) => (
  <View style={styles.containerNavy}>
    <Logo />
    <Text style={styles.screenTitle}>Crie sua conta</Text>
    <ScrollView showsVerticalScrollIndicator={false}>
      {['Nome', 'Email', 'Telefone', 'Senha', 'Confirmar senha'].map((field) => (
        <View key={field} style={styles.inputGroup}>
          <Text style={styles.label}>{field}</Text>
          <TextInput style={styles.input} secureTextEntry={field.includes('Senha')} />
        </View>
      ))}
      <View style={styles.paginationDots}>
        <View style={[styles.dot, { backgroundColor: THEME.orange }]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Descricao')}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  </View>
);

// tela 2
const DescriptionScreen = ({ navigation }) => (
  <View style={styles.containerNavy}>
    <Logo />
    <Text style={styles.screenTitle}>Descreva seu problema jurídico</Text>
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Área do direito</Text>
      <View style={styles.input}><Text style={{color: '#999'}}>Selecionar</Text></View>
      <Text style={styles.label}>Descreva seu caso</Text>
      <TextInput 
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]} 
        multiline 
        placeholder="Descreva seu problema..."
        placeholderTextColor="#999"
      />
      <Text style={styles.label}>Documento (opcional)</Text>
      <View style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <Text style={{color: '#999'}}>Anexar</Text>
        <Upload color="#999" size={20} />
      </View>
    </View>
    <View style={styles.paginationDots}>
      <View style={styles.dot} />
      <View style={[styles.dot, { backgroundColor: THEME.orange }]} />
      <View style={styles.dot} />
    </View>
    <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Analise')}>
      <Text style={styles.buttonText}>Analisar meu caso com IA</Text>
    </TouchableOpacity>
  </View>
);

// tela 3
const AnalysisScreen = ({ navigation }) => (
  <View style={styles.containerNavy}>
    <Logo />
    <Text style={styles.screenTitle}>Análise da IA</Text>
    <View style={styles.analysisCard}>
      <Text style={styles.analysisTitle}>Análise inicial do caso</Text>
      <Text style={styles.analysisText}>
        Com base na descrição, seu caso pode se enquadrar em Direito Trabalhista.
      </Text>
    </View>
    <View style={styles.paginationDots}>
      <View style={styles.dot} />
      <View style={styles.dot} />
      <View style={[styles.dot, { backgroundColor: THEME.orange }]} />
    </View>
    <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Feed')}>
      <Text style={styles.buttonText}>Publicar caso</Text>
    </TouchableOpacity>
  </View>
);

// tela 4
const FeedScreen = () => {
  const lawyers = [{ id: '1' }, { id: '2' }, { id: '3' }];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <ScrollView style={{ padding: 20 }}>
        <Text style={styles.darkTitle}>Seu caso</Text>
        <View style={styles.whiteCard}>
          <Text style={styles.cardTextSmall}>Caso relacionado a verbas rescisórias.</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
          <Text style={styles.darkTitle}>Advogados interessados</Text>
          <Text style={{ fontSize: 24, color: THEME.orange, fontWeight: 'bold' }}>3</Text>
        </View>
        {lawyers.map((item) => (
          <View key={item.id} style={styles.lawyerCard}>
            <Text style={styles.lawyerName}>Dr. João Silva</Text>
            <Text style={styles.lawyerSub}>Especialista em Direito Trabalhista</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.bottomNav}>
        <Home color={THEME.orange} size={28} />
        <MessageSquare color={THEME.bgNavy} size={28} />
        <Settings color={THEME.bgNavy} size={28} />
      </View>
    </SafeAreaView>
  );
};

// navegacao
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Cadastro" component={RegisterScreen} />
        <Stack.Screen name="Descricao" component={DescriptionScreen} />
        <Stack.Screen name="Analise" component={AnalysisScreen} />
        <Stack.Screen name="Feed" component={FeedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// estilos
const styles = StyleSheet.create({
  containerNavy: { flex: 1, backgroundColor: THEME.bgNavy, padding: 30, paddingTop: 60 },
  logoContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 40 },
  logoImage: { width: 45, height: 45, marginRight: 10 },
  logoText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  screenTitle: { color: 'white', fontSize: 18, textAlign: 'center', marginBottom: 30 },
  inputGroup: { marginBottom: 15 },
  label: { color: 'white', marginBottom: 8 },
  input: { backgroundColor: 'white', borderRadius: 8, padding: 12 },
  primaryButton: { backgroundColor: THEME.orange, padding: 18, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: THEME.bgNavy, fontWeight: 'bold' },
  paginationDots: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginVertical: 25 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: 'white' },
  analysisCard: { backgroundColor: 'white', padding: 25, borderRadius: 12 },
  analysisTitle: { fontWeight: 'bold', marginBottom: 10 },
  analysisText: { color: '#555' },
  darkTitle: { fontSize: 16, fontWeight: 'bold', color: THEME.bgNavy },
  whiteCard: { backgroundColor: 'white', padding: 20, borderRadius: 12 },
  cardTextSmall: { color: '#666' },
  lawyerCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginTop: 15, borderLeftWidth: 5, borderLeftColor: THEME.orange },
  lawyerName: { color: THEME.orange, fontWeight: 'bold' },
  lawyerSub: { color: THEME.bgNavy, marginTop: 4 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', padding: 20, backgroundColor: 'white' }
});

registerRootComponent(App);