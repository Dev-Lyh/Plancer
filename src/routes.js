/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/**
 * Icons
 */
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import FIcons from 'react-native-vector-icons/Feather';

/**
 * Screens
 */
import NewGig from './screens/NewGig';
import Gigs from './screens/Gigs';
import Finance from './screens/Finance';
import Clients from './screens/Clients';
import Calendar from './screens/Calendar';

const Tab = createBottomTabNavigator();

export default class Routes extends Component {
  render() {
    return (
      <Tab.Navigator initialRouteName="Gigs">
        <Tab.Screen
          name="Calendar"
          component={Calendar}
          options={{
            tabBarIcon: ({ color, size }) => (<MCIcons name="calendar-blank" color={color} size={size} />)}}
        />

        <Tab.Screen
          name="Clients"
          component={Clients}
          options={{
            tabBarIcon: ({ color, size }) => (<FIcons name="user" color={color} size={size} />)}}
        />

        <Tab.Screen
          name="New"
          component={NewGig}
          options={{
            tabBarIcon: ({ color, size }) => (<MIcons name="add" color={color} size={size} />)}}
        />

        <Tab.Screen
          name="Gigs"
          component={Gigs}
          options={{
            tabBarIcon: ({ color, size }) => (<MCIcons name="format-list-checkbox" color={color} size={size} />)}}
        />

        <Tab.Screen
          name="Finance"
          component={Finance}
          options={{
            tabBarIcon: ({ color, size }) => (<MCIcons name="piggy-bank-outline" color={color} size={size} />)}}
        />

      </Tab.Navigator>
    );
  }
}
