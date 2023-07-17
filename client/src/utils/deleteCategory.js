import axios from "axios";
import { toast } from "react-hot-toast";

export const delCat = async(id,token) => {
    try {
        const { data } = await axios.delete(
          process.env.REACT_APP_API + `/api/v1/category/delete-category/${id}`,{
            headers:{
                Authorization:token
            }
          });
        if (data?.success) {
          toast.success(data?.message);
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong while deleting");
      }
};
