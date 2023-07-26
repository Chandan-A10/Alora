import { toast } from "react-hot-toast";
import { outOfStockService } from "../services/quantityService";

export const outOfStock = async (product_id,token) => {
  try {
    const { data } = await outOfStockService(product_id,token)
    if (data?.success) {
      return toast.success("Product successfully marked as OUT OF STOCK")
    }
    else{
        toast.error(data.message)
    }
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong Please wait ot refresh the page");
  }
};
