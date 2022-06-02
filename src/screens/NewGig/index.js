/* eslint-disable prettier/prettier */
import { Text, View, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

import Database from '../../db/database';
import Gig from '../../models/Gig';

import Gigs from '../Gigs/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';


import Logo from '../../assets/Logo';
export default class NewGig extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      gigDate: '',
      deadLine: '',
      price: '',
      clientName: '',
      phoneClient: '',
      concluded: '',
      gigList: [],
    };
    this.ListGigs();
  }

  ListGigs = () => {
    const db = new Database();
    db.ListGigs().then(
      completeGigList => {
        this.setState({ gigList: completeGigList });
        console.log('Sua lista: ', completeGigList);
      }
    );
  }

  InsertGig = (title, description, gigDate, deadLine, price, clientName, phoneClient) => {
    const newGig = new Gig(title, description, gigDate, deadLine, price, clientName, phoneClient);
    const db = new Database();
    db.InsertGig(newGig).then(this.ListGigs());
  }

  render() {
    return (
      <ScrollView style={styles.container}>

        <View style={styles.header}>
          <Logo />
        </View>

        <Text style={styles.titlePage}>Adicionar novo pedido</Text>
        <LinearGradient colors={['rgba(88, 81, 231, 1)', 'rgba(88, 81, 231, 0)']} style={styles.gradientContainer}>
          <TextInput style={styles.input} placeholder="Título" onChangeText={(value) => { this.setState({ title: value }); }} placeholderTextColor="rgba(255,255,255,0.5)" />
        </LinearGradient>
        <LinearGradient colors={['rgba(88, 81, 231, 1)', 'rgba(88, 81, 231, 0)']} style={styles.gradientContainer}>
          <TextInput style={styles.input} placeholder="Descrição" multiline={true} onChangeText={(value) => { this.setState({ description: value }); }} placeholderTextColor="rgba(255,255,255,0.5)" />
        </LinearGradient>
        <LinearGradient colors={['rgba(88, 81, 231, 1)', 'rgba(88, 81, 231, 0)']} style={styles.gradientContainer}>
          <TextInput style={styles.input} placeholder="Data de Início" onChangeText={(value) => { this.setState({ gigDate: value }); }} placeholderTextColor="rgba(255,255,255,0.5)" />
        </LinearGradient>
        <LinearGradient colors={['rgba(88, 81, 231, 1)', 'rgba(88, 81, 231, 0)']} style={styles.gradientContainer}>
          <TextInput style={styles.input} placeholder="Data de Entrega" onChangeText={(value) => { this.setState({ deadLine: value }); }} placeholderTextColor="rgba(255,255,255,0.5)" />
        </LinearGradient>
        <LinearGradient colors={['rgba(88, 81, 231, 1)', 'rgba(88, 81, 231, 0)']} style={styles.gradientContainer}>
          <TextInput style={styles.input} placeholder="Preço" onChangeText={(value) => { this.setState({ price: value }); }} placeholderTextColor="rgba(255,255,255,0.5)" />
        </LinearGradient>
        <LinearGradient colors={['rgba(88, 81, 231, 1)', 'rgba(88, 81, 231, 0)']} style={styles.gradientContainer}>
          <TextInput style={styles.input} placeholder="Nome do cliente" onChangeText={(value) => { this.setState({ clientName: value }); }} placeholderTextColor="rgba(255,255,255,0.5)" />
        </LinearGradient>
        <LinearGradient colors={['rgba(88, 81, 231, 1)', 'rgba(88, 81, 231, 0)']} style={styles.gradientContainer}>
          <TextInput style={styles.input} placeholder="Nº de telefone do Cliente" onChangeText={(value) => { this.setState({ phoneClient: value }); }} placeholderTextColor="rgba(255,255,255,0.5)" />
        </LinearGradient>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => this.InsertGig(this.state.title, this.state.description, this.state.gigDate, this.state.deadLine, this.state.price, this.state.clientName, this.state.phoneClient)} style={styles.containerButton}>
            <Icon name="plus" color="white" size={32} style={{ marginHorizontal: 15 }} />
            <Text style={styles.textBtn}>Adicionar pedido</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 60 }}>
          <></>
        </View>

      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#181818',
    paddingVertical: 10,
  },
  titlePage: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gradientContainer: {
    height: 42,
    paddingVertical: 1,
    marginBottom: 20,
    paddingHorizontal: 1,
    borderRadius: 44 / 4,
  },
  input: {
    backgroundColor: '#202020',
    color: 'white',
    width: '100%',
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 40 / 4,
  },
  containerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#5851E7',
    minWidth: 150,
    borderRadius: 50 / 3,
  },
  textBtn: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 15,
  },
});
