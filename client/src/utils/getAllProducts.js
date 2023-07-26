import { toast } from "react-hot-toast";
import { getAllProductsService } from "../services/productService";
export const getAllProducts = async (setproducts) => {
  try {
    const { data } = await getAllProductsService()
    if (data?.success && data?.products) {
      setproducts(data?.products);
    }
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong with fetching your products");
  }
};
