import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const GoogleAuth = async () => {
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
    await axios.post("http://localhost:4000/goomglepost", obn).then((res) => {
      if (res.status === 200) {
        navigate("/");
        dispatch(
          setLogin({
            email: data.email,
            name: data.displayName,
            password: pass,
            designation: value3,
            jointime: new Date(),
            uid: pass,
          })
        );
      } else if (res.status === 204) {
        setErr("You are unauthorized by the Admin");
      }
    });
  } catch (err) {
    console.log(err);
  }
};
