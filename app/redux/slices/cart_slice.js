import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    syncCartItems: (state, action) => {
      state.items = action.payload;
    },
    removeAll: (state) => {
      state.items = [];
    },

    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },

    increase: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      ++item.quantity;
    },

    decrease: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      --item.quantity;
    },

    addToCart: (state, action) => {
      const product = action.payload;

      // find item found
      const isItemExist = state.items.find((item) => item.id === product.id);

      // if not found
      if (!isItemExist) {
        state.items = [
          ...state.items,
          {
            ...product,
            quantity: 1,
          },
        ];
      }
      // found
      else {
        state.items = state.items.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        });
      }
    },
  },
  selectors: {
    // selectCart: (state) => state?.cart?.items,
  },
});

export const {} = cartSlice.selectors;

export const {
  syncCartItems,
  removeAll,
  removeItem,
  increase,
  decrease,
  addToCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

export const selectCart = (state) => state?.cart?.items;

export const selectCartTotalAmount = createSelector([selectCart], (state) => {
  return state.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * currentValue.quantity,
    0
  );
});

export const selectBadge = createSelector([selectCart], (items) => {
  return items?.length || 0;
});

export const selectNumCart = createSelector([selectCart], (items) => {
  return items?.length || 0;
});
