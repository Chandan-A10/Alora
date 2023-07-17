import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
const Spinner = () => {
  return (
    <Backdrop
      sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}
    >
      <CircularProgress color="inherit" />
      <br/>
      <p className="m-2">
      please wait...
      </p>
    </Backdrop>
  );
};

export default Spinner;
