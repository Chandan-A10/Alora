import axios from "axios";
import { toast } from "react-hot-toast";

export const cancelOrders = async (orderid,token) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_API+`/api/v1/order/cancel/${orderid}`,{
        headers:{
            Authorization:token
        }
    });
    if (data?.success) {
      return toast.success("Order successfully Cancelled")
    }
    else{
        toast.error(data.message)
    }
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong Please wait ot refresh the page");
  }
};
