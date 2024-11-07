import React, { useState, useEffect, useMemo } from "react";
import { View, StyleSheet, Alert, Linking } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Appbar, Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export const MapScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const route = useRoute();

  const item = route?.params?.item;

  const { latitude, longitude, specific_address } = item;

  const coordinates = useMemo(() => {
    return [
      { latitude: location?.latitude, longitude: location?.longitude },
      {
        latitude: latitude,
        longitude: longitude,
      },
    ];
  }, [location]);

  const minLat = Math.min(...coordinates.map((coord) => coord.latitude));
  const maxLat = Math.max(...coordinates.map((coord) => coord.latitude));
  const minLng = Math.min(...coordinates.map((coord) => coord.longitude));
  const maxLng = Math.max(...coordinates.map((coord) => coord.longitude));

  const latitudeDelta = maxLat - minLat + 0.01;
  const longitudeDelta = maxLng - minLng + 0.01;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        Alert.alert(
          "Permission Denied",
          "Enable location services to continue"
        );
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});

      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const goBack = () => navigation.goBack();

  const openMap = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    console.log(url);
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Địa chỉ cụ thể" />
      </Appbar>
      <View style={styles.container}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: (minLat + maxLat) / 2,
              longitude: (minLng + maxLng) / 2,
              latitudeDelta,
              longitudeDelta,
            }}
            showsUserLocation={true}
          >
            <Marker coordinate={location} title="Vị trí hiện tại" />
            <Polyline
              coordinates={coordinates}
              strokeColor="#0000FF"
              strokeWidth={3}
            />
          </MapView>
        ) : (
          <View style={styles.loadingContainer}>
            <Text>Loading...</Text>
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <>
          <Text>Địa chỉ nhận hàng</Text>
          <Text>{specific_address}</Text>
        </>
        <Button onPress={openMap} mode="contained-tonal">
          Xem trên bản đồ
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: { marginHorizontal: 20, marginVertical: 20, gap: 10 },
});
