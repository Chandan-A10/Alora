import React, { useEffect, useState } from "react";
import { getCategories } from "../../utils/getCaterogies";
import CategoryCard from "../Cards/CategoryCard";
import { Button, TextField } from "@mui/material";
import CreateCategory from "../ConfirmationModals/CreateCategory";

const CategoryMenu = () => {
  const [flag, setflag] = useState(true);
  const [createnew, setcreatenew] = useState("");
  const [categories, setcategories] = useState([]);
  const [open, setopen] = useState(false);
  const handleCreate = () => {
    if (createnew.trim() === "") {
      setcreatenew("Name can't be empty");
      return;
    } else {
      setopen(true);
    }
  };
  useEffect(() => {
    getCategories(setcategories);
    setcreatenew("")
  }, [flag]);
  return (
    <div style={{ backgroundColor: "white" }}>
      <TextField
        value={createnew}
        className="mt-3"
        autoComplete="off"
        label="New Category ?"
        size="small"
        style={{ width: "90%" }}
        onChange={(e) => setcreatenew(e.target.value)}
        margin="dense"
        id="name"
        placeholder="Enter Category name"
        type="text"
        fullWidth
        color="info"
        variant="standard"
      />
      <Button onClick={handleCreate} variant="contained" className="mt-3 w-20">
        Create
      </Button>
      <CreateCategory
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
