import axios from "axios";

export const authService = (token) =>
  axios.get(`${process.env.REACT_APP_API}/api/v1/auth/validity`, {
    headers: {
      Authorization: token,
    },
  });

export const isVendorService = (token) =>
  axios.get(`${process.env.REACT_APP_API}/api/v1/auth/isVendor`, {
    headers: {
      Authorization: token,
    },
  });

export const isAdminService = (token) =>
  axios.get(`${process.env.REACT_APP_API}/api/v1/auth/isAdmin`, {
    headers: {
      Authorization: token,
    },
  });
