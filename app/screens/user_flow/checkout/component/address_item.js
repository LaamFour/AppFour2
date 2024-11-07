import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

export const AddressItem = ({ data, onPress }) => {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.elevation.level3,
          },
        ]}
      >
        <Icon
          source="map-marker-radius-outline"
          size={20}
          color={theme.colors.primary}
        />
        <View style={styles.content}>
          <Text>Địa chỉ nhận hàng</Text>
          <Text variant="titleSmall">{data?.fullname}</Text>
          <Text>{data?.phone_number}</Text>
          <Text>{data?.specific_address}</Text>
          <View style={styles.chipWrap}></View>
        </View>
        <Icon
          source="chevron-right"
          size={16}
          color={theme.colors.outline}
          style={styles.next}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    gap: 5,
    marginHorizontal: 10,
  },
  chipWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  next: {},
});
