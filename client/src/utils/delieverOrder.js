import { toast } from "react-hot-toast";
import { delieverOrderService } from "../services/orderServices";

export const delieverOrders = async (orderid,token) => {
  try {
    const { data } = await delieverOrderService(orderid,token)
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
