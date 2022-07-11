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

// wishList add Reducer
export const wishListaddReducer = createReducer(initialState, {
  wishListAddRequest: state => {
    state.loading = true;
  },
  wishListAddSuccess: (state, action) => {
    state.loading = false;
    state.wishlistData = action.payload;
  },
  wishListAddFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

// wishList Data Reducer
export const wishListReducer = createReducer(initialState, {
  wishListDataRequest: state => {
    state.loading = true;
  },
  wishListDataSuccess: (state, action) => {
    (state.loading = false), (state.wishlistData = action.payload);
  },
  wishListDataFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

// Wishlist Remove Reducer
export const wishListRemoveReducer = createReducer(initialState, {
  wishListRemoveRequest: state => {
    state.loading = true;
  },
  wishListRemoveSuccess: (state, action) => {
    (state.loading = false), (state.message = action.payload.message);
  },
  wishListRemoveFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

// Cart Add Reducer
export const cartAddReducer = createReducer(initialState, {
  cartAddReducerRequest: state => {
    state.loading = true;
  },
  cartAddReducerSuccess: (state, action) => {
    state.loading = false;
    state.cart = action.payload;
  },
  cartAddReducerFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

// Cart Data Reducer
export const cartReducer = createReducer(initialState, {
  cartDataRequest: state => {
    state.loading = true;
  },
  cartDataSuccess: (state, action) => {
    (state.loading = false), (state.cartData = action.payload.cartData);
  },
  cartDataFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

// Cart Remove Reducer
export const cartRemoveReducer = createReducer(initialState, {
  cartRemoveRequest: state => {
    state.loading = true;
  },
  cartRemoveSuccess: (state, action) => {
    (state.loading = false), (state.message = action.payload.message);
  },
  cartRemoveFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

// Cart Update Reducer
export const cartUpdateReducer = createReducer(initialState, {
  cartUpdateRequest: state => {
    state.loading = true;
  },
  cartUpdateSuccess: (state, action) => {
    (state.loading = false), (state.message = action.payload.message);
  },
  cartUpdateFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
