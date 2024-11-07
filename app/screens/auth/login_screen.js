import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import React from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useLoading } from "~/hooks";
import { setUser } from "~/redux";
import { authService } from "~/services";

export const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { showLoading, hideLoading } = useLoading();

  const initialValues = {
    email: undefined,
    password: undefined,
  };

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Sai định dạng email")
      .required("Vui lòng nhập email"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
  });

  const {
    values,
    touched,
    errors,
    setFieldTouched,
    setFieldValue,
    handleBlur,
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      onSubmit();
    },
  });

  const emailError = !!(touched.email && errors.email);
  const passwordError = !!(touched.password && errors.password);

  const navigateToSignUp = () => {
    navigation.navigate("signUp");
  };

  const navigateToOtp = () => {
    Alert.alert("Thông báo", "Bạn chưa xác minh Email", [
      {
        text: "OK",
        onPress: () => navigation.navigate("otp", { email: values.email }),
      },
    ]);
  };

  const onSubmit = async () => {
    showLoading();
    try {
      const response = await authService.login(values.email, values.password);
      hideLoading();
      if (response) {
        dispatch(
          setUser({ ...response?.data, access_token: response?.access_token })
        );
      }
    } catch (error) {
      hideLoading();
      const errorCode = error?.response?.data?.error_code;

      const errorMessage = error?.response?.data?.error_message;
      if (errorCode === "auth/email-not-verified") return navigateToOtp();

      if (errorMessage) {
        alert(errorMessage);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView style={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>
          Đăng nhập
        </Text>
        <View style={styles.inputSpacing}>
          <TextInput
            mode="outlined"
            label="Email"
            value={values.email}
            onChangeText={(text) => {
              setFieldTouched("email", true);
              setFieldValue("email", text);
            }}
            error={emailError}
            keyboardType="email-address"
            returnKeyType="next"
            autoCapitalize="none"
            importantForAutofill="no"
            textContentType="oneTimeCode"
          />
          {emailError && (
            <HelperText type="error" visible={emailError}>
              {errors.email}
            </HelperText>
          )}
          <TextInput
            mode="outlined"
            label="Mật khẩu"
            value={values.password}
            onChangeText={(text) => {
              setFieldTouched("password", true);
              setFieldValue("password", text);
            }}
            error={passwordError}
            returnKeyType="done"
            secureTextEntry
            autoCapitalize="none"
            importantForAutofill="no"
            textContentType="oneTimeCode"
          />
          {passwordError && (
            <HelperText type="error" visible={passwordError}>
              {errors.password}
            </HelperText>
          )}
        </View>
        <Button
          onPress={() => handleSubmit()}
          mode="contained"
          style={styles.button}
        >
          ĐĂNG NHẬP
        </Button>
        <View style={styles.noAccountContainer}>
          <Text variant="labelMedium">Không có tài khoản?&nbsp;</Text>
          <Pressable onPress={navigateToSignUp}>
            <Text variant="labelMedium">Đăng ký</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    flex: 1,
  },
  title: {
    textAlign: "center",
    marginTop: 56,
    marginBottom: 24,
  },
  inputSpacing: {
    gap: 12,
  },
  button: {
    marginTop: 24,
  },
  noAccountContainer: {
    marginTop: 24,
    justifyContent: "center",
    flexDirection: "row",
  },
});
