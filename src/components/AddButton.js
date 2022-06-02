/* eslint-disable prettier/prettier */
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';

export default class AddButton extends Component {
  render() {
    return (
      <TouchableOpacity>
        <Text>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}
