import axios from "axios";
import { toast } from "react-hot-toast";
export const getAllProducts = async (setproducts) => {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_API + `/api/v1/products/all-products`);
    if (data?.success && data?.products) {
      setproducts(data?.products);
    }
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong with fetching your products");
  }
};
