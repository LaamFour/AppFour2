import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "~/consts";

export const LoadingView = () => {
  return (
    <Modal transparent>
      <View style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backdrop,
    flex: 1,
  },
  content: {
    padding: 30,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
