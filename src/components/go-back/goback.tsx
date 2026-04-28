import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Line, Path } from 'react-native-svg';
import { COLORS } from '../../constants/colors';

type Props = {
  color?: string;
  size?: number;
  style?: any;
  onPress?: () => void;
};

export default function GoBackButton({
  color = COLORS.gray,
  size = 24,
  style,
  onPress,
}: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={onPress ?? (() => router.back())} // ← usa o custom ou volta normalmente
      style={[styles.container, style]}
      activeOpacity={0.7}
    >
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Line
          x1="20" y1="12" x2="4" y2="12"
          stroke={color} strokeWidth="1.5" strokeLinecap="round"
        />
        <Path
          d="M10 6L4 12L10 18"
          stroke={color} strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round" fill="none"
        />
      </Svg>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { padding: 4 },
});