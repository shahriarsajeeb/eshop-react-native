import { configureStore } from "@reduxjs/toolkit";
import {addToWishListReducer, productsReducer } from "./Reducers/ProductReducer";
import { forgotPasswordReducer, userReducer } from "./Reducers/UserReducer";

const Store = configureStore({
    reducer:{
        products: productsReducer,
        user: userReducer,
        forgotPassword:forgotPasswordReducer,
        wishList: addToWishListReducer,
    },
})
export default Store;