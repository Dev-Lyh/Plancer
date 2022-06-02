/* eslint-disable prettier/prettier */
import { Text, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';

import Gears from '../assets/Gears.json';
import LottieView from 'lottie-react-native';

export default class InConstruction extends Component {
  render() {
    return (
      <View>
        <LottieView source={Gears} autoPlay={true} loop={true} />
        <Text style={styles.text}> Em construção </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 5,
    marginTop: 200,
  },
});
