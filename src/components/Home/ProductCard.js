import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  addToWishlist,
  getWishlist,
  removeWishlist,
} from '../../../Redux/Actions/ProductAction';
import {useEffect} from 'react';

var {width} = Dimensions.get('window');

export default function ProductCard({product, navigation, wishlistData}) {
  const {user} = useSelector(state => state.user);

  const [click, setClick] = useState(false);
  const [data, setData] = useState('');
  const [touch, setTouch] = useState(false);
  const dispatch = useDispatch();

  const wishListHandler = async () => {
    setClick(true);
    await dispatch(
      addToWishlist(
        product.name,
        1,
        product.images[0].url,
        product.price,
        user._id,
        product._id,
        product.Stock,
      ),
    );
    ToastAndroid.showWithGravity(
      `${product.name} Added to wishlist`,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };

  const removeWishList = data => {
    setClick(false);
    setTouch(true);
    let id = data;
    dispatch(removeWishlist(id));
    ToastAndroid.showWithGravity(
      `${product.name} removed from wishlist`,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };

  useEffect(() => {
    if (wishlistData && wishlistData.length > 0) {
      wishlistData.map(data => {
        setData(data);
        if (data.productId === product._id && touch === false) {
          setClick(true);
        }
      });
    }
  }, [wishlistData]);

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('ProductDetails', {item: product, wishlistData})
        }>
        <View style={styles.ProductCard}>
          <Image source={{uri: product.images[0].url}} style={styles.image} />
          <View>
            <Text
              style={{
                color: '#333',
                paddingVertical: 5,
                textAlign: 'center',
              }}>
              {product.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                paddingBottom: 10,
              }}>
              <Text
                style={{
                  color: '#333',
                  paddingHorizontal: 10,
                  fontSize: 16,
                }}>
                ${product.price}
              </Text>
              <Text
                style={{
                  color: '#555',
                  fontSize: 12,
                  textDecorationLine: 'line-through',
                  marginLeft: -10,
                  marginTop: -5,
                }}>
                {product.offerPrice.length > 0
                  ? '$' + product.offerPrice
                  : null}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon name="star" color="#C68600" size={18} />
                <Text
                  style={{
                    color: '#333',
                    paddingHorizontal: 5,
                    fontSize: 16,
                  }}>
                  ({product.numOfReviews})
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            {click ? (
              <TouchableOpacity>
                <Icon
                  name="heart"
                  size={25}
                  style={{
                    marginRight: 10,
                    color: 'crimson',
                  }}
                  onPress={() => removeWishList(data._id)}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Icon
                  name="heart-outline"
                  size={25}
                  style={{
                    marginRight: 10,
                    color: '#333',
                  }}
                  onPress={wishListHandler}
                />
              </TouchableOpacity>
            )}
          </View>
          {product.Stock === 0 ? (
            <View style={styles.outOfStock}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 11,
                  textAlign: 'center',
                }}>
                Stock Limited
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  ProductCard: {
    width: width / 2 - 30,
    height: width / 1.7,
    borderRadius: 10,
    elevation: 8,
    backgroundColor: '#e5e5e5',
    flexWrap: 'wrap',
    margin: 10,
  },
  image: {
    width: '100%',
    height: width / 2 - 60,
    resizeMode: 'contain',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  outOfStock: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 50,
    position: 'absolute',
    top: -10,
    left: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
