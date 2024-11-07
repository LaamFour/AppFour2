import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MapView, { Marker } from "react-native-maps";
import {
  Appbar,
  Button,
  Divider,
  HelperText,
  Switch,
  Text,
  TextInput,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useLoading } from "~/hooks";
import { addAddress } from "~/redux";
import { addressService } from "~/services";

export const AddNewAddressScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { showLoading, hideLoading } = useLoading();

  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const initialValues = {
    fullname: undefined,
    phone: undefined,
    specific_address: undefined,
  };

  const addressSchema = yup.object().shape({
    fullname: yup.string().required("Vui lòng nhập tên"),
    phone: yup.string().required("Vui lòng nhập số diện thoại"),
    phone: yup.string().required("Vui lòng nhập số diện thoại"),
    specific_address: yup.string().required("Vui lòng nhập địa chỉ chi tiết"),
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
    validationSchema: addressSchema,
    onSubmit: (values) => {
      handleOnSubmit();
    },
  });

  const handleOnSubmit = async () => {
    showLoading();
    try {
      const response = await addressService.createAddress({
        fullname: values.fullname,
        phone_number: values.phone,
        is_default: isSwitchOn,
        specific_address: values.specific_address,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      });
      hideLoading();
      if (response?.data) {
        Alert.alert("Thông báo", "Thêm địa chỉ thành công", [
          {
            text: "OK",
            onPress: () => {
              dispatch(addAddress(response?.data));
              navigation.goBack();
            },
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

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const goBack = () => navigation.goBack();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Quyền truy cập vị trí bị từ chối");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      setSelectedLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
    })();
  }, []);

  const handleSelectLocation = (event) => {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

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

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <Appbar>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={"Địa chỉ mới"} />
      </Appbar>
      <KeyboardAwareScrollView extraHeight={100} style={{ flex: 1 }}>
        <View style={styles.content}>
          <Text variant="bodyMedium">Thông tin</Text>
          <TextInput
            mode="outlined"
            label="Họ và tên"
            value={values.fullname}
            onChangeText={(text) => {
              setFieldTouched("fullname", true);
              setFieldValue("fullname", text);
            }}
            error={hasError("fullname")}
            returnKeyType="next"
            importantForAutofill="no"
            autoCapitalize="words"
            textContentType="oneTimeCode"
          />
          {renderHelperText("fullname")}
          <TextInput
            mode="outlined"
            label="Số điện thoại"
            value={values.phone}
            onChangeText={(text) => {
              setFieldTouched("phone", true);
              setFieldValue("phone", text);
            }}
            error={hasError("phone")}
            returnKeyType="next"
            importantForAutofill="no"
            textContentType="oneTimeCode"
            keyboardType="number-pad"
          />
          {renderHelperText("phone")}
          <Text variant="bodyMedium" style={styles.addressSection}>
            Địa chỉ
          </Text>
          <MapView
            initialRegion={location}
            onPress={handleSelectLocation}
            style={styles.mapView}
          >
            {selectedLocation && (
              <Marker
                title="Địa chỉ của bạn ở đây"
                coordinate={selectedLocation}
              />
            )}
          </MapView>
          <TextInput
            mode="outlined"
            multiline
            label="Địa chỉ chi tiết"
            value={values.specific_address}
            onChangeText={(text) => {
              setFieldTouched("specific_address", true);
              setFieldValue("specific_address", text);
            }}
            error={hasError("specific_address")}
            returnKeyType="next"
            importantForAutofill="no"
            textContentType="oneTimeCode"
          />
          {renderHelperText("specific_address")}
          <Divider style={styles.divider} />
          <View style={styles.defaultAddressView}>
            <Text>Đặt làm địa chỉ mặc định</Text>
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              style={styles.switch}
            />
          </View>
          <Button onPress={() => handleSubmit()} mode="contained-tonal">
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
  defaultAddressView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mapView: {
    flex: 1,
    backgroundColor: "red",
    height: 250,
    marginBottom: 12,
  },
  addressSection: {
    marginBottom: 8,
  },
  switch: {
    marginVertical: 12,
  },
  divider: {
    marginTop: 20,
  },
});
