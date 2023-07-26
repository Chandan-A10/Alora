import { toast } from 'react-hot-toast';
import { getUserOrdersService } from '../services/orderServices';

export const getUserOrders = async(token,setorders) => {
    try {
        const { data } = await getUserOrdersService(token)
        if (data?.success) {
          console.log("dsjsk")
          setorders(data?.orders);
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong while fetching Orders");
      }
}
