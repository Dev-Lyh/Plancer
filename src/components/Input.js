/* eslint-disable prettier/prettier */
import { StyleSheet, TextInput } from 'react-native';
import React, { Component } from 'react';

export default class Input extends Component {
  render() {
    return (
      <TextInput placeholder={ this.props.placeholder } style={styles.input} onChangeText={ this.props.onchangetext }/>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: 'indigo',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 40,
  },
});
