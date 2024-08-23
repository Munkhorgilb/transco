/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ConfirmModal, useModalControls } from "./ModalProvider";
import { ThemedText } from "@/components/ThemedText";
export const snapPoints = ["60%"];

export function Component({
  title,
  message,
  onPressConfirm,
  onPressCancel,
  confirmBtnText,
  confirmBtnStyle,
  cancelBtnText,
}: ConfirmModal) {
  const { closeModal } = useModalControls();

  const onPress = async () => {
    try {
      await onPressConfirm();
      closeModal();
      return;
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <View testID="confirmModal" style={[styles.container]}>
      <View>
        <ThemedText style={styles.title}>{title}</ThemedText>
      </View>
      {typeof message === "string" ? (
        <ThemedText style={[styles.description]}>{message}</ThemedText>
      ) : (
        message()
      )}
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        testID="confirmBtn"
        onPress={onPress}
        style={[styles.btn, confirmBtnStyle]}
        accessibilityRole="button"
        accessibilityHint=""
      >
        <ThemedText>
          {confirmBtnText ?? <ThemedText>Тийм</ThemedText>}
        </ThemedText>
      </TouchableOpacity>
      {onPressCancel === undefined ? null : (
        <TouchableOpacity
          testID="cancelBtn"
          onPress={onPressCancel}
          style={[styles.btnCancel]}
          accessibilityRole="button"
          accessibilityHint=""
        >
          <ThemedText>
            {cancelBtnText ?? <ThemedText>Үгүй</ThemedText>}
          </ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
    fontSize: 26,
    fontWeight: "600",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    padding: 14,
    marginTop: 22,
    marginHorizontal: 34,
    backgroundColor: "#ec4868",
  },
  btnCancel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    padding: 14,
    marginHorizontal: 34,
    marginTop: 10,
    backgroundColor: "#9D9EA1",
  },
  description: {
    textAlign: "center",
    paddingHorizontal: 22,
    color: "#9D9EA1",
    fontSize: 18,
  },
});
