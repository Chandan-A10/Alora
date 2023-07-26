import { toast } from "react-hot-toast";
import { getAllVendorsService } from "../services/vendorService";

export const getAllVendors = async (token, setList) => {
  try {
    const { data } = await getAllVendorsService(token)
    if (data?.success) {
      setList(data?.vendors);
    }
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong with fetching your products");
  }
};
