import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { BarChart } from "react-native-gifted-charts";
import { Appbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { orderService } from "~/services";

function calculateMonthlyRevenueAndProfit(data) {
  const monthlyData = {};
  for (let month = 1; month <= 12; month++) {
    const monthKey = `2024-${month.toString().padStart(2, "0")}`;
    monthlyData[monthKey] = { revenue: 0, profit: 0 };
  }

  data.forEach((entry) => {
    entry.order_items.forEach((item) => {
      const itemDate = new Date(item.created_at);
      if (itemDate.getFullYear() === 2024) {
        const month = itemDate.getMonth() + 1;
        const monthKey = `2024-${month.toString().padStart(2, "0")}`;

        const revenue = item.quantity * item.price;
        const profit = item.quantity * (item.price - item.import_price);

        monthlyData[monthKey].revenue += revenue;
        monthlyData[monthKey].profit += profit;
      }
    });
  });

  const result = [];
  Object.keys(monthlyData).forEach((month) => {
    const { revenue, profit } = monthlyData[month];

    result.push({
      value: profit / 1000,
      label: month.slice(-2),
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: profitColor,
    });

    result.push({
      value: revenue / 1000,
      frontColor: revenueColor,
    });
  });

  return result;
}

const profitColor = "#177AD5";

const revenueColor = "#ED6665";

export const StatisticalScreen = () => {
  const [barData, setBarData] = useState([]);
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const getData = async () => {
    try {
      const response = await orderService.getEvenueProfit();
      if (response?.data) {
        const data = response.data;
        setBarData(calculateMonthlyRevenueAndProfit(data));
      }
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView>
      <Appbar>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={"Thống kê"} />
      </Appbar>
      <BarChart data={barData} />
      <View style={styles.boxWrap}>
        <View style={styles.row}>
          <View style={styles.box} />
          <Text>Lợi nhuận</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.box2} />
          <Text>Doanh thu</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginVertical: 5,
  },
  box: {
    width: 50,
    height: 20,
    backgroundColor: profitColor,
  },
  box2: {
    width: 50,
    height: 20,
    backgroundColor: revenueColor,
  },
  boxWrap: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});
