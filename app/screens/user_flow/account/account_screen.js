import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  Appbar,
  Avatar,
  Button,
  Dialog,
  List,
  Portal,
  Text,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { removeAll, removeAllAddress, removeUser, selectUser } from "~/redux";

export const AccountScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector(selectUser);

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const navigateToUserInfo = () => {};

  const handleLogout = () => {
    hideDialog();
    dispatch(removeUser());
    dispatch(removeAll());
    dispatch(removeAllAddress());
  };

  const navigateToUserAddress = () => {
    navigation.navigate("userAddress");
  };

  const navigateToOrder = () => {
    navigation.navigate("myOrders");
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Appbar>
          <Appbar.Content title={"Cá nhân"} />
          <Appbar.Action icon="segment" onPress={() => {}} />
        </Appbar>
        <Pressable
          onPress={navigateToUserInfo}
          style={styles.userInfoContainer}
        >
          <Avatar.Icon size={48} icon="account" style={styles.avatar} />
          <View style={styles.infoView}>
            <Text>{user?.fullname}</Text>
            <Text>{user?.email}</Text>
          </View>
        </Pressable>
        <List.Section>
          <List.Subheader>Tài khoản</List.Subheader>
          <List.Item
            title="Thông tin cá nhân"
            left={(props) => <List.Icon {...props} icon="account" />}
            onPress={navigateToUserInfo}
          />
          <List.Item
            title="Địa chỉ"
            left={(props) => (
              <List.Icon {...props} icon="map-marker-multiple-outline" />
            )}
            onPress={navigateToUserAddress}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>Đơn mua</List.Subheader>
          <List.Item
            title="Đơn hàng của bạn"
            left={(props) => (
              <List.Icon {...props} icon="format-list-bulleted" />
            )}
            onPress={navigateToOrder}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>Hỗ trợ</List.Subheader>
          <List.Item
            title="Trung tâm trợ giúp"
            left={(props) => (
              <List.Icon {...props} icon="alert-circle-outline" />
            )}
          />
        </List.Section>
        <Button
          onPress={showDialog}
          mode="contained-tonal"
          style={styles.button}
        >
          Đăng xuất
        </Button>
      </SafeAreaView>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Thông báo</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Bạn có muốn đăng xuất?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleLogout}>Ok</Button>
            <Button onPress={hideDialog}>Hủy</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
  },
  infoView: {
    marginLeft: 24,
    justifyContent: "center",
    gap: 6,
  },
  button: {
    marginHorizontal: 16,
  },
});
