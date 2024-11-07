import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Appbar, Button, HelperText, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import { useLoading } from "~/hooks";
import { productService } from "~/services";

export const AddProductScreen = () => {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  const { showLoading, hideLoading } = useLoading();

  const initialValues = {
    name: undefined,
    description: undefined,
    import_price: undefined,
    price: undefined,
    promotional_price: undefined,
    quantity: undefined,
    image: undefined,
  };

  const addProductSchema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên"),
    description: yup.string().required("Vui lòng nhập mô tả"),
    import_price: yup.number().required("Vui lòng nhập giá nhập"),
    price: yup.string().required("Vui lòng nhập giá bán"),
    promotional_price: yup.string().required("Vui lòng giá khuyến mãi"),
    quantity: yup.string().required("Vui lòng nhập số lượng"),
    image: yup
      .string()
      // .url("Phải là liên kết hợp lệ")
      .required("Vui lòng nhập link image"),
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
    validationSchema: addProductSchema,
    onSubmit: (values) => {
      handleOnSubmit();
    },
  });

  const hasError = (name) => {
    return !!(touched[name] && errors[name]);
  };

  const renderHelperText = (name) => {
    return (
      <>
        {hasError(name) ? (
          <HelperText type="error" visible={hasError(name)}>
            {errors[name]}
          </HelperText>
        ) : (
          <View style={styles.inputSpacing} />
        )}
      </>
    );
  };

  const handleOnSubmit = async () => {
    showLoading();
    try {
      const response = await productService.createProduct({
        name: values.name,
        description: values.description,
        import_price: Number(values.import_price),
        price: Number(values.price),
        promotional_price: Number(values.promotional_price),
        quantity: Number(values.quantity),
        image: values.image,
      });
      hideLoading();
      if (response?.data) {
        Alert.alert("Thông báo", "Thêm sản phẩm thành công", [
          {
            text: "OK",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      }
    } catch (error) {
      hideLoading();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={"Thêm sản phẩm"} />
      </Appbar>
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={styles.content}>
          <TextInput
            mode="outlined"
            label="Tên"
            value={values.name}
            onChangeText={(text) => {
              setFieldTouched("name", true);
              setFieldValue("name", text);
            }}
            error={hasError("name")}
            returnKeyType="next"
            importantForAutofill="no"
            autoCapitalize="sentences"
            textContentType="oneTimeCode"
          />
          {renderHelperText("name")}
          <TextInput
            multiline
            mode="outlined"
            label="Mô tả"
            value={values.description}
            onChangeText={(text) => {
              setFieldTouched("description", true);
              setFieldValue("description", text);
            }}
            error={hasError("description")}
            returnKeyType="next"
            importantForAutofill="no"
            autoCapitalize="sentences"
            textContentType="oneTimeCode"
          />
          {renderHelperText("description")}
          <TextInput
            multiline
            mode="outlined"
            label="Giá nhập"
            value={values.import_price}
            onChangeText={(text) => {
              setFieldTouched("import_price", true);
              setFieldValue("import_price", text);
            }}
            error={hasError("import_price")}
            returnKeyType="next"
            importantForAutofill="no"
            textContentType="oneTimeCode"
            keyboardType="number-pad"
          />
          {renderHelperText("import_price")}
          <TextInput
            multiline
            mode="outlined"
            label="Giá bán"
            value={values.price}
            onChangeText={(text) => {
              setFieldTouched("price", true);
              setFieldValue("price", text);
            }}
            error={hasError("price")}
            returnKeyType="next"
            importantForAutofill="no"
            textContentType="oneTimeCode"
            keyboardType="number-pad"
          />
          {renderHelperText("price")}
          <TextInput
            multiline
            mode="outlined"
            label="Giá khuyến mãi"
            value={values.promotional_price}
            onChangeText={(text) => {
              setFieldTouched("promotional_price", true);
              setFieldValue("promotional_price", text);
            }}
            error={hasError("promotional_price")}
            returnKeyType="next"
            importantForAutofill="no"
            textContentType="oneTimeCode"
            keyboardType="number-pad"
          />
          {renderHelperText("promotional_price")}
          <TextInput
            multiline
            mode="outlined"
            label="Số lượng"
            value={values.quantity}
            onChangeText={(text) => {
              setFieldTouched("quantity", true);
              setFieldValue("quantity", text);
            }}
            error={hasError("quantity")}
            returnKeyType="next"
            importantForAutofill="no"
            textContentType="oneTimeCode"
            keyboardType="number-pad"
          />
          {renderHelperText("quantity")}
          <TextInput
            multiline
            mode="outlined"
            label="Link ảnh"
            value={values.image}
            onChangeText={(text) => {
              setFieldTouched("image", true);
              setFieldValue("image", text);
            }}
            error={hasError("image")}
            returnKeyType="next"
            importantForAutofill="no"
            textContentType="oneTimeCode"
            autoCapitalize="none"
          />
          {renderHelperText("image")}

          <Button
            onPress={() => {
              handleSubmit();
            }}
            mode="contained-tonal"
            style={styles.btn}
          >
            THÊM
          </Button>
          <SafeAreaView edges={["bottom"]} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
  },
  inputSpacing: {
    marginBottom: 8,
  },
  btn: {
    marginTop: 20,
  },
});
