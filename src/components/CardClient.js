/* eslint-disable prettier/prettier */
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import { Button, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Database from '../db/database';

export default class CardClient extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.borderBottom}>
          {
            this.props.image === ''
            ?
            <Avatar.Icon icon={'account-outline'} color='#c2c2c2' size={150} style={{ borderRadius: 10, backgroundColor: '#8c8c8c50', borderWidth: 1, borderColor: '#c2c2c2'}}/>
            :
            <Image style={{ width: 150, height: 150, borderRadius: 10 }} source={{ uri: this.props.image }} />
          }
          <Text style={styles.nameStyle}>{this.props.name}</Text>
          <Text style={styles.mailStyle}>{this.props.email}</Text>
          <Text style={styles.phoneStyle}>{this.props.phoneNumber}</Text>
        </View>
        <View style={styles.containerButtons}>
          <Button mode={'outlined'} color={this.props.favorite === 'false' ? '#4794ff' : '#ffb547'} style={{ backgroundColor: this.props.favorite === 'false' ? '#2469c950' : '#c9872450', borderColor: this.props.favorite === 'false' ? '#4794ff' : '#ffb547', }} icon={this.props.favorite === 'false' ? 'star-outline' : 'star'} onPress={this.props.favorite === 'false' ? () => this.props.favoritar(this.props.item) : () => this.props.desfavoritar(this.props.item)}>
            <Text>{this.props.favorite === 'false' ? 'Favoritar' : 'Desfavoritar'}</Text>
          </Button>
          <Button onPress={() => this.props.deletar(this.props.item.idClient)} icon={'delete'} color={'#ed7c68'} mode={'outlined'} style={{ backgroundColor: '#c93d2450', borderColor: '#ed7c68' }} >
            <Text>Excluir</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 140,
    backgroundColor: '#202020',
    marginBottom: 20,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerButtons: {
    alignItems: 'flex-end',
    height: 100,
    justifyContent: 'space-between',
  },
  nameStyle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  mailStyle: {
    color: 'white',
    marginBottom: 10,
  },
  phoneStyle: {
    color: 'slateblue',
  },
});
