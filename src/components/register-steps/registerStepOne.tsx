import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MainTitle } from "@/src/components/texts/main-title/main-title";
import { SubTitle } from "@/src/components/texts/subtitle/subtitle";
import MainButton from "@/src/components/buttons/mainButton";
import MainInput from "@/src/components/inputs/mainInput/mainInput";

interface Props {
  nome: string; setNome: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  cpf: string; setCpf: (v: string) => void;
  senha: string; setSenha: (v: string) => void;
  onNext: () => void;
}

function formatCpf(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

export function StepDadosPessoais({ nome, setNome, email, setEmail, cpf, setCpf, senha, setSenha, onNext }: Props) {
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirma, setShowConfirma] = useState(false);

  const senhasIguais = senha === confirmaSenha;
  const isValid = !!nome && !!email && !!cpf && !!senha && !!confirmaSenha && senhasIguais;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainTitle title="Crie sua conta" />
      <SubTitle title="Preencha seus dados para começar" />

      <MainInput title="Nome completo" value={nome} onChange={setNome} placeholder="João Vitor" type="text" />
      <MainInput title="E-mail" value={email} onChange={setEmail} placeholder="seu@email.com" type="text" />
      <MainInput title="CPF" value={cpf} onChange={(v) => setCpf(formatCpf(v))} placeholder="000.000.000-00" type="text" />

      {/* Senha */}
      <View style={{ position: "relative" }}>
        <MainInput
          title="Senha"
          value={senha}
          onChange={setSenha}
          placeholder="••••••••"
          type={showSenha ? "text" : "password"}
        />
        <TouchableOpacity
          onPress={() => setShowSenha((v) => !v)}
          style={{ position: "absolute", right: 12, bottom: 18 }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name={showSenha ? "eye-off-outline" : "eye-outline"} size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Confirmar senha */}
      <View style={{ position: "relative" }}>
        <MainInput
          title="Confirmar senha"
          value={confirmaSenha}
          onChange={setConfirmaSenha}
          placeholder="••••••••"
          type={showConfirma ? "text" : "password"}
        />
        <TouchableOpacity
          onPress={() => setShowConfirma((v) => !v)}
          style={{ position: "absolute", right: 12, bottom: 18 }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name={showConfirma ? "eye-off-outline" : "eye-outline"} size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Erro de senhas diferentes */}
      {confirmaSenha.length > 0 && !senhasIguais && (
        <Text style={{ color: "red", fontSize: 12, marginTop: -8, marginBottom: 8, marginLeft: 4 }}>
          As senhas não coincidem
        </Text>
      )}

      <MainButton title="Continuar" onPress={onNext} isDisabled={!isValid} />
    </ScrollView>
  );
}