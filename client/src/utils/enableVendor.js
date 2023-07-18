import axios from "axios";
import { toast } from "react-hot-toast";

export const enableVendor = async (vendorID,token) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_API+`/api/v1/auth/vendors/enable/${vendorID}`,{
        headers:{
            Authorization:token
        }
    });
    if (data?.success) {
      return toast.success("Vendor successfully Enabled")
    }
    else{
        toast.error(data.message)
    }
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong Please wait ot refresh the page");
  }
};
