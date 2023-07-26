import { toast } from 'react-hot-toast';
import { getAllOrdersService } from '../services/orderServices';

export const getAllOrders = async(token,setorders) => {
    try {
        const { data } = await getAllOrdersService(token)
        if (data?.success) {
          setorders(data?.orders);
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong while fetching Orders");
      }
}
