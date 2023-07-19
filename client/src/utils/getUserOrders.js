import axios from 'axios'
import { toast } from 'react-hot-toast';

export const getUserOrders = async(token,setorders,id) => {
    try {
      console.log(id)
        const { data } = await axios.get(process.env.REACT_APP_API+`/api/v1/order/${id}`,{
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
