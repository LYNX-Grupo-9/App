import React, { useRef, useState } from 'react';
import {
  View, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, Text,
} from 'react-native';
import { Audio } from 'expo-av';
import { Send, Mic, Square } from 'lucide-react-native';
import { COLORS } from '../../../constants/colors';

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  onSend: () => void;
  onSendAudio: (uri: string) => void;
  disabled?: boolean;
};

export default function ChatInput({ value, onChangeText, onSend, onSendAudio, disabled }: Props) {
  const [recording, setRecording] = useState(false);
  const recordingRef = useRef<Audio.Recording | null>(null);

  async function startRecording() {
    const { granted } = await Audio.requestPermissionsAsync();
    if (!granted) return;

    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
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
    if (uri) onSendAudio(uri);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Digite sua mensagem..."
        placeholderTextColor={COLORS.gray}
        multiline
        editable={!disabled && !recording}
      />

      {recording ? (
        // Botão para parar a gravação
        <TouchableOpacity style={[styles.btn, styles.btnRed]} onPress={stopRecording}>
          <Square size={18} color={COLORS.white} />
        </TouchableOpacity>
      ) : value.trim() ? (
        // Botão de enviar texto
        <TouchableOpacity style={styles.btn} onPress={onSend} disabled={disabled}>
          {disabled
            ? <ActivityIndicator size="small" color={COLORS.white} />
            : <Send size={18} color={COLORS.white} />
          }
        </TouchableOpacity>
      ) : (
        // Botão de microfone
        <TouchableOpacity style={styles.btn} onPress={startRecording} disabled={disabled}>
          <Mic size={18} color={COLORS.white} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 100,
    color: '#111',
  },
  btn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.teal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnRed: { backgroundColor: '#E53935' },
});