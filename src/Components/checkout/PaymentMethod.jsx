import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod, createUserCart } from "../../store/Action";

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const { PaymentMethod } = useSelector((state) => state.payment);
  const { cart, cartId } = useSelector((state) => state.carts);
  const { IsLoding, errorMessage } = useSelector((state) => state.errors);

  useEffect(() => {
    if (cart?.length > 0 && !cartId && !errorMessage) {
      const sendCartItems = cart.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
        };
      });
      dispatch(createUserCart(sendCartItems));
    }
  }, [dispatch, cartId]);

  const paymentMethodhandler = (method) => {
    dispatch(addPaymentMethod(method));
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-md rounded-lg mt-16 border">
      <h1 id="payment Method" className="text-2xl font-semibold mb-4">
        Select payment Method
      </h1>
      <FormControl>
        <RadioGroup
          aria-labelledby="payment Method"
          name="paymentMethod"
          value={PaymentMethod}
          onChange={(e) => paymentMethodhandler(e.target.value)}
        >
          <FormControlLabel
            value="Stripe"
            control={<Radio color="primary" />}
            label="Stripe"
            className="text-gray-700"
          />
          <FormControlLabel
            value="Paypal"
            control={<Radio color="primary" />}
            label="Paypal"
            className="text-gray-700"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default PaymentMethod;
