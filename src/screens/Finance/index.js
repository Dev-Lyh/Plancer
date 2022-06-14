/* eslint-disable prettier/prettier */
import { View, StyleSheet, Text } from 'react-native';
import React, { Component } from 'react';

import InConstruction from '../../components/InConstruction';
export default class Finance extends Component {
  render() {
    return (
      <View style={styles.containerView}>
        <InConstruction />
        <Text style={styles.textVersion}>version 1.0.1</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textVersion: {
    color: 'silver',
    fontFamily: 'monospace',
  },
});
