import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

type Level = 'low' | 'medium' | 'high' | 'very_high';

interface Props {
  probability: number; // 0–100
}

const LEVELS: Record<Level, { label: string; hint: string; color: string }> = {
  low:       { label: 'BAIXA',      hint: 'Evidências insuficientes',    color: '#E24B4A' },
  medium:    { label: 'MÉDIA',      hint: 'Reforce a documentação',      color: '#EF9F27' },
  high:      { label: 'ALTA',       hint: 'Boas chances de êxito',       color: '#1D9E75' },
  very_high: { label: 'MUITO ALTA', hint: 'Caso bem fundamentado',       color: '#1D9E75' },
};

function getLevel(p: number): Level {
  if (p < 35) return 'low';
  if (p < 60) return 'medium';
  if (p < 85) return 'high';
  return 'very_high';
}

export function CaseSuccessBar({ probability }: Props) {
  const anim = useRef(new Animated.Value(0)).current;
  const level = getLevel(probability);
  const cfg = LEVELS[level];

  useEffect(() => {
    Animated.timing(anim, {
      toValue: probability / 100,
      duration: 900,
      useNativeDriver: false,
    }).start();
  }, [probability]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Probabilidade de sucesso</Text>

      <View style={styles.track}>
        <Animated.View
          style={[
            styles.fill,
            {
              backgroundColor: cfg.color,
              width: anim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>

      <View style={styles.footer}>
        <Text style={[styles.label, { color: cfg.color }]}>{cfg.label}</Text>
        <Text style={styles.hint}> {probability}% — {cfg.hint}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  title:     { fontSize: 11, fontWeight: '500', color: '#888', letterSpacing: 1, textTransform: 'uppercase' },
  track:     { height: 4, backgroundColor: '#E5E5E5', borderRadius: 2, overflow: 'hidden' },
  fill:      { height: '100%', borderRadius: 2 },
  footer:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label:     { fontSize: 12, fontWeight: '600' },
  hint:      { fontSize: 12, color: '#888' },
});