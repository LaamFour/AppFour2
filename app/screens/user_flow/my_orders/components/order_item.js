import moment from "moment";
import React from "react";
import { FlatList, StyleSheet, View, Image } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";
import { colors, orderStatus } from "~/consts";
import { currencyFormat } from "~/utils";

export const OrderItem = ({ data, onPress }) => {
  console.log(data);
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.elevation.level3,
        },
      ]}
    >
      <View style={styles.codeWrap}>
        <Text>Đơn hàng: #{data.id}</Text>
        <Text style={{ color: colors.success }}>
          {orderStatus[data.status]}
        </Text>
      </View>
      <Text>
        Tổng tiền: &nbsp;
        <Text variant="bodyLarge" style={{ color: "red" }}>
          {currencyFormat(data?.total_price)}
        </Text>
      </Text>
      <Text>
        Ngày đặt, {moment(data?.created_at).format("DD/MM/YYYY hh:mm")}
      </Text>
      <FlatList
        data={data?.order_items}
        renderItem={({ item }) => {
          const product = item?.product;
          return (
            <View style={styles.item}>
              <Image source={{ uri: product?.image }} style={styles.image} />
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text>{product?.name}</Text>
                <Text>{currencyFormat(product?.price)}</Text>
              </View>
              <View style={styles.amountWrap}>
                <Text>(x{item?.quantity})</Text>
                <Text>{currencyFormat(product?.price * item?.quantity)}</Text>
              </View>
            </View>
          );
        }}
        ItemSeparatorComponent={<View style={styles.divider} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    gap: 5,
    flex: 1,
  },
  codeWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  item: {
    flexDirection: "row",
    gap: 10,
  },
  amountWrap: {
    gap: 4,
    alignItems: "flex-end",
  },
  divider: {
    marginBottom: 12,
  },
});
