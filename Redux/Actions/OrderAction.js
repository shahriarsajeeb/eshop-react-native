import axios from 'axios';
import {URI} from '../URI';

// create order
export const createOrder = order => async dispatch => {
  try {
    dispatch({
      type: 'orderDataRequest',
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const {data} = await axios.post(`${URI}/api/v2/order/new`, order, config);
    dispatch({
      type: 'orderDataSuccess',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'orderDataFail',
      payload: error.response.data.message,
    });
  }
};

// User Orders
export const getUserOrders = userId => async dispatch => {
  try {
    dispatch({
      type: 'orderDataRequest',
    });
    const {data} = await axios.get(`${URI}/api/v2/orders/me`);
    dispatch({
      type: 'orderDataSuccess',
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: 'orderDataFail',
      payload: error.response.data.message,
    });
  }
};

// Get Order Details
export const getOrderDetails = id => async dispatch => {
  try {
    dispatch({
      type: 'orderDetailsRequest',
    });
    const {data} = await axios.get(`${URI}/api/v2/order/${id}`);
    dispatch({
      type: 'orderDetailsSuccess',
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: 'orderDetailsFail',
      payload: error.response.data.message,
    });
  }
};
