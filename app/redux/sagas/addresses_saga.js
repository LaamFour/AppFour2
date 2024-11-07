import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {} from "~/services";
import { addressService } from "../../services/address_service";
import { getAddresses, setAddresses } from "../slices";

function* handleFetchAddresses() {
  try {
    const response = yield call(addressService.getAddresses);

    if (Array.isArray(response?.data)) {
      yield put(setAddresses(response.data));
    }
  } catch (error) {}
}

function* initialize() {
  yield takeLatest(["persist/REHYDRATE"], handleFetchAddresses);
}

function* watchFlowAddresses() {
  yield takeLatest([getAddresses.type], handleFetchAddresses);
}

export function* addressesSaga() {
  yield all([fork(watchFlowAddresses)]);
}
