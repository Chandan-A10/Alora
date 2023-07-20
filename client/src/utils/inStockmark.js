import axios from "axios";
import { toast } from "react-hot-toast";

export const inStock = async (product_id,quantity,token) => {
  try {
    const { data } = await axios.post(process.env.REACT_APP_API+`/api/v1/products/instock/${product_id}`,{quantity:quantity},{
        headers:{
            Authorization:token
        }
    });
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
