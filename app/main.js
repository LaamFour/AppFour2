import { PortalProvider } from "@gorhom/portal";
import React from "react";
import { StyleSheet } from "react-native";
import FlashMessage from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useSelector, useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { LoadingView } from "~/components";
import { AppNavigator } from "~/navigation";
import { persistor, selectLoading, store } from "~/redux";
import { injectStore } from "./services";
import { StatusBar } from "expo-status-bar";
import { useLoading } from "./hooks";

const App = () => {
  const isLoading = useSelector(selectLoading);
  const { showLoading, hideLoading } = useLoading();

  return (
    <>
      {isLoading && <LoadingView />}
      <StatusBar style="dark" />
      <AppNavigator />
    </>
  );
};

const Main = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate
          loading={<LoadingView />}
          persistor={persistor}
          onBeforeLift={() => {
            // injectStore(store);
          }}
        >
          <GestureHandlerRootView style={styles.container}>
            <SafeAreaProvider>
              <PortalProvider>
                <PaperProvider>
                  <App />
                  <FlashMessage position="bottom" />
                </PaperProvider>
              </PortalProvider>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Main;
