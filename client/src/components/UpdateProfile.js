import { Upload, message } from "antd";
import React, { useState } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";
import { update } from "../redux/slice";

const UpdateProfile = () => {
  const user = useSelector((state) => state.data);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(process.env.REACT_APP_API +`/userimages/${user?.user?.photo}`);
  const [img, setimg] = useState(null)
  const [name, setname] = useState(user?.user?.name || "");
  const [address, setaddress] = useState(user?.user?.address || "");
  const [phone, setphone] = useState(user?.user?.phone ||"");
  const dispacter = useDispatch()
  
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      return false;
    }
    setImageUrl(URL.createObjectURL(file));
    setimg(file)
    return isJpgOrPng && isLt2M;
  };
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
        >
        Upload
      </div>
    </div>
  );
  const handleSubmit = async(e) => {
    e.preventDefault()
    // if(img===null){
    //   return toast.error("Please select an image as well")
    // }
    if(address?.trim()===""){
      return message.error("Address cannot be blank")
    }
    if(name?.trim()===""){
      return message.error("Name cannot be blank")
    }
    const formData=new FormData()
    formData.append("address",address)
    formData.append("phone",phone)
    if(img!==null){
      formData.append("photo",img,img?.name)
    }
    formData.append("name",name)
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_API + `/api/v1/auth/update-profile`,formData,{
          headers:{
            Authorization:user?.token
          }
        });
      if (data?.success) {
        toast.success(data?.message);
        dispacter(update(data.user))
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong with updating your profile");
    }
  };
  return (
    <>
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <Paper elevation={3} style={{ padding: "10px", width: "70%" }}>
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    borderRadius:'100%',
                    height:'100%',
                    objectFit:'contain',
                    width: "100%",
                  }}
                />
            ) : (
              uploadButton
            )}
          </Upload>
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
                value={user?.user?.email}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPhone" className="form-label">
                Phone
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputPhone"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                placeholder="000-000-0000"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputAddress"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                placeholder="example  #152, California, US"
                required
              />
            </div>
            <button
              type="submit"
              style={{ width: "20%" }}
              className="btn btn-primary"
            >
              Update
            </button>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default UpdateProfile;
