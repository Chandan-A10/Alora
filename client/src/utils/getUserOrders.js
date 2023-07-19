import axios from 'axios'
import { toast } from 'react-hot-toast';

export const getUserOrders = async(token,setorders) => {
    try {
        const { data } = await axios.get(process.env.REACT_APP_API+`/api/v1/order/singleorder`,{
            headers:{
                Authorization:token
            }
        });
        if (data?.success) {
          console.log("dsjsk")
          setorders(data?.orders);
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong while fetching Orders");
      }
}
