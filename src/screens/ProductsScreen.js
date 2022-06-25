import {StyleSheet, Text, ScrollView} from 'react-native';
import React from 'react';
import Header from '../components/Layout/Header';
import Loader from '../components/Layout/Loader';
import ProductCard from '../components/Home/ProductCard';
import {useDispatch, useSelector} from 'react-redux';
import HomeProduct from '../components/Home/HomeProduct';

export default function ProductsScreen({navigation}) {

  return (
      <ScrollView>
        <Header navigation={navigation} />
       <Text>Product Screen</Text>
      </ScrollView>
  );
}

const styles = StyleSheet.create({});
