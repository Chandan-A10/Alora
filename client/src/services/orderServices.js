import axios from "axios";

export const getAllOrdersService = (token) =>
  axios.get(process.env.REACT_APP_API + "/api/v1/order/allorders", {
    headers: {
      Authorization: token,
    },
  });

export const cancelOrdersService = (orderid, token) =>
  axios.get(process.env.REACT_APP_API + `/api/v1/order/cancel/${orderid}`, {
    headers: {
      Authorization: token,
    },
  });

export const delieverOrderService = (orderid, token) =>
  axios.get(process.env.REACT_APP_API + `/api/v1/order/delievered/${orderid}`, {
    headers: {
      Authorization: token,
    },
  });

export const getUserOrdersService = (token) =>
  axios.get(process.env.REACT_APP_API + `/api/v1/order/singleorder`, {
    headers: {
      Authorization: token,
    },
  });
export const placeOrderService = (cart,payableAmount,token) =>
  axios.post(
    process.env.REACT_APP_API + `/api/v1/cart/placeOrder`,
    {
      cart: cart,
      payedAmount: payableAmount,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );