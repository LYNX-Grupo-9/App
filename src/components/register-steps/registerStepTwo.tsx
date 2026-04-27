import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { ChevronDown, Sparkles } from "lucide-react-native";
import { MainTitle } from "@/src/components/texts/main-title/main-title";
import { SubTitle } from "@/src/components/texts/subtitle/subtitle";
import MainButton from "@/src/components/buttons/mainButton";
import { COLORS } from "@/src/constants/colors";

const AREAS = [
  "Direito Trabalhista",
  "Direito de Família",
  "Direito do Consumidor",
  "Direito Previdenciário",
  "Direito Civil",
];

export function StepDescricao({
  area, setArea,
  descricao, setDescricao,
  onNext,
}: {
  area: string;
  setArea: (v: string) => void;
  descricao: string;
  setDescricao: (v: string) => void;
  onNext: () => void;
}) {
  const [showAreas, setShowAreas] = useState(false);
  const MAX = 1000;

 return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainTitle title="Conte-nos sobre seu caso" />
      <SubTitle title="Quanto mais detalhes você fornecer, melhor conseguiremos encontrar o advogado ideal para você" />

      <Text style={styles.label}>ÁREA DO DIREITO</Text>
      <TouchableOpacity
        style={styles.select}
        onPress={() => setShowAreas(!showAreas)}
      >
        <Text style={[styles.selectText, !area && { color: COLORS.gray }]}>
          {area || "Selecione uma categoria"}
        </Text>
        <ChevronDown color={COLORS.teal} size={20} />
      </TouchableOpacity>

      {showAreas && (
        <View style={styles.dropdown}>
          {AREAS.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.dropdownItem}
              onPress={() => { setArea(item); setShowAreas(false); }}
            >
              <Text style={styles.dropdownText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={[styles.label, { marginTop: 20 }]}>DESCREVA SEU CASO</Text>
      <TextInput
        style={styles.textarea}
        placeholder={"Explique sua situação com detalhes.\nO que aconteceu? Quando? Quem está envolvido?"}
        placeholderTextColor={COLORS.gray}
        multiline
        maxLength={MAX}
        value={descricao}
        onChangeText={setDescricao}
        textAlignVertical="top"
      />
      <Text style={styles.counter}>{descricao.length}/{MAX} caracteres</Text>
      <View style={styles.iaCard}>
        <Sparkles color={COLORS.white} size={20} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.iaTitle}>Análise Inteligente</Text>
          <Text style={styles.iaText}>
            Nossa IA irá resumir os pontos jurídicos principais para acelerar sua triagem com os especialistas.
          </Text>
        </View>
      </View>

      <MainButton
        title="Analisar com IA ✦"
        onPress={onNext}
        isDisabled={!area || descricao.length < 20}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    // Labels
    label: { fontSize: 11, fontWeight: "bold", color: COLORS.navy, marginVertical: 16 },
  
    // Select
    select: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      borderColor: COLORS.tealLight,
      borderRadius: 8,
      paddingHorizontal: 16,
      height: 52,
    },
    selectText: { fontSize: 15, color: COLORS.navy },
    dropdown: {
      borderWidth: 1,
      borderColor: COLORS.tealLight,
      borderRadius: 8,
      marginTop: 4,
      overflow: "hidden",
    },
    dropdownItem: { padding: 14, borderBottomWidth: 1, borderColor: "#F5F5F5" },
    dropdownText: { fontSize: 14, color: COLORS.navy },
  
    // Textarea
    textarea: {
      borderWidth: 1,
      borderColor: COLORS.tealLight,
      borderRadius: 8,
      padding: 16,
      height: 160,
      fontSize: 14,
      color: COLORS.navy,
    },
    counter: { fontSize: 11, color: COLORS.gray, textAlign: "right", marginTop: 6 },
    iaCard: {
      flexDirection: "row",
      backgroundColor: COLORS.navy,
      borderRadius: 12,
      padding: 16,
      marginVertical: 20,
      alignItems: "flex-start",
    },
    iaTitle: { color: "#fff", fontWeight: "bold", fontSize: 15, marginBottom: 4 },
    iaText: { color: COLORS.white, fontSize: 12, lineHeight: 18 },
  });