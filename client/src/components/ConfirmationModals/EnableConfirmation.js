import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { enableVendor } from "../../utils/enableVendor";

const EnableConfirmation = ({ name, setflag, setModalOpen, ModalOpen, vendoid}) => {
  const user = useSelector((state) => state.data);
  const handleClose = () => {
    setModalOpen(false);
  };
  const handleConfirm = async () => {
    enableVendor(vendoid,user?.token)
    setTimeout(() => {
      setflag((prev) => !prev);
      setModalOpen(false);
    }, 1000);
  };
  return (
    <div>
      <Dialog open={ModalOpen} onClose={handleClose}>
        <DialogTitle>Enable Access</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure, you want to <b style={{color:'red'}}>enable</b> vendor "
            {name}".You can disable vendor whenever you want
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

export default EnableConfirmation;