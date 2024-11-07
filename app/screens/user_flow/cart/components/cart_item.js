import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import { currencyFormat } from "~/utils";

const IMAGE_SIZE = 80;

export const CartItem = ({ data, onDelete }) => {
  const theme = useTheme();
  return (
    <>
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.elevation.level3 },
        ]}
      >
        <Image style={styles.image} source={{ uri: data?.image }} />
        <View style={styles.content}>
          <Text variant="titleMedium">{data?.name}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text variant="bodyMedium">
              {data?.price && currencyFormat(data?.price)}
            </Text>
            <Text>{`(x${data?.quantity})`}</Text>
          </View>
        </View>
        <IconButton icon="close" size={20} onPress={onDelete} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    flexDirection: "row",
    borderRadius: 12,
    alignItems: "center",
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 12,
  },
  content: {
    marginLeft: 16,
    justifyContent: "center",
    gap: 12,
    flex: 1,
  },
});
