import React, { useState } from "react";
import { Modal, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { reqLogin } from "../../redux/slice";

export const SignUp = ({ register, setregister }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [role, setrole] = useState(0);
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const dispacter = useDispatch();

  //handling register form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(name.trim()===""){
      return message.error("Name cannot be blank")
    }
    if(password.trim()===""){
      return message.error("Password cannot be blank")
    }
    let type;
    role === 0 ? (type = 0) : (type = 2);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, role: type }
      );
      if (res.data.success) {
        message.success("User Created Successfully")
        dispacter(reqLogin({ user: res.data.user, token: res.data.token }));
        setTimeout(() => {
          setregister(false);
          navigate("/");
        }, 0);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Modal
        title={<><h3>Create new Account</h3></>}
        centered
        open={register}
        onOk={() => setregister(false)}
        onCancel={() => setregister(false)}
        footer={null}
        width={500}
      >
        <form className="register" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>
          <div className="form-check form-switch" style={{display:"flex",justifyContent:"center",gap:'0.5rem'}}>
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={role}
              onChange={() => setrole(!role)}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              sign up as a merchant ?
            </label>
          </div>
          <br/>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};
