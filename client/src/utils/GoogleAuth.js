import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";
import { googleAuthService } from "../services/googleAuthService";

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
    console.log(data)
    const response = await googleAuthService(obn);
    return response
  } catch (err) {
    console.log(err);
  }
};
