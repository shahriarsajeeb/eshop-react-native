import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Image,
  Button,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  getCart,
  removeCart,
  updateCart,
} from '../../../Redux/Actions/ProductAction';
import Icon from 'react-native-vector-icons/Ionicons';
import {useEffect} from 'react';

var height = Dimensions.get('window').height;
var {width} = Dimensions.get('window');

export default function Cart({navigation}) {
  const {cartData} = useSelector(state => state.cart);
  const [product, setProduct] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    setTotalPrice(
      cartData.reduce(
        (total, item) => total + item.productPrice * item.quantity,
        0,
      ),
    );
    if (cartData.length > 0) {
      cartData.map(item => {
        setProduct(item);
        setQuantity(item.quantity);
      });
    }
  }, [cartData,quantity]);
  
  const [quantity, setQuantity] = useState(0);

  
  // Quantity increase
  const increaseQuantity = id => {
    if (product.Stock - 1 < quantity) {
      ToastAndroid.showWithGravity(
        `${product.productName} out of stock`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      setQuantity(quantity + 1);
      dispatch(updateCart(id, quantity + 1));
    }
  };

  // Quantity decrease
  const decreaseQuantity = id => {
    if (quantity > 1) {
      dispatch(updateCart(id, quantity - 1));
      setQuantity(quantity - 1);
    }
  };

  // Remove product from cart
  const cartRemoveHandler = id => {
    ToastAndroid.showWithGravity(
      `Item removed from cart`,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
    dispatch(removeCart(id));
  };

  return (
    <CartItems
      cartRemoveHandler={cartRemoveHandler}
      setProduct={setProduct}
      product={product}
      cartData={cartData}
      totalPrice={totalPrice}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      quantity={quantity}
      navigation={navigation}
    />
  );
}

const CartItems = ({
  cartData,
  cartRemoveHandler,
  totalPrice,
  decreaseQuantity,
  increaseQuantity,
  quantity,
  navigation,
}) => {
  return (
    <View>
      {cartData && cartData.length > 0 ? (
        <View>
          {cartData.map((product, index) => {
                
            return (
              <View
                style={{
                  width: width * 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: width * 0.05,
                  paddingVertical: width * 0.05,
                }}>
                <Image
                  source={{uri: product.productImage}}
                  style={{width: 60, height: 60}}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    width: width / 1.8,
                  }}>
                  <Text style={styles.productName}>{product.productName}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}>
                    <TouchableOpacity
                      onPress={() => decreaseQuantity(product._id)}>
                      <View
                        style={[
                          styles.quantityBox,
                          {
                            marginLeft: width * 0.05,
                          },
                        ]}>
                        <Text
                          style={{
                            fontSize: 20,
                            color: '#fff',
                            fontWeight: '800',
                          }}>
                          -
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#333',
                      }}>
                      {quantity.toString()}
                    </Text>
                    <TouchableOpacity
                      onPress={() => increaseQuantity(product._id)}>
                      <View style={styles.quantityBox}>
                        <Text
                          style={{
                            fontSize: 20,
                            color: '#fff',
                            fontWeight: '800',
                          }}>
                          +
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => cartRemoveHandler(product._id)}>
                      <Icon
                        name="ios-trash"
                        size={30}
                        color="crimson"
                        style={{marginHorizontal: 10}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <Text style={styles.productPrice}>
                    $ {product.productPrice * quantity}
                  </Text>
                </View>
              </View>
            );
          })}
          <View
            style={{
              width: width * 1,
              height: 1,
              backgroundColor: '#999',
            }}
          />
          <View
            style={{
              width: width * 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: 20,
            }}>
            <Text style={{color: '#333', fontSize: 20, paddingLeft: 15}}>
              Total Price:
            </Text>
            <Text
              style={{
                color: 'crimson',
                fontSize: 22,
                paddingRight: 15,
                fontWeight: '700',
              }}>
              ${totalPrice}
            </Text>
          </View>
          <View
            style={{
              width: width * 1,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#3BB77E',
                width: width / 2 + 40,
                height: 50,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('OrderScreen')}>
              <Text style={{color: '#fff', fontSize: 18, fontWeight: '700'}}>
                Go to Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            height: height * 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#333', fontSize: 20, textAlign: 'center'}}>
            Your Cart is empty 😢
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  productName: {
    fontSize: 20,
    color: '#333',
    paddingHorizontal: width * 0.05,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 22,
    color: '#333',
    fontWeight: '700',
  },
  quantityBox: {
    width: 35,
    height: 35,
    backgroundColor: '#3BB77E',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
