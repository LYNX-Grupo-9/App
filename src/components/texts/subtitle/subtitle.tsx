import { COLORS } from "@/src/constants/colors";
import React from "react";
import { StyleSheet, Text } from "react-native";

export function SubTitle({ title }: { title: string }) {
  return (
    <Text style={styles.text}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: 'regular',
        color: COLORS.subText,
    
    }
})