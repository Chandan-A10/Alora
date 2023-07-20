import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { outOfStock } from "../../utils/outOfStock";

const OutofStock = ({ product, setflag, setModalOpen, ModalOpen}) => {
  const user = useSelector((state) => state.data);
  const handleClose = () => {
    setModalOpen(false);
  };
  const handleConfirm = async () => {
    outOfStock(product._id,user?.token)
    setTimeout(() => {
      setflag((prev) => !prev);
      setModalOpen(false);
    }, 1000);
  };
  return (
    <div>
      <Dialog open={ModalOpen} onClose={handleClose}>
        <DialogTitle>Out of Stock</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure, you want to mark your product "
            {product.name}" as <b style={{color:'red'}}> OUT OF STOCK? </b>You can edit this later in edit section.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose}>Cancel</Button>
          <Button
            color="error"
            onClick={handleConfirm}
          > 
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OutofStock;