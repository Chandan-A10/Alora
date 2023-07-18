import axios from "axios";
import { toast } from "react-hot-toast";

export const getAllVendors = async (token, setList) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_API+'/api/v1/auth/vendors',{
        headers:{
            Authorization:token
        }
    });
    if (data?.success) {
      setList(data?.vendors);
    }
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong with fetching your products");
  }
};
