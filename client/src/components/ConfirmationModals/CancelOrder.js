import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { cancelOrders } from "../../utils/cancelOrders";

const CancelOrderConfo = ({ id, setflag, setModalOpen, ModalOpen}) => {
  const user = useSelector((state) => state.data);
  const handleClose = () => {
    setModalOpen(false);
  };
  const handleConfirm = async () => {
    cancelOrders(id,user?.token)
    setTimeout(() => {
      setflag((prev) => !prev);
      setModalOpen(false);
    }, 1000);
  };
  return (
    <div>
      <Dialog open={ModalOpen} onClose={handleClose}>
        <DialogTitle>Cancel Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure, you want to <b style={{color:'red'}}>Cancel</b> your order "
            {id}".This process is irreversible and cannot be undone. Once cancelled money will be refunded within 2 days.
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

export default CancelOrderConfo;