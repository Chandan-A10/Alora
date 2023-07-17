import axios from "axios";
import { toast } from "react-hot-toast";

export const createCategory = async (name, token) => {
  try {
    const { data } = await axios.post(
      process.env.REACT_APP_API + `/api/v1/category/create-category`,{
        name
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (data?.success) {
      toast.success(data?.message);
    }
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
};
