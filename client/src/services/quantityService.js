import axios from "axios";

export const inStockService = (product_id,quantity,token) =>
  axios.post(
    process.env.REACT_APP_API + `/api/v1/products/instock/${product_id}`,
    { quantity: quantity },
    {
      headers: {
        Authorization: token,
      },
    }
  );

  export const outOfStockService = (product_id,token) =>
    axios.get(
      process.env.REACT_APP_API + `/api/v1/products/outofstock/${product_id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );