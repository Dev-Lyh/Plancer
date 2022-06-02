/* eslint-disable prettier/prettier */
import { Text, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';

import LinearGradient from 'react-native-linear-gradient';

export default class CardSchedule extends Component {
  render() {
    return (
      <View style={styles.container}>
          <LinearGradient colors={['rgba(88, 81, 231, 1)', 'rgba(88, 81, 231, 0)']} style={styles.colorBorder} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}/>
          <View style={styles.borderBottom}>
            <Text style={styles.title}>Pedido: {this.props.title}</Text>
            <View style={styles.dateContainer}>
              <View>
                <Text style={styles.dateTitle}>Data Inicial: {this.props.gigDate}</Text>
              </View>
              <View>
                <Text style={styles.dateTitle}>Data Final: {this.props.deadLine}</Text>
              </View>
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minWidth: 150,
    maxWidth: 250,
    marginBottom: 20,
  },
  colorBorder: {
    height: 6,
    width: 120,
    borderRadius: 6,
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
});
