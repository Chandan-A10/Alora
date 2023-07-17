import axios from "axios";

export const isValidUser = async (token) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/auth/validity`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (res.data.success) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

//check if user is Admin
export const isAdmin = async(token) => {
    try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/isAdmin`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (res.data.success) {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
};

//check if user is vendor
export const isVendor = async(token) => {
    try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/isVendor`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(res.data.message)
        if (res.data.success) {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
};
