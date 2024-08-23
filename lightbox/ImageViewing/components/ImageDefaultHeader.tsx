import { ThemedText } from "@/components/ThemedText";
import React, { useCallback } from "react";
import { SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";

interface Insets {
  top?: number | undefined;
  left?: number | undefined;
  bottom?: number | undefined;
  right?: number | undefined;
}

const createHitslop = (size: number): Insets => ({
  top: size,
  left: size,
  bottom: size,
  right: size,
});
export const HITSLOP_10 = createHitslop(10);
export const HITSLOP_20 = createHitslop(20);
export const HITSLOP_30 = createHitslop(30);
export const BACK_HITSLOP = HITSLOP_30;
export const MAX_POST_LINES = 25;

type Props = {
  onRequestClose: () => void;
};

const HIT_SLOP = createHitslop(16);

const ImageDefaultHeader = ({ onRequestClose }: Props) => {
  return (
    <SafeAreaView style={styles.root}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={onRequestClose}
        hitSlop={HIT_SLOP}
        accessibilityRole="button"
        accessibilityHint="Closes viewer for header image"
        onAccessibilityEscape={onRequestClose}
      >
        <ThemedText style={{ color: "#fff" }}>X</ThemedText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    pointerEvents: "box-none",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 8,
  },
  closeButton: {
    marginRight: 8,
    marginTop: 8,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: "#1B1B1B",
  },
});

export default ImageDefaultHeader;
