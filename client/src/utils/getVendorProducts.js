import axios from "axios";
import { toast } from "react-hot-toast";
export const getVendorProducts = async (setproducts, token) => {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_API + `/api/v1/products/getproducts`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (data?.success && data?.products) {
      setproducts(data?.products);
    }
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong with fetching your products");
  }
};
