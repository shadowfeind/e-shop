import {
  PRODUCT_DETILS_FAIL,
  PRODUCT_DETILS_REQUEST,
  PRODUCT_DETILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const productListReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducers = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETILS_REQUEST:
      return { loading: true, product: {} };
    case PRODUCT_DETILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
