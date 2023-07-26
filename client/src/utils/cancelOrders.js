import { toast } from "react-hot-toast";
import { cancelOrdersService } from "../services/orderServices";

export const cancelOrders = async (orderid,token) => {
  try {
    const { data } = await cancelOrdersService(orderid,token)
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
