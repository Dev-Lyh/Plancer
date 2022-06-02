/* eslint-disable prettier/prettier */
import { TouchableOpacity, Text, ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../assets/Logo';

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

  DelGig = (id) => {
    const db = new Database();
    db.DeleteGig(id);
    this.ListGigs();
  }

  Conclud = () => {

  }

  render() {

    return (
      <ScrollView style={styles.marginH}>

        <View style={styles.header}>
          <Logo />
        </View>

        {
          this.state.gigList.length === 0
            ?
            <View style={styles.viewNoneGig}>
              <Text style={styles.noneGig}>Nenhum pedido adicionado</Text>
            </View>
            :
            this.state.gigList.map(
              item => (
                <Card
                  key={item.idGig}
                  item={item}
                  id={item.idGig}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  gigDate={item.gigDate}
                  deadLine={item.deadLine}
                  clientName={item.clientName}
                  phoneClient={item.phoneClient}
                  excluir={this.DelGig}
                  concluir={this.Conclud}
                />
              )
            )
        }
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
  viewNoneGig: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 500,
  },
  noneGig: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  marginH: {
    paddingHorizontal: 20,
    backgroundColor: '#181818',
  },
  containerButton: {
    height: 50,
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50 / 4,
  },
  icon: {
    marginRight: 10,
  },
  textBtn: {
    color: 'white',
    fontSize: 16,
  },
});
