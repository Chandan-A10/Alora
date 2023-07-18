import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { DisableVendor } from "../../utils/disableVendor";

const DisableConfirmation = ({ name, setflag, setModalOpen, ModalOpen, vendoid}) => {
  const user = useSelector((state) => state.data);
  const handleClose = () => {
    setModalOpen(false);
  };
  const handleConfirm = async () => {
    DisableVendor(vendoid,user?.token)
    setTimeout(() => {
      setflag((prev) => !prev);
      setModalOpen(false);
    }, 1000);
  };
  return (
    <div>
      <Dialog open={ModalOpen} onClose={handleClose}>
        <DialogTitle>Revoke Access</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure, you want to <b style={{color:'red'}}>disable</b> vendor "
            {name}".Note that, disabled vendor will not be able to login again
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

export default DisableConfirmation;
