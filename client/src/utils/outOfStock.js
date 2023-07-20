import axios from "axios";
import { toast } from "react-hot-toast";

export const outOfStock = async (product_id,token) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_API+`/api/v1/products/outofstock/${product_id}`,{
        headers:{
            Authorization:token
        }
    });
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
