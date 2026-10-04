import { Alert, AlertTitle } from "@mui/material";
import React from "react";

const Stripe = () => {
  return (
    <div className="h-96 flex justify-center items-center">
      <Alert severity="warning" variant="filled" style={{ maxWidth: "400px" }}>
        <AlertTitle>Stripe Method is Unavailable</AlertTitle>
        Stripe is Unavailable ,Please Use another Payment Method.
      </Alert>
    </div>
  );
};

export default Stripe;
