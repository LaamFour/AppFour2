import { useNavigation, useRoute } from "@react-navigation/native";
import _ from "lodash";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Appbar, Button, Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "~/components";
import { useLoading } from "~/hooks";
import {
  getAddresses,
  selectAddresses,
  selectGetDefaultAddress,
  setDefaultAddress,
} from "~/redux";
import { AddressItem } from "./components";

export const UserAddressScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { params } = route;

  const { showLoading, hideLoading } = useLoading();
  const dispatch = useDispatch();

  const isCheckout = params?.isCheckout;

  const addresses = useSelector(selectAddresses);

  const address = useSelector(selectGetDefaultAddress);

  const goBack = () => navigation.goBack();

  const navigateToAddNewAddress = () => {
    navigation.navigate("addNewAddress");
  };

  const refreshData = () => {
    dispatch(getAddresses());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const onChangeAddressPrimary = (item) => {
    dispatch(setDefaultAddress(item));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content
          title={isCheckout ? "Chọn địa chỉ nhận hàng" : "Địa chỉ của Tôi"}
        />
      </Appbar>
      <FlatList
        data={_.sortBy(addresses, (item) => !item?.is_default)}
        ListEmptyComponent={Empty}
        renderItem={({ item }) => (
          <AddressItem
            data={item}
            hasSelected={isCheckout}
            checked={item.id === address.id}
            onPress={() => {
              onChangeAddressPrimary(item);
            }}
          />
        )}
        ItemSeparatorComponent={<Divider />}
        ListFooterComponent={
          <View style={styles.listFooter}>
            <Button onPress={navigateToAddNewAddress} icon="plus">
              Thêm địa chỉ mới
            </Button>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listFooter: {
    marginTop: 12,
  },
});
