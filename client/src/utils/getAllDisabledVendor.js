import { toast } from "react-hot-toast";
import { getAllDisableVendorsService } from "../services/vendorService";

export const getAllDisableVendors = async (token, setList) => {
  try {
    const { data } = await getAllDisableVendorsService(token)
    if (data?.success) {
      setList(data?.vendors);
    }
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong with fetching your products");
  }
};
