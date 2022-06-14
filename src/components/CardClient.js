/* eslint-disable prettier/prettier */
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import Database from '../db/database';

export default class CardClient extends Component {

  handleFavorite = () => {
    if (this.props.favorite === 'false') {
      this.props.atualizar(this.props.item);
    } else if (this.props.favorite === 'true') {
      this.props.other(this.props.item);
    }
  }

  handleStar = () => {
    if (this.props.favorite === 'false') {
      return (
        <TouchableOpacity onPress={this.handleFavorite} style={styles.buttonsSpec}>
          <Icon name="star" size={24} color="silver" />
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Favoritar</Text>
        </TouchableOpacity>
      );
    } else if (this.props.favorite === 'true') {
      return (
        <TouchableOpacity onPress={this.handleFavorite} style={styles.buttonsSpec}>
          <Icon name="star-fill" size={24} color="white" />
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Desfavoritar</Text>
        </TouchableOpacity>
      );
    }
  }

  isImage = () => {
    if (this.props.image === "") {
      return (
        <View style={{ width: 150, height: 150, borderRadius: 10, backgroundColor: '#7b68ee', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={'person'} color={'#fff'} size={150} />
        </View>
      )

    } else {
      return <Image style={{ width: 150, height: 150, borderRadius: 10 }} source={{ uri: this.props.image }} />

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.borderBottom}>
          {this.isImage()}
          <Text style={styles.nameStyle}>{this.props.name}</Text>
          <Text style={styles.mailStyle}>{this.props.email}</Text>
          <Text style={styles.phoneStyle}>{this.props.phoneNumber}</Text>
        </View>
        <View style={styles.containerButtons}>
          {this.handleStar()}
          <TouchableOpacity style={styles.buttonsSpec} onPress={() => this.props.deletar(this.props.item.idClient)}>
            <Icon name="trash" size={24} color="mediumslateblue" />
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Excluir</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
    height: 100,
    justifyContent: 'space-between',
  },
  buttonsSpec: {
    width: 130,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#FFFFFF05',
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
