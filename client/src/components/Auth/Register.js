import React, { useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const SignUp = () => {
  const [open, setOpen] = useState(true);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [role, setrole] = useState(0);
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  //handling register form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    let type;
    role === 0 ? (type = 0) : (type = 2);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password ,role:type}
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          setOpen(false);
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
        title="Register"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={null}
        width={1000}
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
          <div className="form-check form-switch">
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
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};
