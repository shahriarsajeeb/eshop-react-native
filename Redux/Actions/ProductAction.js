import axios from "axios";

export const getProduct = (keyword="") => async (dispatch) => {
    try {
      dispatch({
        type: "allProductRequest",
      });
      const {data} = await axios.get(`https://mern-nest-ecommerce.herokuapp.com/api/v2/products?keyword=${keyword}`);
      dispatch({
        type: "allProductSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "allProductFail",
        payload: error.response.data.message,
      });
    }
  };
  
// Add to wishlist
export const addToWishlist = (id,quantity) => async(dispatch,getState) =>{
  const {data} = await axios.get(`https://mern-nest-ecommerce.herokuapp.com/api/v2/product/${id}`);

    dispatch({
        type: "addToWishList",
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.Stock,
            quantity,
        }
    })
}