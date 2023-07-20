import React, { useState } from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { inStock } from "../../utils/inStockmark"
const InStockmarked = ({product,setflag,setModalOpen,ModalOpen}) => {
  const [name, setname] = useState("");
  const user = useSelector((state) => state.data);
  const handleClose = () => {
    setModalOpen(false);
  };
  const handleDelete = async () => {
    inStock(product._id,name,user?.token)
    setTimeout(() => {
        setflag(prev=>!prev)
        setModalOpen(false)
    }, 1000);
  };
  return (
    <div>
      <Dialog open={ModalOpen} onClose={handleClose}>
        <DialogTitle>Add Quantity</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please input the Available quantity and press Confirm
          </DialogContentText>
          <br />
          <TextField
            autoComplete="off"
            size="small"
            onChange={(e) => setname(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            placeholder='Enter Quantity'
            type="number"
            fullWidth
            color="info"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            color="error"
            onClick={handleDelete}
            disabled={(name.trim() !== ""?false:true)}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default InStockmarked