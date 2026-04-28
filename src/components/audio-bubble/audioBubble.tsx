import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { Play, Pause, Volume2 } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';

type Props = {
  uri: string;
  isUser: boolean;
  time: string;
};

export default function AudioBubble({ uri, isUser, time }: Props) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  async function togglePlay() {
    if (playing && sound) {
      await sound.pauseAsync();
      setPlaying(false);
      return;
    }

    setLoading(true);
    try {
      if (sound) {
        await sound.playFromPositionAsync(0);
      } else {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: true }
        );
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            setPlaying(false);
          }
        });
        setSound(newSound);
      }
      setPlaying(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[styles.bubble, isUser ? styles.right : styles.left]}>
      <Volume2 size={14} color={isUser ? COLORS.white : COLORS.teal} />

      <TouchableOpacity onPress={togglePlay} style={styles.btn} disabled={loading}>
        {loading
          ? <ActivityIndicator size="small" color={isUser ? COLORS.white : COLORS.teal} />
          : playing
            ? <Pause size={18} color={isUser ? COLORS.white : COLORS.teal} />
            : <Play  size={18} color={isUser ? COLORS.white : COLORS.teal} />
        }
      </TouchableOpacity>

      <View style={[styles.wave, { backgroundColor: isUser ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.1)' }]} />

      <Text style={[styles.time, { color: isUser ? 'rgba(255,255,255,0.7)' : COLORS.gray }]}>
        {time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 18,
    marginBottom: 6,
    maxWidth: '75%',
  },
  right: { backgroundColor: COLORS.teal, alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  left:  { backgroundColor: COLORS.white, alignSelf: 'flex-start', borderBottomLeftRadius: 4, borderWidth: 1, borderColor: '#eee' },
  btn:   { padding: 2 },
  wave:  { width: 80, height: 3, borderRadius: 2 },
  time:  { fontSize: 10 },
});