import React, { useEffect, useState } from "react";
import { getCategories } from "../../utils/getCaterogies";
import CategoryCard from "../Cards/CategoryCard";
import { Button, TextField } from "@mui/material";
import CreateCategory from "../ConfirmationModals/CreateCategory";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const CategoryMenu = () => {
  const [flag, setflag] = useState(true);
  const [createnew, setcreatenew] = useState("");
  const [categories, setcategories] = useState([]);
  const [file, setfile] = useState(null);
  const [open, setopen] = useState(false);

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
    setfile(file);
    return false;
  };
  const handleCreate = () => {
    if (createnew.trim() === "" || file === null) {
      message.error("Name and image can't be empty");
      return;
    } else {
      setopen(true);
    }
  };
  useEffect(() => {
    getCategories(setcategories);
    setcreatenew("");
  }, [flag]);
  return (
    <div style={{ backgroundColor: "transparent", width: "100%" }}>
      <TextField
        value={createnew}
        className="mt-3"
        autoComplete="off"
        label="New Category ?"
        size="small"
        style={{ width: "80%" }}
        onChange={(e) => setcreatenew(e.target.value)}
        margin="dense"
        id="name"
        placeholder="Enter Category name"
        type="text"
        fullWidth
        color="info"
        variant="standard"
      />
      <Upload fileList={file?[file] : []} beforeUpload={beforeUpload}>
        <Button icon={<UploadOutlined />} variant="contained" className="mt-3 ">
          Select File
        </Button>
      </Upload>
      <Button onClick={handleCreate} variant="contained" className="mt-3 w-20">
        Create
      </Button>
      <CreateCategory
        file={file}
        setfile={setfile}
        setModalOpen={setopen}
        name={createnew}
        ModalOpen={open}
        setflag={setflag}
      />
      {categories ? (
        categories.map((each, idx) => {
          return <CategoryCard key={idx} category={each} setflag={setflag} />;
        })
      ) : (
        <h1>No available Category</h1>
      )}
    </div>
  );
};

export default CategoryMenu;
