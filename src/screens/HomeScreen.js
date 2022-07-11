import {View, ScrollView, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Banner from '../components/Home/Banner';
import HomeProduct from '../components/Home/HomeProduct';
import Header from '../components/Layout/Header';
import {getProduct, getWishlist} from '../../Redux/Actions/ProductAction';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const {products, error} = useSelector(state => state.products);
  const {wishlistData} = useSelector(state => state.wishList);

  useEffect(() => {
    if(error){
      ToastAndroid.showWithGravity(
        `${error}`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
    dispatch(getProduct());
    dispatch(getWishlist());
  }, [dispatch,error]);
  


  return (
    <View>
      <Header navigation={navigation} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Banner />
            <HomeProduct
              products={products}
              navigation={navigation}
              wishlistData={wishlistData}
            />
      </ScrollView>
    </View>
  );
}
