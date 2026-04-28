import React, { useRef, useState } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, ScrollView, ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import { ChevronDown, Mic, Square, Sparkles } from "lucide-react-native";

import { MainTitle } from "@/src/components/texts/main-title/main-title";
import { SubTitle } from "@/src/components/texts/subtitle/subtitle";
import MainButton from "@/src/components/buttons/mainButton";
import { COLORS } from "@/src/constants/colors";
import endpoints from "@/src/service/api";

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
  isLoading,
}: {
  area: string; setArea: (v: string) => void;
  descricao: string; setDescricao: (v: string) => void;
  onNext: () => void;
  isLoading: boolean;
}) {
  const [showAreas, setShowAreas]       = useState(false);
  const [recording, setRecording]       = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const recordingRef                    = useRef<Audio.Recording | null>(null);
  const MAX = 1000;

  async function startRecording() {
    const { granted } = await Audio.requestPermissionsAsync();
    if (!granted) return;

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    recordingRef.current = recording;
    setRecording(true);
  }

  async function stopRecording() {
    if (!recordingRef.current) return;

    setRecording(false);
    await recordingRef.current.stopAndUnloadAsync();
    const uri = recordingRef.current.getURI();
    recordingRef.current = null;

    if (!uri) return;

    setTranscribing(true);
    try {
      const { data } = await endpoints.ai.transcreverAudio({
        uri,
        name: "audio.m4a",
        type: "audio/m4a",
      });

      // Anexa a transcrição ao texto já existente
      setDescricao(
        descricao
          ? `${descricao} ${data.transcricao}`
          : data.transcricao
      );
    } catch {
      // silencioso — usuário pode digitar manualmente
    } finally {
      setTranscribing(false);
    }
  }

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

      <View style={styles.textareaWrapper}>
        <TextInput
          style={styles.textarea}
          placeholder={"Explique sua situação com detalhes.\nO que aconteceu? Quando? Quem está envolvido?"}
          placeholderTextColor={COLORS.gray}
          multiline
          maxLength={MAX}
          value={descricao}
          onChangeText={setDescricao}
          textAlignVertical="top"
          editable={!recording && !transcribing}
        />

        {/* Indicador de gravação ativo */}
        {recording && (
          <View style={styles.recordingBadge}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingText}>Gravando...</Text>
          </View>
        )}
      </View>

      {/* Contador + botão de microfone */}
      <View style={styles.textareaFooter}>
        <Text style={styles.counter}>{descricao.length}/{MAX} caracteres</Text>

        {transcribing ? (
          <View style={styles.micRow}>
            <ActivityIndicator size="small" color={COLORS.teal} />
            <Text style={styles.transcribingText}>Transcrevendo...</Text>
          </View>
        ) : recording ? (
          <TouchableOpacity style={styles.micBtnActive} onPress={stopRecording}>
            <Square size={14} color={COLORS.white} />
            <Text style={styles.micBtnText}>Parar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.micBtn} onPress={startRecording}>
            <Mic size={14} color={COLORS.teal} />
            <Text style={styles.micBtnTextTeal}>Usar voz</Text>
          </TouchableOpacity>
        )}
      </View>

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
        title={isLoading ? "Analisando..." : "Analisar com IA ✦"}
        onPress={onNext}
        isDisabled={!area || descricao.length < 20 || isLoading || recording || transcribing}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 11, fontWeight: "bold", color: COLORS.navy, marginVertical: 16 },

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

  textareaWrapper: { position: "relative" },
  textarea: {
    borderWidth: 1,
    borderColor: COLORS.tealLight,
    borderRadius: 8,
    padding: 16,
    height: 160,
    fontSize: 14,
    color: COLORS.navy,
  },

  recordingBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff0f0",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  recordingDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#E53935",
  },
  recordingText: { fontSize: 11, color: "#E53935", fontWeight: "600" },

  textareaFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 4,
  },
  counter: { fontSize: 11, color: COLORS.gray },

  micRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  transcribingText: { fontSize: 11, color: COLORS.teal },

  micBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.teal,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  micBtnActive: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#E53935",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  micBtnText: { fontSize: 11, color: COLORS.white, fontWeight: "600" },
  micBtnTextTeal: { fontSize: 11, color: COLORS.teal, fontWeight: "600" },

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
