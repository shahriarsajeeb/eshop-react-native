import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Layout/Header';
import Profile from '../components/User/Profile';
export default function ProfileScreen({navigation}) {
  return (
    <View>
      <Header navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Profile navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
