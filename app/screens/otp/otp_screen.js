import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Keyboard, StyleSheet, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { Appbar, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { OtpVerifiedSVG } from "~/assets";
import { useLoading } from "~/hooks";
import { authService } from "~/services";

export const OtpScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();
  const { showLoading, hideLoading } = useLoading();

  const { params } = route;

  const email = params?.email;

  const [code, setCode] = useState();

  const goBack = () => {
    navigation.goBack();
  };

  const handleVerifyEmail = async () => {
    Keyboard.dismiss();
    showLoading();
    try {
      const response = await authService.verifyEmail(email, code);
      hideLoading(500);
      if (response) {
        Alert.alert("Thông báo", "Xác minh OTP thành công", [
          { text: "OK", onPress: () => navigation.navigate("login") },
        ]);
      }
    } catch (error) {
      hideLoading(500);
      const errorMessage = error?.response?.data?.error_message;
      if (errorMessage) {
        alert(errorMessage);
      }
    }
  };

  useEffect(() => {
    if (code?.length === 6) {
      handleVerifyEmail();
    }
  }, [code]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={"Xác thực mã OTP"} />
      </Appbar>
      <View style={styles.textContentWrapper}>
        <OtpVerifiedSVG />
        <Text variant="titleLarge" style={styles.title}>
          Nhập mã xác thực OTP
        </Text>
        <Text>Mã đã được gửi về email đăng ký của bạn</Text>
        <OtpInput
          autoFocus
          numberOfDigits={6}
          focusColor={theme.colors.primary}
          focusStickBlinkingDuration={500}
          onTextChange={(text) => setCode(text)}
          textInputProps={{
            accessibilityLabel: "One-Time Password",
          }}
          theme={{
            containerStyle: styles.otpInput,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textContentWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  title: {
    marginBottom: 8,
    marginTop: 20,
  },
  otpInput: {
    marginTop: 20,
    width: "90%",
  },
  image: {
    width: 200,
    height: 200,
  },
});
