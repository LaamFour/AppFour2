import moment from "moment";
import React from "react";
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { currencyFormat } from "~/utils";

export const OrderItem = ({ data, onConfirm, onEdit, onDetail }) => {
  const theme = useTheme();

  return (
    <Pressable onPress={onDetail}>
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
          {data?.status == "waiting" && (
            <Button onPress={onConfirm}>Xác nhận</Button>
          )}
          {data?.status !== "waiting" && data?.status !== "cancel" && (
            <Button onPress={onEdit}>Sửa</Button>
          )}
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
                  <Text>{currencyFormat(item?.price * item?.quantity)}</Text>
                </View>
              </View>
            );
          }}
          ItemSeparatorComponent={<View style={styles.divider} />}
        />
      </View>
    </Pressable>
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
