/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';

import Routes from './src/routes';
import { StatusBar } from 'react-native';

LogBox.ignoreAllLogs();
export default class App extends Component {

  render() {
    return (
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor={'#181818'}/>
        <Routes />
      </NavigationContainer>
    );
  }
}
