import axios from 'axios'
import { toast } from 'react-hot-toast';

export const getAllOrders = async(token,setorders) => {
    try {
        const { data } = await axios.get(process.env.REACT_APP_API+'/api/v1/order/allorders',{
            headers:{
                Authorization:token
            }
        });
        if (data?.success) {
          setorders(data?.orders);
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong while fetching Orders");
      }
}