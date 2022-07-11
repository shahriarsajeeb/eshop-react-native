import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from 'react-native';
import React from 'react';
import OrderSteps from './OrderSteps.js';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {useRef} from 'react';
import axios from 'axios';
import {URI} from '../../../Redux/URI.js';
import {createOrder} from '../../../Redux/Actions/OrderAction.js';

const {width} = Dimensions.get('window');

export default function Order({navigation}) {
  const {cartData} = useSelector(state => state.cart);
  const {user} = useSelector(state => state.user);
  const [active, setActive] = useState(1);
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [countryName, setCountryName] = useState('');
  const [cityName, setCityName] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [cardNumber, setCardNumber] = useState(0);
  const [cvc, setCvc] = useState(0);
  const [exp, setExp] = useState(0);
  const [success, setSuccess] = useState(false);

  // Be make sure that add it's on top
  const totalPrice = cartData.reduce((acc, curr) => acc + curr.productPrice, 0);

  const paymentData = {
    amount: Math.round(totalPrice * 100),
  };

  const order = {
    shippingInfo: address,
    phoneNumber,
    countryName,
    cityName,
    orderItems: cartData,
    itemsPrice: subtotal,
    shippingPrice: totalPrice > 100 ? 0 : 10,
    totalPrice: totalPrice,
  };

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const shippingDetailsHandler = () => {
    if (
      address.length > 0 &&
      phoneNumber.length > 0 &&
      countryName.length > 0 &&
      state.length > 0 &&
      cityName.length > 0
    ) {
      setActive(2);
    } else {
      ToastAndroid.showWithGravity(
        'Please fill all the fields',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  const confirmOrderHandler = () => {
    if (cartData.length > 0) {
      setActive(3);
    }
  };

  const submitHandler = async () => {
    if (cardNumber.length > 0 && cvc.length > 0 && exp.length > 0) {
      payBtn.current.disabled = true;

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const {data} = await axios.post(
          `${URI}/api/v2/payment/process`,
          paymentData,
          config,
        );

        const client_secret = data.client_secret;

        if (!stripe || !elements) return;

        const result = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.name,
              email: user.email,
              address: {
                line1: address,
                city: cityName,
                state: state,
                country: countryName,
              },
            },
          },
        });

        if (result.error) {
          payBtn.current.disabled = false;

          ToastAndroid.showWithGravity(
            result.error.message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            order.paymentInfo = {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            };

            dispatch(createOrder(order));
            setSuccess(true);
          } else {
            ToastAndroid.showWithGravity(
              'Payment failed',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          }
        }
      } catch (error) {
        payBtn.current.disabled = false;
        ToastAndroid.showWithGravity(
          'Payment failed',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    } else {
      ToastAndroid.showWithGravity(
        'Please fill all the fields',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  return (
    <View>
      <OrderSteps activeTab={active} />
      {active === 1 ? (
        <ShippingInfo
          activeTab={active}
          address={address}
          setAddress={setAddress}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          countryName={countryName}
          setCountryName={setCountryName}
          cityName={cityName}
          setCityName={setCityName}
          setState={setState}
          state={state}
          shippingDetailsHandler={shippingDetailsHandler}
        />
      ) : active === 2 ? (
        <Confirmation
          cartData={cartData}
          user={user}
          phoneNumber={phoneNumber}
          address={address}
          countryName={countryName}
          cityName={cityName}
          confirmOrderHandler={confirmOrderHandler}
          setSubtotal={setSubtotal}
        />
      ) : active === 3 ? (
        <View>
          <PaymentInfo
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            cvc={cvc}
            setCvc={setCvc}
            exp={exp}
            setExp={setExp}
            submitHandler={submitHandler}
            totalPrice={totalPrice}
          />
        </View>
      ) : null}
    </View>
  );
}

const ShippingInfo = ({
  address,
  setAddress,
  phoneNumber,
  setPhoneNumber,
  countryName,
  setCountryName,
  cityName,
  setCityName,
  shippingDetailsHandler,
  setState,
  state,
}) => {
  return (
    <ScrollView style={{marginTop: 50}}>
      <View style={styles.inputMain}>
        <TextInput
          placeholder="Enter your Address..."
          style={styles.input}
          placeholderTextColor={'#333'}
          textContentType="addressLine1"
          value={address}
          onChangeText={text => setAddress(text)}
        />
      </View>
      <View style={styles.inputMain}>
        <TextInput
          placeholder="Enter your Phone Number..."
          style={styles.input}
          placeholderTextColor={'#333'}
          textContentType="telephoneNumber"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
      </View>
      <View style={styles.inputMain}>
        <TextInput
          placeholder="Enter your Country Name..."
          style={styles.input}
          placeholderTextColor={'#333'}
          textContentType="countryName"
          value={countryName}
          onChangeText={text => setCountryName(text)}
        />
      </View>
      <View style={styles.inputMain}>
        <TextInput
          placeholder="Enter your City Name..."
          style={styles.input}
          placeholderTextColor={'#333'}
          textContentType="city"
          value={cityName}
          onChangeText={text => setCityName(text)}
        />
      </View>
      <View style={styles.inputMain}>
        <TextInput
          placeholder="Enter your State Name..."
          style={styles.input}
          placeholderTextColor={'#333'}
          textContentType="state"
          value={state}
          onChangeText={text => setState(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={shippingDetailsHandler}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const Confirmation = ({
  cartData,
  user,
  phoneNumber,
  address,
  countryName,
  cityName,
  confirmOrderHandler,
  setSubtotal,
}) => {
  return (
    <ScrollView style={styles.confirmation}>
      <View style={{marginBottom: 20}}>
        <Text
          style={{
            color: '#333',
            fontSize: 20,
            textAlign: 'center',
            paddingVertical: 10,
          }}>
          Your Shipping Address
        </Text>
        <Text style={{color: '#333', fontSize: 16, padding: 10}}>
          Name: {user.name}
        </Text>
        <Text style={{color: '#333', fontSize: 16, padding: 10}}>
          Phone: {phoneNumber}
        </Text>
        <Text style={{color: '#333', fontSize: 16, padding: 10}}>
          Address: {address}, {cityName}, {countryName}
        </Text>
      </View>
      <Text style={{color: '#333', fontSize: 20, textAlign: 'center'}}>
        Your Cart Items
      </Text>
      {cartData &&
        cartData.map((item, index) => {
          setSubtotal(item.productPrice);
          return (
            <View key={index} style={styles.confirmationTop}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{uri: item.productImage}}
                  style={{width: 50, height: 50, marginHorizontal: 10}}
                />
                <Text style={{color: '#333', marginHorizontal: 10}}>
                  {item.productName}
                </Text>
              </View>
              <Text style={{color: '#333', marginHorizontal: 10}}>
                {item.quantity} x ${item.productPrice} = ${item.productPrice}
              </Text>
            </View>
          );
        })}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTopWidth: 1,
          borderColor: '#00000036',
        }}>
        <Text style={{color: '#333', padding: 10, fontSize: 18}}>
          TotalPrice:
        </Text>
        <Text style={{color: '#333', padding: 10, fontSize: 16}}>
          ${cartData.reduce((acc, curr) => acc + curr.productPrice, 0)}
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={confirmOrderHandler}>
        <Text style={styles.buttonText}>Confirm Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const PaymentInfo = ({
  cardNumber,
  setCardNumber,
  cvc,
  setCvc,
  exp,
  setExp,
  totalPrice,
  submitHandler,
}) => {
  return (
    <ScrollView style={styles.confirmation}>
      <View>
        <Text style={{color: '#333', fontSize: 20, textAlign: 'center'}}>
          Card Info{' '}
        </Text>
        <View style={styles.inputMain}>
         <CardNumberElement style={styles.input} />
          {/* <TextInput
            placeholder="1234 1234 1234 1234"
            style={styles.input}
            placeholderTextColor={'#333'}
            textContentType="creditCardNumber"
            value={cardNumber}
            onChangeText={text => setCardNumber(text)}
          /> */}
        </View>
        <View style={styles.inputMain}>
          <TextInput
            placeholder="MM/YY"
            style={styles.input}
            placeholderTextColor={'#333'}
            textContentType="cvc"
            value={exp}
            onChangeText={text => setExp(text)}
          />
        </View>
        <View style={styles.inputMain}>
          <TextInput
            placeholder="CVC"
            style={styles.input}
            placeholderTextColor={'#333'}
            textContentType="cvc"
            value={cvc}
            onChangeText={text => setCvc(text)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text style={styles.buttonText}>Pay - ${totalPrice}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: '#00000036',
    borderWidth: 1,
    height: 50,
    color: '#333',
    borderRadius: 5,
    paddingLeft: 10,
  },
  inputMain: {
    width: width * 0.8,
    marginLeft: width * 0.1,
    marginVertical: 15,
    color: '#333',
  },
  button: {
    width: width * 0.8,
    marginLeft: width * 0.1,
    marginVertical: 20,
    backgroundColor: '#3BB77E',
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  confirmationTop: {
    width: width * 1,
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'space-between',
  },
});
