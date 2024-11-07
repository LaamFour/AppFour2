import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Card, IconButton, Text, useTheme } from "react-native-paper";
import { currencyFormat } from "~/utils";
const IMAGE_SIZE = Dimensions.get("window").width * 0.25;

export const ProductItem = ({ product, onPress, gap }) => {
  const theme = useTheme();

  const width = Dimensions.get("window").width / 2 - gap * 2.5;
  return (
    <Card
      style={[
        styles.container,
        {
          width: width,
        },
      ]}
    >
      <Card.Content>
        <Image
          source={{
            uri: product?.image,
          }}
          style={styles.image}
        />
        <Text variant="titleMedium" numberOfLines={1}>
          {product?.name}
        </Text>
        <Text variant="bodyMedium" numberOfLines={1}>
          {product?.description}
        </Text>
        <View style={styles.footer}>
          <Text
            variant="bodyLarge"
            numberOfLines={1}
            style={{ color: theme.colors.primary }}
          >
            {product?.price && currencyFormat(product.price)}
          </Text>
          <IconButton
            onPress={onPress}
            icon="plus"
            size={20}
            iconColor={theme.colors.primary}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: "center" },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    alignSelf: "center",
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
