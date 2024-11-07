import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Appbar, FAB } from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { productService } from "~/services";
import { ProductItem } from "./components";

export const ProductManagementScreen = () => {
  const navigation = useNavigation();

  const insets = useSafeAreaInsets();

  const [products, setProducts] = useState([]);

  const goBack = () => navigation.goBack();

  const fetchProducts = async () => {
    try {
      const response = await productService.getProducts();
      const data = response?.data;
      if (data) {
        setProducts(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchProducts();
    });

    return unsubscribe;
  }, [navigation]);

  const navigateToAddProduct = () => {
    navigation.navigate("addProduct");
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Appbar>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={"Quản lý sản phẩm"} />
        </Appbar>
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductItem data={item} />}
          contentContainerStyle={styles.contentContainer}
        />
      </SafeAreaView>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigateToAddProduct()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 40,
  },
  contentContainer: {
    gap: 12,
    flex: 1,
  },
});
