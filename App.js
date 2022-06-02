/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';

import Routes from './src/routes';
import { StatusBar } from 'react-native';

LogBox.ignoreLogs(['Possible Unhandled Promise Rejection'], [" Can't call setState on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the Gigs component."]);
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
