const initialState = {
  cart: [],
  totalPrice: 0,
  cartId: null,
};

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CART":
      const productToAdd = action.payload;

      const IsCartExistProduct = state.cart.find(
        (items) => items.productId === productToAdd.productId,
      );

      if (IsCartExistProduct) {
        const updateProduct = state.cart.map((items) => {
          if (items.productId === productToAdd.productId) {
            return productToAdd;
          } else {
            return items;
          }
        });
        return {
          ...state,
          cart: updateProduct,
        };
      } else {
        const newCart = [...state.cart, productToAdd];
        return {
          ...state,
          cart: newCart,
        };
      }

    case "Remove_Cart":
      return {
        ...state,
        cart: state.cart.filter(
          (items) => items.productId !== action.payload.productId,
        ),
      };

    case "GET_USER_CART_PRODUCTS":
      return {
        ...state,
        cart: action.payload,
        totalPrice: action.totalprice,
        cartId: action.cartId,
      };

    default:
      return state;
  }
};
