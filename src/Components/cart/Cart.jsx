import {
  MdArrowBack,
  MdShoppingCart,
  MdShoppingCartCheckout,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemContent from "./ItemContent";
import { useEffect } from "react";
import { fetchProducts } from "../../store/Action";
import CartEmpty from "./CartEmpty";
import { FormatePrice } from "../../utils/FormatePrice";
import { current } from "@reduxjs/toolkit";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.carts);
  const newState = { ...cart };
  console.log("Cart before total calculation:", cart);

  useEffect(() => {
    dispatch(fetchProducts(""));
  }, [dispatch]);

  newState.totalPrice = cart?.reduce(
    (total, current) =>
      total + Number(current?.specialPrice) * Number(current?.quantity),
    0,
  );

  if (!cart || cart.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-10">
      <div className="flex  mb-12 flex-col items-center">
        <h1 className="text-4xl font-bold text-center text-gray-900 flex items-center gap-3">
          <MdShoppingCart size={36} className="text-gray-700" />
          Your Cart
        </h1>
        <p className="text-lg text-gray-600 mt-2">All you are selected items</p>
      </div>

      <div className="grid md:grid-cols-5 grid-cols-4 gap-4 pb-2 font-semibold items-center">
        <div className="text-slate-800 md:col-span-2 justify-self-start lg:ps-4  text-lg">
          Product
        </div>
        <div className="justify-self-center text-lg text-slate-800">Price</div>
        <div className="justify-self-center text-lg text-slate-800">
          Quantity
        </div>
        <div className="justify-self-center text-lg text-slate-800">Total</div>
      </div>

      <div>
        {cart &&
          cart.length > 0 &&
          cart.map((item, i) => <ItemContent key={i} {...item} />)}
      </div>

      <div className="border-t-[1.5px] border-slate-700 py-4 flex sm:flex-row flex-col sm:px-0 px-2 sm:justify-between gap-4">
        <div></div>
        <div className="flex flex-col text-sm gap-1">
          <div className="flex justify-between w-full md:text-lg text-sm font-semibold">
            <span>Subtotal</span>
            <span>{FormatePrice(newState?.totalPrice)}</span>
          </div>
          <p className="text-slate-500">
            Taxes and shipping calculated at checkout
          </p>

          <Link className="w-full flex justify-end" to="/checkout">
            <button
              className="font-semibold w-[300px] py-2 px-4 rounded-sm
               bg-custom-blue text-white flex item-center justify-center gap-2 hover:text-gray-300 transition duration-300"
              onClick={() => {}}
            >
              <MdShoppingCartCheckout size={20} />
              Checkout
            </button>
          </Link>

          <Link
            className="flex gap-2 items-center  mt-2 text-slate-500"
            to="/products"
          >
            <MdArrowBack />
            <span className="text-lg">Continue shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
