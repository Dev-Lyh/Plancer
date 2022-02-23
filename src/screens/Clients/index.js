/* eslint-disable prettier/prettier */
import { Text, Button, TextInput, ScrollView } from 'react-native';
import React, { Component } from 'react';
import Modal from 'react-native-modal';

import Database from '../../db/database';
import Client from '../../models/Client';

import Card from '../../components/Card';
export default class Clients extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      name: '',
      email: '',
      phoneNumber: '',
      clientList: [],
    };

    this.ListClients();
  }

  handleModal = () => {
    if (this.state.isVisible === false) {
      this.setState({ isVisible: true });
    } else if (this.state.isVisible === true) {
      this.setState({ isVisible: false });
    }
  };

  ListClients = () => {
    const db = new Database();
    db.ListClients().then(
      completeClientList => {
        this.setState({ clientList: completeClientList });
        console.log('Sua lista de Clients: ', completeClientList);
      }
    );
  }

  InsertClient = (name, email, phoneNumber) => {
    const newClient = new Client(name, email, phoneNumber);
    const db = new Database();
    db.InsertClient(newClient).then(
      this.ListClients);
  }

  render() {
    return (
      <ScrollView>
        <Button title="Open" color="indigo" onPress={this.handleModal} />

        <Modal isVisible={this.state.isVisible}>
          <Button title="CLOSE" color="black" onPress={this.handleModal} />
          <TextInput placeholder="title" onChangeText={(value) => { this.setState({ name: value }); }} />

          <TextInput placeholder="description" onChangeText={(value) => { this.setState({ email: value }); }} />

          <TextInput placeholder="Gig Date" onChangeText={(value) => { this.setState({ phoneNumber: value }); }} />

          <Button onPress={() => this.InsertClient(this.state.name, this.state.email, this.state.phoneNumber)} title="Cadastrar" />
        </Modal>

        {
          this.state.clientList.map(
            (item, index) => (
              <Card
                key={index}
                item={item}
                id={index + 1}
                title={item.name}
                description={item.email}
                phoneClient={item.phoneNumber}
              />
            )
          )
        }

        <Text>Clients Screen</Text>
      </ScrollView>
    );
  }
}
