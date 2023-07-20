import axios from "axios";
import { toast } from "react-hot-toast";

export const delieverOrders = async (orderid,token) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_API+`/api/v1/order/delievered/${orderid}`,{
        headers:{
            Authorization:token
        }
    });
    if (data?.success) {
      return toast.success("Order successfully Delivered")
    }
    else{
        toast.error(data.message)
    }
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong Please wait ot refresh the page");
  }
};
