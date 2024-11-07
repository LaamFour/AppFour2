import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import React from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Appbar,
  Button,
  HelperText,
  Text,
  TextInput,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useLoading } from "~/hooks";
import { authService } from "~/services";

export const SignUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { showLoading, hideLoading } = useLoading();

  const initialValues = {
    email: undefined,
    password: undefined,
    fullname: undefined,
  };

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Sai định dạng email")
      .required("Vui lòng nhập email"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
    fullname: yup.string().required("Vui lòng nhập tên"),
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
  const fullnameError = !!(touched.fullname && errors.fullname);

  const goBack = () => {
    navigation.navigate("login");
  };

  const onSubmit = async () => {
    showLoading();
    try {
      const response = await authService.signUp(
        values.fullname,
        values.email,
        values.password
      );
      hideLoading();
      if (response?.data) {
        Alert.alert("Thông báo", "Đăng ký thành công", [
          {
            text: "OK",
            onPress: () => navigation.navigate("otp", { email: values.email }),
          },
        ]);
      }
    } catch (error) {
      hideLoading();
      const errorMessage = error?.response?.data?.error_message;

      if (errorMessage) {
        alert(errorMessage);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar>
        <Appbar.BackAction onPress={goBack} />
      </Appbar>
      <KeyboardAwareScrollView style={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>
          Đăng ký
        </Text>
        <View style={styles.inputSpacing}>
          <TextInput
            mode="outlined"
            label="Tên"
            value={values.fullname}
            onChangeText={(text) => {
              setFieldTouched("fullname", true);
              setFieldValue("fullname", text);
            }}
            error={fullnameError}
            returnKeyType="next"
            autoCapitalize="words"
            importantForAutofill="no"
            textContentType="oneTimeCode"
          />
          {fullnameError && (
            <HelperText type="error" visible={fullnameError}>
              {errors.fullname}
            </HelperText>
          )}
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
          ĐĂNG KÝ
        </Button>
        <View style={styles.noAccountContainer}>
          <Text variant="labelMedium">Đã có tài khoản?&nbsp;</Text>
          <Pressable onPress={goBack}>
            <Text variant="labelMedium">Đăng nhập</Text>
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
