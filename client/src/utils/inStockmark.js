import { toast } from "react-hot-toast";
import { inStockService } from "../services/quantityService";

export const inStock = async (product_id,quantity,token) => {
  try {
    const { data } = await inStockService(product_id,quantity,token)
    if (data?.success) {
      return toast.success("Product quantity successfully added")
    }
    else{
        toast.error(data.message)
    }
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong Please wait ot refresh the page");
  }
};
