import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { Empty } from "~/components";
import { useLoading } from "~/hooks";
import { addToCart } from "~/redux";
import { productService } from "~/services";
import { showToastAddToCart } from "~/utils";
import { ProductItem } from "./components";

const ITEM_GAP = 8;

export const HomeScreen = () => {
  const { showLoading, hideLoading } = useLoading();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState();
  const [noData, setNoData] = useState(false);

  const fetchProducts = async (search) => {
    if (search?.trim()?.length !== 0) {
      try {
        const response = await productService.searchProduct(search);

        const data = response?.data;

        if (data?.length === 0) {
          setNoData(true);
        } else {
          setNoData(false);
        }
        if (data) setProducts(data);
      } catch (error) {}
    } else {
      try {
        const response = await productService.getProducts();

        const data = response?.data;
        if (data) setProducts(data);
      } catch (error) {}
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleItemPress = (item) => {
    dispatch(addToCart(item));
    showToastAddToCart();
  };

  const handleDebounceFn = (text) => {
    setSearch(text);
    fetchProducts(text);
  };

  const debounceFn = useCallback(_.debounce(handleDebounceFn, 500), []);

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <Text variant="headlineSmall" style={styles.title}>
        Thức ăn ngon sẵn sàng{"\n"} giao đến bạn
      </Text>
      <Searchbar
        // value={search}
        onChangeText={(text) => {
          debounceFn(text);
        }}
        placeholder="Tìm kiếm..."
        style={styles.searchBar}
      />
      <FlatList
        ListEmptyComponent={noData ? <Empty /> : null}
        style={styles.list}
        numColumns={2}
        data={products}
        renderItem={({ item }) => (
          <ProductItem
            gap={ITEM_GAP}
            product={item}
            onPress={() => {
              handleItemPress(item);
            }}
          />
        )}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.listColumnWrapper}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  searchBar: {
    marginHorizontal: 16,
  },

  listContainer: {
    gap: ITEM_GAP,
    paddingTop: 24,
    paddingBottom: 24,
  },
  listColumnWrapper: {
    gap: ITEM_GAP,
  },
  list: {
    paddingHorizontal: 16,
  },
});
