import { toast } from "react-hot-toast";
import { disableVendorService } from "../services/vendorService";

export const DisableVendor = async (vendorID,token) => {
  try {
    const { data } = await disableVendorService(vendorID,token)
    if (data?.success) {
      return toast.success("Vendor successfully Disabled")
    }
    else{
        toast.error(data.message)
    }
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong Please wait ot refresh the page");
  }
};
