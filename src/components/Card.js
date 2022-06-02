/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import LinearGradient from 'react-native-linear-gradient';

export default class Card extends Component {
  render() {
    return (
      <LinearGradient colors={['rgba(88, 81, 231, 1)', 'rgba(88, 81, 231, 0)']} style={styles.colorBorder}>
        <View style={styles.container}>
          <View style={styles.borderBottom}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.description}>{this.props.description}</Text>
            <View style={styles.dateContainer}>
              <View>
                <Text style={styles.dateTitle}>Initial Date</Text>
                <Text style={styles.date}> {this.props.gigDate} </Text>
              </View>
              <View>
                <Text style={styles.dateTitle}>DeadLine</Text>
                <Text style={styles.date}> {this.props.deadLine} </Text>
              </View>
            </View>
          </View>
          <View style={styles.dateContainer}>
            <View style={styles.alignCenterOther}>
              <Icon name="money-bill-wave" color="white" size={32} style={styles.icon} />
              <Text style={styles.money}> R$ {this.props.price} </Text>
            </View>
            <View style={styles.alignCenterOther}>
              <Icon name="user-alt" color="white" size={32} style={styles.icon} />
              <Text style={styles.clientName}>Cliente: {this.props.clientName}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="phone-alt" color="white" size={16} style={styles.marginRight}/>
            <Text  style={styles.phoneNumber}> {this.props.phoneClient}</Text>
          </View>
          <Text style={styles.description}>Pedido: {this.props.id}</Text>
          <TouchableOpacity onPress={() => this.props.excluir(this.props.id)}>
            <Text>DELETAR</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.concluir(this.props.id)}>
            <Text>EDITAR</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  colorBorder: {
    padding: 2,
    marginBottom: 30,
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  clientName: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
    letterSpacing: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  money: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
    letterSpacing: 1,
    textAlign: 'center',
    fontWeight: 'bold',
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
  alignCenter: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: 5,
  },
  alignCenterOther: {
    alignItems: 'center',
    backgroundColor: '#282828',
    width: 145,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 145 / 10,
  },
  phoneNumber: {

    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    height: 30,
    lineHeight: 30,
  },
  marginRight: {
    marginRight: 10,
  },
});
