import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Appbar, Button, Divider, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useLoading } from "~/hooks";
import {
  removeAll,
  selectCart,
  selectCartTotalAmount,
  selectGetDefaultAddress,
  selectNumCart,
  setPrimaryAddress,
} from "~/redux";
import { orderService } from "~/services";
import { currencyFormat } from "~/utils";
import { AddressItem } from "./component";

export const CheckoutScreen = () => {
  const navigation = useNavigation();
  const { showLoading, hideLoading } = useLoading();
  const dispatch = useDispatch();

  const address = useSelector(selectGetDefaultAddress);
  const numCart = useSelector(selectNumCart);

  const cart = useSelector(selectCart);

  const totalAmount = useSelector(selectCartTotalAmount);

  const goBack = () => {
    navigation.goBack();
  };

  const navigateToUserAddress = () => {
    navigation.navigate("userAddress", {
      isCheckout: true,
      addressId: address.id,
    });
  };

  const handleCheckoutSuccess = () => {
    navigation.goBack();
    dispatch(removeAll());
    dispatch(setPrimaryAddress());
  };

  const handleCheckout = async () => {
    showLoading();
    try {
      const addressObj = _.pick(address, [
        "fullname",
        "phone_number",
        "specific_address",
        "latitude",
        "longitude",
      ]);
      const cartItems = cart?.map(({ id, quantity }) => ({
        product_id: id,
        quantity,
      }));

      const response = await orderService.createOrder({
        items: cartItems,
        address: addressObj,
      });
      hideLoading();
      if (response) {
        Alert.alert("Thông báo", "Bạn đã đặt hàng thành công", [
          {
            text: "OK",
            onPress: () => handleCheckoutSuccess(),
          },
        ]);
      }
    } catch (error) {
      hideLoading();
      const errorMessage = error?.response?.data?.error_message;
      if (errorMessage) {
        alert(errorMessage);
      }
    }
  };

  const onPressCheckout = () => {
    if (!address) {
      alert("Vui lòng thêm địa chỉ trước");
    } else {
      handleCheckout();
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Appbar>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title="Thanh toán" />
        </Appbar>
        {address ? (
          <AddressItem data={address} onPress={navigateToUserAddress} />
        ) : (
          <Button
            icon={"plus"}
            style={styles.noAddressBtn}
            onPress={navigateToUserAddress}
          >
            Bạn chưa có địa chỉ, thêm ngay
          </Button>
        )}
      </SafeAreaView>
      <Divider />
      <View style={styles.currencyWrap}>
        <Text>Tống số tiền ({numCart}) sản phẩm:</Text>
        {totalAmount && (
          <Text variant="titleLarge">{currencyFormat(totalAmount)}</Text>
        )}
      </View>
      <Button
        onPress={onPressCheckout}
        mode="contained-tonal"
        uppercase
        style={styles.btn}
      >
        Thanh toán
      </Button>
      <SafeAreaView edges={["bottom"]} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  noAddressBtn: {
    marginTop: 12,
  },
  btn: {
    marginHorizontal: 16,
  },
  currencyWrap: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
