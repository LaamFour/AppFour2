import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
};

const appConfigSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  selectors: {
    selectUser: (state) => state?.user,
    selectLoading: (state) => state?.loading,
  },
});

export const { selectLoading } = appConfigSlice.selectors;

export const { setUser, removeUser, setLoading } = appConfigSlice.actions;

export const appConfigReducer = appConfigSlice.reducer;

export const selectRole = (state) => state?.appConfig?.user?.role;

export const selectUser = (state) => state?.appConfig?.user;
