import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-hot-toast";
import axios from "axios";

export const GoogleAuth = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, provider);
    const data = res._tokenResponse;
    const pass = res.user.uid;
    const obn = {
      name: data.displayName,
      email: data.email,
      password: pass,
    };
    const response = await axios.post("http://localhost:8000/api/v1/auth/googlecheck", obn).then((res) => {
      console.log(res)
      if (res.status === 200) {
        return {user:res.data?.user,token:res.data?.token}
      } else if (res.status === 202) {
        toast.error(res.data.message);
        return res.status;
      }
      else if (res.status === 204){
        console.log(res.status)
        return {status:res.status,user:obn};
      }
    });
    return response
  } catch (err) {
    console.log(err);
  }
};
