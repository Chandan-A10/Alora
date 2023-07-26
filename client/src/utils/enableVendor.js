import { toast } from "react-hot-toast";

export const enableVendor = async (vendorID,token) => {
  try {
    const { data } = await enableVendor(vendorID,token)
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
