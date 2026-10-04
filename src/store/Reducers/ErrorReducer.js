const initialState = {
  isLoading: false,
  errorMessage: null,
  categoryLoader: false,
  categoryErrorMessage: null,
};

export const ErrorMessage = (state = initialState, action) => {
  switch (action.type) {
    case `Is_Fetching`:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };

    case `Is_Success`:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        categoryLoader: false,
        categoryErrorMessage: null,
      };

    case `Is_error`:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };

    case `categories_Loader`:
      return {
        ...state,
        categoryLoader: true,
        categoryErrorMessage: null,
      };

    case `categories_Success`:
      return {
        ...state,
        categoryLoader: false,
        categoryErrorMessage: null,
      };

    case `categories_error`:
      return {
        ...state,
        categoryLoader: false,
        categoryErrorMessage: action.payload,
      };

    case `ADDRESS_BUTTON_LOADER`:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
        categoryErrorMessage: null,
      };

    default:
      return state;
  }
};
