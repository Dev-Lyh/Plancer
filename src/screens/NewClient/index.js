/* eslint-disable prettier/prettier */
import { Button, View, TextInput } from 'react-native';
import React, { Component } from 'react';

import Database from '../../db/database';
import Client from '../../models/Client';

import Input from '../../components/Input';

export default class NewClient extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phoneNumber: '',
      clientList: [],
    };
  }

  InsertClient = (name, email, phoneNumber) => {
    const newClient = new Client(name, email, phoneNumber);
    const db = new Database();
    db.InsertClient(newClient);
  }

  render() {
    return (
      <View >
        <TextInput placeholder="title" onChangeText={(value) => { this.setState({ name: value }); }} />

        <TextInput placeholder="description" onChangeText={(value) => { this.setState({ email: value }); }} />

        <TextInput placeholder="Gig Date" onChangeText={(value) => { this.setState({ phoneNumber: value }); }} />

        <Button onPress={() => this.InsertClient(this.state.name, this.state.email, this.state.phoneNumber)} title="Cadastrar" />
      </View>
    );
  }
}
