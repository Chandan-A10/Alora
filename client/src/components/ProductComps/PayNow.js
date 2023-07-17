import {
  Box,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { Divider, Modal } from "antd";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { placeOrder } from "../../utils/placeOrder";
import { useSelector } from "react-redux";

const steps = ["Discount", "Confirm purcase", "Fill details"];

const PayNow = ({setTax, setpaynow, paynow, totalprice,setcart }) => {
  const user = useSelector((state) => state.data);
  const [cardnumber, setcardnumber] = useState("");
  const [activecoupon, setactivecoupon] = useState(null);
  const [activelabel, setactivelabel] = useState(0);
  const [coupon, setcoupon] = useState("");
  const handleClose = () => {
    setpaynow(false);
  };
  const handleOk = () => {
    if (activelabel === 0) {
      if (coupon !== "EPIC") {
        setactivelabel(1);
      } else {
        toast.success("Hooray Coupon 'EPIC' applied");
        setactivecoupon("EPIC");
        setTimeout(() => {
          setactivelabel(1);
        }, 1000);
      }
    }
    if (activelabel === 1) {
      setactivelabel(2);
    }
    if (activelabel === 2) {
      if (cardnumber.trim() === "") {
        toast.error("Card number cannot be empty");
      } else {
        const cart = JSON.parse(localStorage.getItem("cart"));
        const cartdata = cart.cart;
        const payable = activecoupon
          ? totalprice - parseInt(totalprice / 10)
          : totalprice;
        placeOrder(cartdata, payable ,user?.token);
        setTimeout(() => {
            setpaynow(false)
            setcart([])
            setTax(0)
            localStorage.removeItem("cart")
        }, 1000);
      }
    }
  };
  return (
    <Modal
      open={paynow}
      onOk={handleOk}
      onClose={handleClose}
      onCancel={handleClose}
      title={
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activelabel} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      }
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Divider>pay</Divider>
      <Box>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {activelabel === 0 && (
            <TextField
              label="coupon code"
              autoComplete="off"
              size="small"
              value={coupon}
              onChange={(e) => setcoupon(e.target.value)}
              margin="dense"
              id="name"
              placeholder="Enter Coupon code"
              type="text"
              fullWidth
              color="info"
              variant="outlined"
            />
          )}
          {activelabel === 1 && (
            <Typography
              label="coupon code"
              autoComplete="off"
              size="small"
              value={coupon}
              onChange={(e) => setcoupon(e.target.value)}
              margin="dense"
              id="name"
              placeholder="Enter Coupon code"
              type="text"
              fullWidth
              color="info"
              variant="outlined"
            >
              Total amount : {totalprice}$<br />
              Coupon : {activecoupon || "none"}
              <br />
              Amount Payable :{" "}
              {activecoupon
                ? totalprice - parseInt(totalprice / 10)
                : totalprice}
              $
            </Typography>
          )}
          {activelabel === 2 && (
            <TextField
              label="card number"
              autoComplete="off"
              size="small"
              value={cardnumber}
              onChange={(e) => setcardnumber(e.target.value)}
              margin="dense"
              id="name"
              placeholder="Enter Card number"
              type="text"
              fullWidth
              color="info"
              variant="outlined"
            />
          )}
        </Typography>
      </Box>
    </Modal>
  );
};

export default PayNow;
