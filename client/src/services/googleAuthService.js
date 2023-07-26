import axios from "axios";
import { toast } from "react-hot-toast";

export const googleAuthService = async (obn) => {
  const res=await axios
    .post("http://localhost:8000/api/v1/auth/googlecheck", obn)
    .then((res) => {
      if (res.status === 200) {
        return { user: res.data?.user, token: res.data?.token };
      } else if (res.status === 202) {
        toast.error(res.data.message);
        return res.status;
      } else if (res.status === 204) {
        return { status: res.status, user: obn };
      }
    });
    return res;
};