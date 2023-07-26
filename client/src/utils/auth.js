import { authService, isAdminService, isVendorService } from "../services/authService";

export const isValidUser = async (token) => {
  try {
    
    const res = await authService(token);
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
        const res = await isAdminService(token)
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
        const res = await isVendorService(token)

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
