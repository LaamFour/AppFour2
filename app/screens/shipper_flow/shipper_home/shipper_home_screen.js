import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { Button, Divider, Menu, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "~/components";
import { useLoading } from "~/hooks";
import { removeUser, selectUser } from "~/redux";
import { orderService } from "~/services";
import { OrderItem } from "./components";
import { Modalize } from "react-native-modalize";

const Tab = createMaterialTopTabNavigator();

export const ShipperHomeScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(selectUser);

  const { showLoading, hideLoading } = useLoading();
  const modalizeRef = useRef(null);

  const [currentId, setCurrentId] = useState();

  const onOpen = (item) => {
    setCurrentId(item.id);
    modalizeRef.current?.open();
  };

  const [data, setData] = useState([]);

  const [hasCall, setHasCall] = useState(false);

  const getOrders = async () => {
    try {
      const response = await orderService.getOrders();
      if (response?.data) {
        setData(response.data);
      }

      setHasCall(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const filterData = (status) => {
    return data?.filter((item) => item.status === status);
  };

  const onHandleConfirm = async (item) => {
    showLoading();
    try {
      const response = await orderService.updateOrder({
        id: item.id,
        status: "delivering",
      });
      hideLoading();
      getOrders();
    } catch (error) {
      hideLoading();
    }
  };

  const onHandleEdit = async (status) => {
    modalizeRef?.current?.close();
    showLoading();
    try {
      const response = await orderService.updateOrder({
        id: currentId,
        status: status,
      });
      hideLoading();
      getOrders();
    } catch (error) {
      hideLoading();
    }
  };

  const onDetail = (item) => {
    navigation.navigate("map", {
      item,
    });
  };

  const RenderScreen = ({ status }) => {
    return (
      <>
        <FlatList
          ListEmptyComponent={
            hasCall && filterData(status)?.length === 0 && <Empty />
          }
          data={filterData(status)}
          renderItem={({ item }) => (
            <OrderItem
              data={item}
              onConfirm={() => {
                onHandleConfirm(item);
              }}
              onEdit={() => {
                onOpen(item);
                // onHandleEdit(item);
              }}
              onDetail={() => {
                onDetail(item);
              }}
            />
          )}
          ItemSeparatorComponent={<Divider />}
        />
      </>
    );
  };

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

  const statusArray = [
    { key: "delivering", value: "Đang giao" },
    {
      key: "completed",
      value: "Đã giao",
    },
    {
      key: "canceled",
      value: "Đã huỷ",
    },
  ];

  return (
    <>
      <View
        style={{
          backgroundColor: theme.colors.primary,
          flex: 1,
        }}
      >
        <>
          <SafeAreaView style={styles.headerContent}>
            <View style={styles.infoRow}>
              <View>
                <Text variant="titleLarge" style={styles.title}>
                  Xin chào
                </Text>
                <Text variant="titleLarge" style={styles.fullname}>
                  {user?.fullname}
                </Text>
              </View>
            </View>
            <Button onPress={logout} mode="elevated">
              THOÁT
            </Button>
          </SafeAreaView>
        </>

        <View style={styles.content}>
          <Text variant="headlineSmall" style={styles.myJobs}>
            Công việc của tôi
          </Text>

          <Tab.Navigator
            backBehavior="none"
            screenOptions={{
              tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
              tabBarActiveTintColor: theme.colors.primary,
              tabBarScrollEnabled: true,
              // lazy: true,
            }}
            sceneContainerStyle={{}}
          >
            <Tab.Screen name={"Chờ xác nhận"}>
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
        </View>
      </View>
      <Modalize ref={modalizeRef} adjustToContentHeight>
        <View style={{ gap: 5, paddingTop: 10 }}>
          {statusArray.map((item) => (
            <Button onPress={() => onHandleEdit(item.key)}>{item.value}</Button>
          ))}
        </View>
        <SafeAreaView edges={["bottom"]} />
      </Modalize>
    </>
  );
};

const styles = StyleSheet.create({
  header: {},
  title: {
    color: "white",
    marginTop: 20,
  },
  headerContent: {
    marginHorizontal: 30,
    justifyContent: "space-between",
  },
  fullname: {
    color: "white",
    marginBottom: 24,
  },
  image: {},
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  myJobs: {
    marginHorizontal: 16,
    marginTop: 30,
  },
});
