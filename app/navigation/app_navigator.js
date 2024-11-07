import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import { selectRole } from "~/redux";
import {
  AddNewAddressScreen,
  AddProductScreen,
  AdminPanel,
  CheckoutScreen,
  LoginScreen,
  MapScreen,
  MyOrdersScreen,
  OrderManagementScreen,
  OtpScreen,
  ProductManagementScreen,
  ShipperHomeScreen,
  SignUpScreen,
  StatisticalScreen,
  UserAddressScreen,
} from "~/screens";
import { HomeTabs } from "./home_tabs_navigator";
import { navigationRef } from "./navigation_utils";
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

export const AppNavigator = () => {
  const theme = useTheme();

  const role = useSelector(selectRole);

  const getInitialRouteName = () => {
    if (!role) return "login";
    if (role === "customer") return "homeTabs";
    if (role === "admin") return "adminPanel";
    if (role === "delivery-staff") return "shipperHome";
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        colors: {
          background: theme.colors.surface,
        },
      }}
    >
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName={getInitialRouteName()}
      >
        {!role && (
          <>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="signUp" component={SignUpScreen} />
          </>
        )}
        {role === "customer" && (
          <>
            <Stack.Screen name="homeTabs" component={HomeTabs} />
            <Stack.Screen name="checkout" component={CheckoutScreen} />
            <Stack.Screen name="userAddress" component={UserAddressScreen} />
            <Stack.Screen
              name="addNewAddress"
              component={AddNewAddressScreen}
            />
            <Stack.Screen name="myOrders" component={MyOrdersScreen} />
          </>
        )}
        {role === "admin" && (
          <>
            <Stack.Screen name="adminPanel" component={AdminPanel} />
            <Stack.Screen name="addProduct" component={AddProductScreen} />
            <Stack.Screen
              name="productManagement"
              component={ProductManagementScreen}
            />
            <Stack.Screen
              name="orderManagement"
              component={OrderManagementScreen}
            />
            <Stack.Screen name="statistical" component={StatisticalScreen} />
          </>
        )}
        {role === "delivery-staff" && (
          <>
            <Stack.Screen name="shipperHome" component={ShipperHomeScreen} />
            <Stack.Screen name="addProduct" component={AddProductScreen} />
            <Stack.Screen
              name="productManagement"
              component={ProductManagementScreen}
            />
            <Stack.Screen
              name="orderManagement"
              component={OrderManagementScreen}
            />
            <Stack.Screen name="statistical" component={StatisticalScreen} />
            <Stack.Screen name="map" component={MapScreen} />
          </>
        )}
        <Stack.Screen name="otp" component={OtpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
