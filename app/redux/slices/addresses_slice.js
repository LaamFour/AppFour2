import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  defaultAddress: null,
};

const addressesSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    removeAllAddress: (state) => {
      (state.data = []), (state.defaultAddress = null);
    },
    addAddress: (state, action) => {
      const { is_default } = action.payload;
      if (!is_default) {
        state.data.push(action.payload);
      } else {
        state.data = state.data.map((item) => {
          return {
            ...item,
            is_default: false,
          };
        });
        state.data.push(action.payload);
      }
    },
    setAddresses: (state, action) => {
      state.data = action.payload;
    },
    getAddresses: (state) => {
      state;
    },
    setDefaultAddress: (state, action) => {
      state.defaultAddress = action.payload;
    },
    setPrimaryAddress: (state, action) => {
      state.defaultAddress = state?.data?.find((item) => item?.is_default);
    },
  },
  selectors: {},
});

export const {} = addressesSlice.selectors;

export const {
  addAddress,
  setAddresses,
  getAddresses,
  setDefaultAddress,
  setPrimaryAddress,
  removeAllAddress,
} = addressesSlice.actions;

export const addressesReducer = addressesSlice.reducer;

export const selectAddresses = (state) => state?.addresses?.data;

const selectDefaultAddress = (state) => state?.addresses?.defaultAddress;

export const selectGetDefaultAddress = createSelector(
  [selectAddresses, selectDefaultAddress],
  (addresses, defaultAddress) => {
    if (defaultAddress) {
      return defaultAddress;
    }
    return addresses?.find((item) => item?.is_default);
  }
);
