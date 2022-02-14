/* eslint-disable prettier/prettier */
import { Text, ScrollView, TextInput, StyleSheet, Button } from 'react-native';
import React, { Component } from 'react';

import Database from '../../db/database';
import Gig from '../../models/Gig';

import Card from '../../components/Card';

export default class NewGig extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Hello',
      description: 'Hello',
      gigDate: '12-06-2222',
      deadLine: '13-06-2222',
      price: '150,00',
      clientName: 'Oswald Cruz',
      phoneClient: '91999999',
      concluded: 'Sim',
      gigList: []
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
    db.InsertGig(newGig);
    this.ListGigs();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Add new gig</Text>
        <TextInput style={styles.input} placeholder="title" onChangeText={(value) => { this.setState({ title: value });}}/>

        <TextInput style={styles.input} placeholder="description" onChangeText={(value) => { this.setState({ description: value });}}/>

        <TextInput style={styles.input} placeholder="Gig Date" onChangeText={(value) => { this.setState({ gigDate: value });}}/>

        <TextInput style={styles.input} placeholder="DeadLine" onChangeText={(value) => { this.setState({ deadLine: value });}}/>

        <TextInput style={styles.input} placeholder="Price" onChangeText={(value) => { this.setState({ price: value });}}/>

        <TextInput style={styles.input} placeholder="Client name" onChangeText={(value) => { this.setState({ clientName: value });}}/>

        <TextInput style={styles.input} placeholder="Phone client" onChangeText={(value) => { this.setState({ phoneClient: value });}}/>

        <Button title="Add Gig" color={'darkblue'} onPress={() => this.InsertGig(this.state.title, this.state.description, this.state.gigDate, this.state.deadLine, this.state.price, this.state.clientName, this.state.phoneClient)}/>

      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: 'dodgerblue',
    width: '100%',
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginVertical: 10,
  },
});
