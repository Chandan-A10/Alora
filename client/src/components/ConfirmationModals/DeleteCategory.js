import React, { useState } from 'react'
import { delCat } from '../../utils/deleteCategory';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";

const DeleteCategory = ({category,setflag,setModalOpen,ModalOpen}) => {
  const [name, setname] = useState("");
  const user = useSelector((state) => state.data);
  const handleClose = () => {
    setModalOpen(false);
  };
  const handleDelete = async () => {
    delCat(category._id,user?.token);
    setTimeout(() => {
        setflag(prev=>!prev)
        setModalOpen(false)
    }, 1000);
  };
  return (
    <div>
      <Dialog open={ModalOpen} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure, you want to {" "}
            <sapn style={{ color: "red" }}>remove</sapn> Category "
            {category?.name}". Please be aware that this action is irreversible
            and cannot be undone.
          </DialogContentText>
          <br />
          <TextField
            autoComplete="off"
            size="small"
            onChange={(e) => setname(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            placeholder='Type "delete" and press Confirm'
            type="email"
            fullWidth
            color="error"
            variant="outlined"
            InputProps={{
              style: {
                fontStyle: "italic", // Apply italic style to the input element
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            color="error"
            onClick={handleDelete}
            disabled={!(name === "delete")}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeleteCategory