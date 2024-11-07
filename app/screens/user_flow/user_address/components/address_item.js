import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Chip, Icon, Text, useTheme } from "react-native-paper";

export const AddressItem = ({ data, onPress, hasSelected, checked }) => {
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
        {hasSelected && (
          <>
            <Icon
              source={!checked ? "radiobox-blank" : "radiobox-marked"}
              color={checked ? theme.colors.primary : undefined}
              size={20}
            />
          </>
        )}
        <View style={{ flex: 1 }}>
          <Text variant="titleSmall">{data?.fullname}</Text>
          <Text>{data?.phone_number}</Text>
          <Text>{data?.specific_address}</Text>
          <View style={styles.chipWrap}>
            {data?.is_default && (
              <Chip
                textStyle={{ flexWrap: "wrap" }}
                mode="outlined"
                selected
                selectedColor={theme.colors.primary}
              >
                Mặc định
              </Chip>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    gap: 5,
    flexDirection: "row",
    flex: 1,
  },
  chipWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
