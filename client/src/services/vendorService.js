import axios from "axios";

export const getAllVendorsService = (token) =>
  axios.get(process.env.REACT_APP_API + "/api/v1/auth/vendors", {
    headers: {
      Authorization: token,
    },
  });

export const disableVendorService = (vendorID, token) =>
  axios.get(
    process.env.REACT_APP_API + `/api/v1/auth/vendors/disable/${vendorID}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

export const enableVendorService = (vendorID, token) =>
  axios.get(
    process.env.REACT_APP_API + `/api/v1/auth/vendors/enable/${vendorID}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
export const getAllDisableVendorsService = (token) =>
  axios.get(process.env.REACT_APP_API + "/api/v1/auth/disablevendors", {
    headers: {
      Authorization: token,
    },
  });
