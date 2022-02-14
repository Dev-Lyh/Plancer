/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import LinearGradient from 'react-native-linear-gradient';

export default class Card extends Component {
  render() {


    return (
      <LinearGradient colors={['rgba(88, 81, 231, 1)', 'rgba(88, 81, 231, 0)']} style={styles.colorBorder}>
        <View style={styles.container}>
          <View style={styles.borderBottom}>
            <Text style={styles.title}>{ this.props.title }</Text>
            <Text style={styles.description}>{ this.props.description }</Text>
            <View style={styles.dateContainer}>
              <View>
                <Text style={styles.dateTitle}>Initial Date</Text>
                <Text style={styles.date}> { this.props.gigDate } </Text>
              </View>
              <View>
                <Text style={styles.dateTitle}>DeadLine</Text>
                <Text style={styles.date}> { this.props.deadLine } </Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Icon name="money-bill-wave" color="white" size={32}/>
            <Text style={styles.description}> R$ { this.props.price } </Text>
          </View>
          <Text style={styles.description}>{ this.props.clientName }</Text>
          <Text style={styles.description}>{ this.props.phoneClient }</Text>
          <Text style={styles.description}>Gig: { this.props.id }</Text>
        </View>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  colorBorder: {
    padding: 2,
  },
  container: {
    width: '100%',
    paddingHorizontal: 35,
    paddingVertical: 10,
    backgroundColor: '#202020',
  },
  borderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: '#383838',
    marginBottom: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  description: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateTitle: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
  date: {
    color: 'rgba(255, 255, 255, 0.6)',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});
