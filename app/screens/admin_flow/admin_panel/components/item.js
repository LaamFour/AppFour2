import React from "react";
import { StyleSheet, Text } from "react-native";
import { Card, Icon } from "react-native-paper";

export const Item = ({ data, onPress, gap }) => {
  return (
    <Card onPress={onPress} style={[styles.container]}>
      <Icon size={48} source={data.icon} />
      <Text>{data.label}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 20,
  },
});
