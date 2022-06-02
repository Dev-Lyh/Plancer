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
import CalendarPage from './screens/Calendar';

/**
 * Components
 */
import ButtonNew from '../src/components/ButtonNew';

const Tab = createBottomTabNavigator();


export default class Routes extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Novo"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'rgba(88, 81, 231, 1)',
          tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
          tabBarStyle: {
            backgroundColor: '#181818',
            paddingTop: 5,
            paddingBottom: 5,
          },
        }}>
        <Tab.Screen
          name="Calendário"
          component={CalendarPage}
          options={{
            tabBarIcon: ({ color, size }) => (<MCIcons name="calendar-blank" color={color} size={size} />),
          }}
        />

        <Tab.Screen
          name="Clientes"
          component={Clients}
          options={{
            tabBarIcon: ({ color, size }) => (<FIcons name="user" color={color} size={size} />),
          }}
        />

        <Tab.Screen
          name="Novo"
          component={NewGig}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color, size, focused }) => (<ButtonNew color={color} size={size} focused={focused}/>),
          }}
        />

        <Tab.Screen
          name="Pedidos"
          component={Gigs}
          options={{
            tabBarIcon: ({ color, size }) => (<MCIcons name="format-list-checkbox" color={color} size={size} />),
          }}
        />

        <Tab.Screen
          name="Finanças"
          component={Finance}
          options={{
            tabBarIcon: ({ color, size }) => (<MCIcons name="piggy-bank-outline" color={color} size={size} />),
          }}
        />

      </Tab.Navigator>
    );
  }
}
