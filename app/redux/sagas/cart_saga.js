import { all, call, put, select, take, takeLatest } from "redux-saga/effects";
import { productService } from "~/services";
import {
  addToCart,
  decrease,
  increase,
  removeAll,
  removeItem,
  selectCart,
  syncCartItems,
} from "../slices";

function* handleCartUpdate() {
  try {
    const cart = yield select(selectCart);

    const productIds = cart?.map((e) => e.id);
    if (Array.isArray(productIds)) {
      const products = yield all(
        productIds.map((id) =>
          call(function* () {
            try {
              const response = yield call(productService.getProduct, id);
              return response.data || null;
            } catch (error) {}
          })
        )
      );

      const filteredProducts = products.filter((product) => product !== null);

      const combineProducts = filteredProducts?.map((product) => {
        const cartItem = cart.find((item) => item.id === product.id);
        return {
          ...product,
          quantity: cartItem.quantity,
        };
      });

      yield put(syncCartItems(combineProducts));
    }
  } catch (error) {}
}

function* watchCartFlow() {
  yield takeLatest(
    [
      addToCart.type,
      removeAll.type,
      removeItem.type,
      increase.type,
      decrease.type,
    ],
    handleCartUpdate
  );
}

function* initializeCart() {
  yield take("persist/REHYDRATE");
  yield call(handleCartUpdate);
}

export function* cartSaga() {
  yield all([call(initializeCart), call(watchCartFlow)]);
}
