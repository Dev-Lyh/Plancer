/* eslint-disable prettier/prettier */
import { Button, ScrollView, StyleSheet } from 'react-native';
import React, { Component } from 'react';

import Database from '../../db/database';

import Card from '../../components/Card';
export default class Gigs extends Component {

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

  render() {

    return (
      <ScrollView style={styles.marginH}>
        <Button title="UPDATE LIST" onPress={this.ListGigs} color="indigo"/>
        {
            this.state.gigList.map(
              (item, index) => (
                <Card
                  key={index}
                  item={item}
                  id={index + 1}
                  title={item.title}
                  description={item.description}
                  price = {item.price}
                  gigDate={item.gigDate}
                  deadLine={item.deadLine}
                  clientName={item.clientName}
                  phoneClient={item.phoneClient}
                  excluir={this.Excluir}
                  concluir={this.Concluir}
                />
              )
            )
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  marginH: {
    marginHorizontal: 20,
  },
});
