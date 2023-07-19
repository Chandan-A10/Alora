import React, { useState } from "react";
import { Divider, Modal } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { reqLogin } from "../../redux/slice";
import { InputAdornment, Paper, TextField } from "@mui/material";
import { Button } from "antd";
import {LoginOutlined} from "@ant-design/icons"

export const Login = ({login,setlogin}) => {
  const [google, setgoogle] = useState(false)
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //handling register form submit
  const phoneNumberRegex = /^[0-9]*$/;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res.data.success) {
        toast.success(res.data.message);

        //setdata in state
        dispatch(reqLogin({ user: res.data.user, token: res.data.token }));

        setTimeout(() => {
          setlogin(false);
          navigate("/");
        }, 0);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleInputChange = (event) => {
    const { value } = event.target;
    
    // Remove any non-digit characters from the input
    const cleanValue = value.replace(/[^0-9]/g, '');
    // Limit the input to 10 digits
    const limitedValue = cleanValue.slice(0, 10);

    // Here, you can perform any additional formatting or processing as needed

    // Set the cleaned and limited value back to the input
    event.target.value = limitedValue;
  };

  const handleAuth = ()=>{
    
  }
  return (
    <div>
      <Modal
        title="Login"
        centered
        open={login}
        onOk={() => setlogin(false)}
        onCancel={() => setlogin(false)}
        footer={null}
        width={500}
      >
        <Paper elevation={0} style={{ padding: "10px" }}>
          <form className="register" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              size="small"
              autoFocus
              margin="dense"
              id="name"
              type="email"
              fullWidth
              color="info"
              variant="standard"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              size="small"
              autoFocus
              margin="dense"
              id="name"
              type="password"
              fullWidth
              color="info"
              variant="standard"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
            <button type="submit" class="btn mt-3 btn-primary">
              Submit
            </button>
              <Divider>OR</Divider>
              <div style={{display:'flex',justifyContent:'space-evenly'}}>
              <TextField
                size="small"
                label="Phone Number"
                variant="standard"
                onChange={handleInputChange}
                  InputProps={{
                  startAdornment:<InputAdornment position="start">+91</InputAdornment>,
                  maxLength: 10, // Limit the input to 10 characters
                  pattern: phoneNumberRegex, // Only allow digits based on the regex
                }}
              />
              <Button style={{width:'30%'}}><LoginOutlined/>Login</Button>
              </div>
            <div className="mt-3">
              <a
                className="w-100 btn btn-outline-dark"
                role="button"
                onClick={handleAuth}
                style={{ textTransform: "none" }}
              >
                <img
                  width="20px"
                  style={{ marginBottom: 3, marginRight: 5 }}
                  alt="Google sign-in"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                />
                Login with Google
              </a>
            </div>
          </form>
          <Modal open={google} title="selectRole"></Modal>
        </Paper>
      </Modal>
    </div>
  );
};
