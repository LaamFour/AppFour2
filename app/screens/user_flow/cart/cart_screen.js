import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Appbar, Button, Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "~/components";
import { removeAll, removeItem, selectCart } from "~/redux";
import { CartItem } from "./components";

export const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const cart = useSelector(selectCart);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleRemoveAll = () => {
    dispatch(removeAll());
  };

  const handleCheckout = () => {
    navigation.navigate("checkout");
  };

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <Appbar>
        <Appbar.Content title="Giỏ hàng" />
        <Appbar.Action icon="delete" onPress={handleRemoveAll} />
      </Appbar>
      <FlatList
        ListEmptyComponent={<Empty description="Giỏ hàng trống" />}
        data={cart}
        renderItem={({ item }) => (
          <CartItem data={item} onDelete={() => handleRemoveItem(item.id)} />
        )}
        contentContainerStyle={[
          cart.length === 0 ? styles.emptyStyle : { gap: 10 },
        ]}
        disableVirtualization={false}
      />

      {cart.length !== 0 && (
        <>
          <Divider />
          <Button
            onPress={handleCheckout}
            mode="contained-tonal"
            style={styles.button}
          >
            MUA
          </Button>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cartItem: {},
  button: {
    marginHorizontal: 16,
    marginBottom: 20,
    marginTop: 20,
  },
  emptyStyle: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
});
