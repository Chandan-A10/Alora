import axios from "axios";

export const getAllProductsService = () =>
  axios.get(process.env.REACT_APP_API + `/api/v1/products/all-products`);

export const deleteProductService = (id, token) =>
  axios.delete(
    process.env.REACT_APP_API + `/api/v1/products/delete-product/${id}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
export const getVendorProductsService = (token) =>
  axios.get(process.env.REACT_APP_API + `/api/v1/products/getproducts`, {
    headers: {
      Authorization: token,
    },
  });
