import { authAxios } from "./api";

const createOrder = ({ items, address }) => {
  return authAxios.post("/orders", {
    items,
    ...address,
  });
};

const getOrdersHistory = () => {
  return authAxios.get("/orders/history");
};

const getOrders = () => {
  return authAxios.get("/orders");
};

const updateOrder = ({ id, status }) => {
  return authAxios.put(`/orders/${id}`, {
    status,
  });
};

const getEvenueProfit = () => {
  return authAxios.get("/revenue-profit");
};

export const orderService = {
  createOrder,
  getOrdersHistory,
  getOrders,
  updateOrder,
  getEvenueProfit,
};
