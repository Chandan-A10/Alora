import { toast } from "react-hot-toast";
import { getVendorProductsService } from "../services/productService";
export const getVendorProducts = async (setproducts, token) => {
  try {
    const { data } = await getVendorProductsService(token)
    if (data?.success && data?.products) {
      setproducts(data?.products);
    }
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong with fetching your products");
  }
};
