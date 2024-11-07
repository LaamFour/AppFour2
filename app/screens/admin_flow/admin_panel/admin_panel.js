import React from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  Image,
  Alert,
} from "react-native";
import { Avatar, Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, selectUser } from "~/redux";
import { Item } from "./components";
import { useNavigation } from "@react-navigation/native";

export const AdminPanel = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(selectUser);

  const logout = () => {
    Alert.alert("Thông báo", "Bạn muốn thoát?", [
      {
        text: "Có",
        onPress: () => dispatch(removeUser()),
      },
      {
        text: "Không",
        style: "destructive",
      },
    ]);
  };

  const data = [
    {
      key: "products",
      label: "Sản phẩm",
      icon: "database-plus-outline",
      onPress: () => navigation.navigate("productManagement"),
    },
    {
      key: "orders",
      label: "Đơn hàng",
      icon: "cart-outline",
      onPress: () => navigation.navigate("orderManagement"),
    },
    {
      key: "statistical",
      label: "Thống kê",
      icon: "chart-bar",
      onPress: () => navigation.navigate("statistical"),
    },
    {
      key: "settings",
      label: "Cài đặt",
      icon: "application-cog-outline",
    },
  ];

  return (
    <>
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.primary,
          },
        ]}
      >
        <SafeAreaView style={styles.headerContent}>
          <View style={styles.infoRow}>
            <View>
              <Text variant="titleLarge" style={styles.title}>
                Admin Panel
              </Text>
              <Text variant="titleLarge" style={styles.fullname}>
                Chào mừng {user?.fullname}
              </Text>
            </View>
            <Avatar.Image
              size={50}
              source={{ uri: user?.picture }}
              style={styles.image}
            />
          </View>
          <Button onPress={logout} mode="elevated">
            THOÁT
          </Button>
        </SafeAreaView>
      </View>
      <FlatList
        numColumns={2}
        data={data}
        renderItem={({ item }) => <Item data={item} onPress={item?.onPress} />}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{
          gap: 10,
          marginHorizontal: 16,
          marginVertical: 16,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: Dimensions.get("window").height * 0.24,
  },
  title: {
    color: "white",
    marginTop: 20,
  },
  headerContent: {
    marginHorizontal: 30,
    justifyContent: "space-between",
    height: Dimensions.get("window").height * 0.24,
  },
  fullname: {
    color: "white",
  },
  image: {},
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
