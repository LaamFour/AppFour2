import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Appbar, Divider, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { orderService } from "~/services";
import { OrderItem } from "./components";
import { Empty } from "~/components";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();
export const MyOrdersScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [data, setData] = useState([]);

  const [hasCall, setHasCall] = useState(false);

  const getOrders = async () => {
    try {
      const response = await orderService.getOrdersHistory();
      if (response?.data) {
        setData(response.data);
      }
      setHasCall(true);
    } catch (error) {}
  };

  useEffect(() => {
    getOrders();
  }, []);

  const filterData = (status) => {
    return data?.filter((item) => item.status === status);
  };

  const goBack = () => navigation.goBack();

  const RenderScreen = ({ status }) => {
    return (
      <>
        <FlatList
          ListEmptyComponent={
            hasCall &&
            filterData(status)?.length === 0 && (
              <Empty description="Bạn chưa có đơn hàng nào cả!" />
            )
          }
          data={filterData(status)}
          renderItem={({ item }) => <OrderItem data={item} />}
          ItemSeparatorComponent={<Divider />}
        />
      </>
    );
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Appbar>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={"Đơn hàng của Tôi"} />
        </Appbar>
        <Tab.Navigator
          backBehavior="none"
          screenOptions={{
            tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
            tabBarActiveTintColor: theme.colors.primary,
            // tabBarScrollEnabled: true,
            // lazy: true,
          }}
          sceneContainerStyle={{}}
        >
          <Tab.Screen name={"Chờ xác nhận"}>
            {(props) => <RenderScreen status="pending" />}
          </Tab.Screen>
          <Tab.Screen name={"Chờ tài xế"}>
            {(props) => <RenderScreen status="waiting" />}
          </Tab.Screen>
          <Tab.Screen name={"Đang giao"}>
            {(props) => <RenderScreen status="delivering" />}
          </Tab.Screen>
          <Tab.Screen name={"Đã giao"}>
            {(props) => <RenderScreen status="completed" />}
          </Tab.Screen>
          <Tab.Screen name={"Đã huỷ"}>
            {(props) => <RenderScreen status="canceled" />}
          </Tab.Screen>
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
};