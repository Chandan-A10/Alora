import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { createCategory } from "../../utils/createCategory";

const CreateCategory = ({ name, setflag, setModalOpen, ModalOpen }) => {
  const user = useSelector((state) => state.data);
  const handleClose = () => {
    setModalOpen(false);
  };
  const handleConfirm = async () => {
    createCategory(name, user?.token);
    setTimeout(() => {
      setflag((prev) => !prev);
      setModalOpen(false);
    }, 1000);
  };
  return (
    <div>
      <Dialog open={ModalOpen} onClose={handleClose}>
        <DialogTitle>Create Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to <b>create</b> new Category "
            {name}".
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            color="info"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateCategory;
