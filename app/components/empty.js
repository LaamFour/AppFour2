import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { NoDataSVG } from "~/assets";

export const Empty = ({ style, description }) => {
  return (
    <View style={[styles.container, style]}>
      <NoDataSVG />
      <Text style={styles.text}>{description ?? "Không có dữ liệu"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    textAlign: "center",
  },
});
