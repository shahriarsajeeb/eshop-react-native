import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Layout/Header';
import Order from '../components/Order/Order';
import {useState} from 'react';
import axios from 'axios';
import {URI} from '../../Redux/URI';
import {useEffect} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

export default function OrderScreen({navigation}) {
  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {
    const {data} = await axios.get(`${URI}/api/v2/stripeapikey`);

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
  }, []);

  return (
    <View>
      <Header navigation={navigation} />
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Order navigation={navigation} />
      </Elements>
    </View>
  );
}
