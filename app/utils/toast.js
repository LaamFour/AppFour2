import { Pressable, View } from "react-native";

import { hideMessage, showMessage as show } from "react-native-flash-message";
import { Icon, Text } from "react-native-paper";
import { navigate } from "~/navigation";

export const toast = (msg) => {
  show({
    message: msg,
    type: "none",
    titleStyle: {
      textAlign: "center",
    },
    textStyle: {
      textAlign: "center",
    },
  });
};

export const showToastAddToCart = () => {
  return show({
    message: "",
    duration: 5000,
    type: "info",
    animated: false,
    titleStyle: {},
    style: {
      alignSelf: "center",
      backgroundColor: "transparent",
      marginBottom: -5,
    },
    onPress: () => {},

    renderCustomContent: () => {
      return (
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.65)",
            flexDirection: "row",
            borderRadius: 20,
            marginBottom: 50,
          }}
        >
          <Text
            style={{
              color: "white",
              paddingLeft: 12,
              paddingVertical: 10,
            }}
          >
            Đã thêm vào giỏ hàng &nbsp;&nbsp; |
          </Text>
          <Pressable
            onPress={() => {
              navigate("cart");
              hideMessage();
            }}
            style={{
              flexDirection: "row",
              paddingHorizontal: 12,
              paddingVertical: 10,
            }}
          >
            <Icon source="cart" color={"white"} size={20} />
            <Text style={{ color: "white" }}>&nbsp;Xem</Text>
          </Pressable>
        </View>
      );
    },
  });
};
