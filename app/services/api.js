import axios from "axios";
import { store } from "~/redux";

// let store;

/**
 *
 * @see https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
 */
export const injectStore = (_store) => {
  // store = _store;
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://192.168.0.106:6000/api",
  timeout: 10000,
};

export const publicAxios = axios.create(config);

// Create axios instance for authenticated request
export const authAxios = axios.create(config);

// Add a request interceptor
publicAxios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
publicAxios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// Add a request interceptor
authAxios.interceptors.request.use(
  function (config) {
    const token = store.getState().appConfig?.user?.access_token;
    config.headers.Authorization = `Bearer ${token}`;
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
authAxios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
