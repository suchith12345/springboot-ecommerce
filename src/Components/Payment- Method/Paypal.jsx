import { Alert, AlertTitle } from "@mui/material";
import React from "react";

const Paypal = () => {
  return (
    <div className="h-96 flex justify-center items-center">
      <Alert severity="warning" variant="filled" style={{ maxWidth: "400px" }}>
        <AlertTitle>PayPal Method is Unavailable</AlertTitle>
        PayPal is Unavailable ,Please Use another Payment Method.
      </Alert>
    </div>
  );
};

export default Paypal;
