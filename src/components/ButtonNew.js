/* eslint-disable prettier/prettier */
import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/Feather';

export default class ButtonNew extends Component {
  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.props.focused ? '#5851E7' : '#2F28C1'}]}>
        <Icon name="plus" size={this.props.size} color={ this.props.focused ? '#FFF' : '#FFFFFF80'}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    
    height: 60,
    marginBottom: 30,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
