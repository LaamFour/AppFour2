import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import { currencyFormat } from "~/utils";

const IMAGE_SIZE = 80;

export const ProductItem = ({ data, onDelete }) => {
  const theme = useTheme();

  const navigation = useNavigation();
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
          <Text numberOfLines={1} variant="bodyMedium">
            {data?.description}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text variant="bodyMedium">
              {data?.price && currencyFormat(data?.price)}
            </Text>
          </View>
        </View>
        <IconButton icon="dots-vertical" size={20} onPress={onDelete} />
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
    flex: 1,
  },
});
