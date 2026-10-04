import { data } from "react-router-dom";
import api from "../../api/api";

export const fetchProducts = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: `Is_Fetching` });
    const { data } = await api.get(`/public/products?${queryString}`);
    dispatch({
      type: `Fetch_products`,
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPage,
      lastPage: data.lastPage,
    });
    // console.log(data);
    // console.log(data.totalPage);
    dispatch({ type: `Is_Success` });
  } catch (error) {
    console.log(error);
    dispatch({
      type: `Is_error`,
      payload: error?.response?.data?.message || "Failed to fletch products",
    });
  }
};

export const fetchCategory = () => async (dispatch) => {
  try {
    dispatch({ type: `categories_Loader` });
    const { data } = await api.get(`/public/category`);
    dispatch({
      type: `Fetch_categories`,
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPage,
      lastPage: data.lastPage,
    });
    dispatch({ type: `categories_Success` });
  } catch (error) {
    console.log(error);
    dispatch({
      type: `categories_error`,
      payload: error?.response?.data?.message || "Failed to fletch categories",
    });
  }
};

export const fetchAddToCart =
  (data, qtn = 1, toast) =>
  (dispatch, getState) => {
    // find the product
    const { products } = getState().products;
    const getProducts = products.find(
      (items) => items.productId === data.productId,
    );
    // checks the quentity
    const IsQuantityExist = getProducts.quantity >= qtn;
    // if in stock add it
    if (IsQuantityExist) {
      dispatch({ type: "ADD_CART", payload: { ...data, quantity: qtn } });
      toast.success(`${data.productName} added to cart`);
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      // if stock is not exist
      toast.error(`Out Of Stock!`);
    }
  };

export const increaseCartQuantity =
  (data, toast, currentQuantity, setCurrentQuantity) =>
  (dispatch, getState) => {
    const { products } = getState().products;

    const getProducts = products.find(
      (items) => items.productId === data.productId,
    );

    const isQuantityExist = getProducts.quantity >= currentQuantity + 1;

    if (isQuantityExist) {
      const newQuantity = currentQuantity + 1;
      setCurrentQuantity(newQuantity);

      dispatch({
        type: "ADD_CART",
        payload: { ...data, quantity: newQuantity },
      });
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      toast.error("Quantity reached to limit");
    }
  };

export const decreaseCartQuantity =
  (data, newQuantity) => (dispatch, getState) => {
    dispatch({
      type: "ADD_CART",
      payload: { ...data, quantity: newQuantity },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  };

export const removeItemsFromCart = (data, toast) => (dispatch, getState) => {
  dispatch({ type: "Remove_Cart", payload: data });
  toast(`${data.productName} is romoved from Cart`);
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};

export const authenticateSignInUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signin", sendData);
      console.log(data);
      dispatch({
        type: "LOGIN_USER",
        payload: data,
      });
      localStorage.setItem("auth", JSON.stringify(data));
      reset();
      toast.success("Login Success");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      setLoader(false);
    }
  };

export const registerNewUser =
  (sendData, toast, reset, navigate, setLoader) => async () => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signup", sendData);
      reset();
      toast.success(data?.message || "Register Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      setLoader(false);
    }
  };

export const LogOutUser = (navigate) => (dispatch) => {
  dispatch({ type: "LOG_OUT" });
  localStorage.removeItem("auth");
  navigate("/login");
};

export const addUpdateUserAddress =
  (sendData, toast, reset, addressID, setOpenAddressModel) =>
  async (dispatch, getState) => {
    // const { user } = getState().auth;
    dispatch({ type: "ADDRESS_BUTTON_LOADER" });
    try {
      if (!addressID) {
        const { data } = await api.post("/addresses", sendData);
        // console.log(data);
      } else {
        const { data } = await api.put(`/addresses/${addressID}`, sendData);
      }
      dispatch(getUserAddress());
      toast.success("Address added Successfully");
      dispatch({ type: "Is_Success" });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
      dispatch({ type: "Is_error", payload: null });
    } finally {
      setOpenAddressModel(false);
    }
  };

export const getUserAddress = () => async (dispatch) => {
  try {
    dispatch({ type: `Is_Fetching` });
    const { data } = await api.get(`/addresses`);
    dispatch({ type: `USER_ADDRESS`, payload: data });
    dispatch({ type: `Is_Success` });
  } catch (error) {
    console.log(error);
    dispatch({
      type: `categories_error`,
      payload:
        error?.response?.data?.message || "Failed to fletch User Address",
    });
  }
};

export const selectedUserCheckoutAddresses = (address) => {
  return {
    type: "SELECT_CHECKOUT_ADDRESS",
    payload: address,
  };
};

export const deleteUserAddress =
  (toast, addressId, setOpenDeleteModel) => async (dispatch, getState) => {
    try {
      dispatch({ type: `ADDRESS_BUTTON_LOADER` });
      const { data } = await api.delete(`/addresses/${addressId}`);
      dispatch(getUserAddress());
      dispatch(clearCheckOutAddress());
      toast.success("Address deleted Successfully");
      dispatch({ type: `Is_Success` });
    } catch (error) {
      console.log(error);
      dispatch({
        type: `Is_error`,
        payload: error?.response?.data?.message || "Some error occured",
      });
    } finally {
      setOpenDeleteModel(false);
    }
  };

export const clearCheckOutAddress = () => {
  return {
    type: "REMOVE_CHECKOUT_ADDRESS",
  };
};

export const addPaymentMethod = (method) => {
  return {
    type: "ADD_PAYMENT_METHOD",
    payload: method,
  };
};

export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
  try {
    dispatch({ type: `Is_Fetching` });
    const { data } = await api.post(`/carts/create`, sendCartItems);
    await dispatch(getUserCart());
  } catch (error) {
    console.log(error);
    dispatch({
      type: `Is_error`,
      payload: error?.response?.data?.message || "Failed to create cart items",
    });
  }
};

export const getUserCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: `Is_Fetching` });
    const { data } = await api.get(`/carts/users/cart`);
    dispatch({
      type: `GET_USER_CART_PRODUCTS`,
      payload: data.productDTO, 
      totalprice: data.totalPrice,
      cartId: data.cartId,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    dispatch({ type: `Is_Success` });
  } catch (error) {
    console.log(error);
    dispatch({
      type: `Is_error`,
      payload: error?.response?.data?.message || "Failed to fetch cart items",
    });
  }
};
