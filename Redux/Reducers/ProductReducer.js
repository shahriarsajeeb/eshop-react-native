import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};

export const productsReducer = createReducer(initialState, {
  allProductRequest: state => {
    state.loading = true;
  },
  allProductSuccess: (state, action) => {
    (state.loading = false),
      (state.products = action.payload.products),
      (state.productsCount = action.payload.productsCount);
    state.resultPerPage = action.payload.resultPerPage;
    state.filteredProductsCount = action.payload.filteredProductsCount;
  },
  allProductFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

// add to wishlist
export const addToWishListReducer = createReducer(initialState, {
  addToWishList: (state = {favouriteItems: []}, action) => {
    const item = action.payload;
    const isItemExist = state.favouriteItems.find(
      i => i.product === item.product,
    );
    if (isItemExist) {
      return {
        ...state,
        favouriteItems: state.favouriteItems.map(i =>
          i.product === isItemExist.product ? item : i,
        ),
      };
    } else {
      return {
        ...state,
        favouriteItems: [...state.favouriteItems, item],
      };
    }
  },
  removeFromWishList: (state = {favouriteItems: []}, action) => {
    return {
      ...state,
      favouriteItems: state.favouriteItems.filter(
        i => i.product !== action.payload,
      ),
    };
  },
});
