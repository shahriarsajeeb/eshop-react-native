import {configureStore} from '@reduxjs/toolkit';
import {
  newOrderReducer,
  orderDataReducer,
  orderDetailsReducer,
} from './Reducers/OrderReducer';
import {
  cartAddReducer,
  cartReducer,
  cartRemoveReducer,
  cartUpdateReducer,
  productsReducer,
  wishListaddReducer,
  wishListReducer,
  wishListRemoveReducer,
} from './Reducers/ProductReducer';
import {
  forgotPasswordReducer,
  updateProfileReducer,
  userReducer,
} from './Reducers/UserReducer';

const Store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    wishList: wishListReducer,
    updateUser: updateProfileReducer,
    wishListRemove: wishListRemoveReducer,
    wishListAdd: wishListaddReducer,
    cart: cartReducer,
    cartRemove: cartRemoveReducer,
    cartAdd: cartAddReducer,
    cartUpdate: cartUpdateReducer,
    orderNew: newOrderReducer,
    orderData: orderDataReducer,
    orderDetails: orderDetailsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
export default Store;
