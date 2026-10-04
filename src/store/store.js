import AuthReducer from "./Reducers/AuthReducer";
import { CartReducer } from "./Reducers/CartReducer";
import { ErrorMessage } from "./Reducers/ErrorReducer";
import { PaymentMethodReducer } from "./Reducers/PaymentMethodReducer";
import { ProductReducers } from "./Reducers/ProductReducers";

import { configureStore } from "@reduxjs/toolkit";

const cartItemsFromStorage = localStorage.getItem("cartItems");

const user = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

const CartItems =
  cartItemsFromStorage && cartItemsFromStorage !== "undefined"
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const initialState = {
  auth: { user: user },
  carts: { cart: CartItems },
};

const store = configureStore({
  reducer: {
    products: ProductReducers,
    errors: ErrorMessage,
    carts: CartReducer,
    auth: AuthReducer,
    payment: PaymentMethodReducer,
  },
  preloadedState: initialState,
});
export default store;
