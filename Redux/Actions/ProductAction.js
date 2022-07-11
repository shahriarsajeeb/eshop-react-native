import axios from 'axios';
import {URI} from '../URI';
export const getProduct =
  (keyword = '') =>
  async dispatch => {
    try {
      dispatch({
        type: 'allProductRequest',
      });

      const {data} = await axios.get(
        `${URI}/api/v2/products?keyword=${keyword}`,
      );
      dispatch({
        type: 'allProductSuccess',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'allProductFail',
        payload: error.response.data.message,
      });
    }
  };

// Get Wishlist items
export const getWishlist = () => async dispatch => {
  try {
    dispatch({
      type: 'wishListDataRequest',
    });
    const {data} = await axios.get(`${URI}/api/v2/wishlist`);
    dispatch({
      type: 'wishListDataSuccess',
      payload: data.wishlistData,
    });
  } catch (error) {
    dispatch({
      type: 'wishListDataFail',
      payload: error.response.data.message,
    });
  }
};

// Add to Wishlist
export const addToWishlist =
  (productName, quantity, productImage, productPrice, userId, productId,Stock) =>
  async dispatch => {
    try {
      dispatch({
        type: 'wishListDataRequest',
      });
      const {data} = await axios.post(`${URI}/api/v2/addToWishlist`, {
        productName,
        quantity,
        productImage,
        productPrice,
        userId,
        productId,
        Stock,
      });
      dispatch({
        type: 'wishListDataSuccess',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'wishListDataFail',
        payload: error.response.data.message,
      });
    }
  };

// Remove Wishlist item
export const removeWishlist = id => async dispatch => {
  try {
    dispatch({
      type: 'wishListRemoveRequest',
    });

    const {data} = await axios.delete(`${URI}/api/v2/removeWishlist/${id}`);
    dispatch({
      type: 'wishListRemoveSuccess',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'wishListRemoveFail',
      payload: error.response.data.message,
    });
  }
};

// Add to Cart
export const addToCart =
  (productName, quantity, productImage, productPrice, userId, productId,Stock) =>
  async dispatch => {
    try {
      dispatch({
        type: 'cartAddReducerRequest',
      });
      console.log(productName, quantity, productImage, productPrice, userId, productId,Stock);
      const {data} = await axios.post(`${URI}/api/v2/addToCart`, {
        productName,
        quantity,
        productImage,
        productPrice,
        userId,
        productId,
        Stock,
      });
      dispatch({
        type: 'cartAddReducerSuccess',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'cartAddReducerFail',
        payload: error.response.data.message,
      });
      console.log(error.response.data.message);
    }
  };

// Get Cart items
export const getCart = () => async dispatch => {
  try {
    dispatch({
      type: 'cartDataRequest',
    });
    const {data} = await axios.get(`${URI}/api/v2/cart`);
    dispatch({
      type: 'cartDataSuccess',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'cartDataFail',
      payload: error.response.data.message,
    });
  }
};

// Remove Cart item
export const removeCart = id => async dispatch => {
  try {
    dispatch({
      type: 'cartRemoveRequest',
    });

    const {data} = await axios.delete(`${URI}/api/v2/removeCart/${id}`);
    dispatch({
      type: 'cartRemoveSuccess',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'cartRemoveFail',
      payload: error.response.data.message,
    });
  }
};

// Update Cart item
export const updateCart = (id, quantity) => async dispatch => {
  try {
    dispatch({
      type: 'cartUpdateRequest',
    });

    const {data} = await axios.put(`${URI}/api/v2/cart/update/${id}`, {
      quantity,
    });
    dispatch({
      type: 'cartUpdateSuccess',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'cartUpdateFail',
      payload: error.response.data.message,
    });
  }
}