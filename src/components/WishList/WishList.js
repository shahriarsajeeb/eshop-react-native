import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../../Redux/Actions/ProductAction';

var {width} = Dimensions.get('window');
var height = Dimensions.get('window').height;

export default function WishList({navigation}) {
  const {wishlistData} = useSelector(state => state.wishList);
  const {user} = useSelector(state => state.user);

  return (
    <View>
      {wishlistData.length > 0 ? (
        <View>
          {wishlistData.map((product, index) => {
            const dispatch = useDispatch();
            const addToCartHandler = async () => {
              let productName = product.productName;
              let quantity = product.quantity;
              let productImage = product.productImage;
              let productPrice = product.productPrice;
              let userId = user._id;
              let productId = product.productId;
              let Stock = product.Stock;

              await dispatch(
                addToCart(
                  productName,
                  quantity,
                  productImage,
                  productPrice,
                  userId,
                  productId,
                  Stock,
                ),
              );
              ToastAndroid.showWithGravity(
                `${product.productName} added to cart successfully`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              );
            };
            return (
              <View
                style={{
                  width: width * 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: width * 0.05,
                  paddingVertical: width * 0.05,
                }}
                key={index}>
                <Image
                  source={{uri: product.productImage}}
                  style={{width: 60, height: 60}}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    width: width / 3.3,
                  }}>
                  <Text style={styles.productName}>{product.productName}</Text>
                </View>
                <View>
                  <Text style={styles.productPrice}>
                    $ {product.productPrice}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: 110,
                    height: width * 0.1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#000',
                    marginLeft: width * 0.05,
                    borderRadius: 5,
                    marginRight: width * 0.05,
                  }}
                  onPress={addToCartHandler}>
                  <Text style={{color: '#fff', fontSize: 16}}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      ) : (
        <View
          style={{
            height: height * 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#333', fontSize: 20, textAlign: 'center'}}>
            Your wishList is empty 😢
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  productName: {
    fontSize: 20,
    color: '#333',
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 22,
    color: '#333',
    fontWeight: '700',
  },
});
