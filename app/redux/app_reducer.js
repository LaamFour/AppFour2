import { combineReducers } from "@reduxjs/toolkit";
import { storage } from "app/storage";
import { persistReducer } from "redux-persist";
import { addressesReducer, appConfigReducer, cartReducer } from "./slices";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["appConfig"],
};

const appConfigPersistConfig = {
  key: "appConfig",
  storage,
  blacklist: ["loading"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
};

const addressesPersistConfig = {
  key: "addresses",
  storage,
};

/* your app’s top-level reducers */
const appReducer = combineReducers({
  appConfig: persistReducer(appConfigPersistConfig, appConfigReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
  addresses: persistReducer(addressesPersistConfig, addressesReducer),

  // other ruducer
});

export const persistedReducer = persistReducer(persistConfig, appReducer);
