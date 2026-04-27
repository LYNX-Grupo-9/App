import React from "react";
import { ScrollView } from "react-native";
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

export function StepDadosPessoais({ nome, setNome, email, setEmail, cpf, setCpf, senha, setSenha, onNext }: Props) {
  const isValid = !!nome && !!email && !!cpf && !!senha;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MainTitle title="Crie sua conta" />
      <SubTitle title="Preencha seus dados para começar" />

      <MainInput title="Nome completo" value={nome} onChange={setNome} placeholder="João Vitor" type="text" />
      <MainInput title="E-mail" value={email} onChange={setEmail} placeholder="seu@email.com" type="text" />
      <MainInput title="CPF" value={cpf} onChange={setCpf} placeholder="000.000.000-00" type="text" />
      <MainInput title="Senha" value={senha} onChange={setSenha} placeholder="••••••••" type="password" />

      <MainButton title="Continuar" onPress={onNext} isDisabled={!isValid} />
    </ScrollView>
  );
}