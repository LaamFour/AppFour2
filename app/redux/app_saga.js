import { REHYDRATE } from "redux-persist";
import { all, fork, select, take, takeLatest } from "redux-saga/effects";
import { addressesSaga, cartSaga } from "./sagas";
import { removeUser, selectUser, setUser } from "./slices";

export function* checkUserRole() {
  const user = yield select(selectUser);

  if (user?.role === "customer") {
    yield all([fork(cartSaga), fork(addressesSaga)]);
  } else {
  }
}

export function* watchUserChangeFlow() {
  yield takeLatest([setUser.type, removeUser.type], checkUserRole);
}

export function* appSaga() {
  yield take(REHYDRATE);
  yield all([fork(checkUserRole), fork(watchUserChangeFlow)]);
}
