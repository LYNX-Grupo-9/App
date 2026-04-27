import { COLORS } from "@/src/constants/colors";
import React from "react";
import { StyleSheet, Text } from "react-native";

export function MainTitle({ title }: { title: string }) {
  return (
    <Text style={styles.text}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.mainText,
        marginBottom: 8,
    }
})