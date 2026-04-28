import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { Sparkles } from "lucide-react-native";
import { MainTitle } from "@/src/components/texts/main-title/main-title";
import { SubTitle } from "@/src/components/texts/subtitle/subtitle";
import MainButton from "@/src/components/buttons/mainButton";
import SecondaryButton from "@/src/components/buttons/secondaryButton";
import { COLORS } from "@/src/constants/colors";

export function StepAnalise({
    area,
    analise,
    onConfirm,
    onUpdate,
    isLoading,
}: {
    area: string;
    analise: string;
    onConfirm: () => void;
    onUpdate: (ajuste: string) => void;
    isLoading: boolean;
}) {
    const [ajuste, setAjuste] = useState("");

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <MainTitle title="Análise do seu caso" />
            <SubTitle title="Revise o resumo gerado com base na sua descrição para encontrarmos o melhor especialista." />
            <View style={styles.resumoCard}>
                <View style={styles.resumoTags}>
                    <View style={styles.tagIA}>
                        <Sparkles color={COLORS.teal} size={12} />
                        <Text style={styles.tagIAText}>Gerado por IA</Text>
                    </View>
                    <View style={styles.tagArea}>
                        <Text style={styles.tagAreaText}>{area.toUpperCase()}</Text>
                    </View>
                </View>

                <Text style={styles.resumoTitulo}>Resumo Jurídico Preliminar</Text>
                <Text style={styles.resumoTexto}>{analise}</Text>

                <View style={styles.avisoRow}>
                    <Text style={styles.avisoText}>
                        ⓘ  Esta análise é automática e serve apenas para triagem inicial.
                    </Text>
                </View>
            </View>

            {/* Ajuste */}
            <Text style={styles.sectionTitle}>Quer adicionar algo?</Text>
            <TextInput
                style={styles.ajusteInput}
                placeholder="Peça à IA para incluir ou ajustar algo na análise..."
                placeholderTextColor={COLORS.gray}
                multiline
                value={ajuste}
                onChangeText={setAjuste}
                textAlignVertical="top"
            />

            <SecondaryButton
                title="Atualizar análise"
                onPress={() => { onUpdate(ajuste); setAjuste(''); }}
            />

            <MainButton
                title="Confirmar e buscar advogados →"
                onPress={onConfirm}
                isDisabled={isLoading}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    sectionTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.navy, marginVertical: 16 },
    resumoCard: {
        borderWidth: 1,
        borderColor: COLORS.tealLight,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.teal,
        borderRadius: 12,
        padding: 16,
        marginVertical: 16,
    },
    resumoTags: { flexDirection: "row", gap: 8, marginBottom: 12 },
    tagIA: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: COLORS.tealLight,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 99,
    },
    tagIAText: { fontSize: 11, color: COLORS.teal, fontWeight: "bold" },
    tagArea: {
        backgroundColor: "#F0F2F5",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 99,
    },
    tagAreaText: { fontSize: 11, color: COLORS.navy, fontWeight: "bold" },
    resumoTitulo: { fontSize: 15, fontWeight: "bold", color: COLORS.navy, marginBottom: 10 },
    resumoTexto: { fontSize: 14, color: "#444", lineHeight: 22 },
    avisoRow: { marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderColor: "#F0F2F5" },
    avisoText: { fontSize: 12, color: COLORS.gray },

    // Ajuste
    ajusteInput: {
        borderWidth: 1,
        borderColor: COLORS.tealLight,
        borderRadius: 8,
        padding: 16,
        height: 100,
        fontSize: 14,
        color: COLORS.navy,
        marginBottom: 16,
    },
});