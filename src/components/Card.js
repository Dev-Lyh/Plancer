/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import { Button, Badge } from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome5';

import LinearGradient from 'react-native-linear-gradient';

export default class Card extends Component {
  handleConclud = (id) => {
    if (this.props.concluded === 'false') {
      this.props.concluir(id);
    }
  }
  isImage = () => {
    if (this.props.image === '') {
      return (
        <LinearGradient colors={['rgba(250, 250, 231, 1)', 'rgba(250, 250, 200, 1)']} style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: 200, opacity: this.props.concluded === "false" ? 1 : 0.5 }}>
          <Octicons name={'code-review'} color={this.props.concluded === 'false' ? '#7b68ee' : '#fff'} size={80} />
        </LinearGradient>
      )

    } else {
      return <Image style={{ width: '100%', height: 200, opacity: this.props.concluded === "false" ? 1 : 0.5 }} source={{ uri: this.props.image }} />;

    }
  }
  render() {
    return (
      <LinearGradient colors={['rgba(88, 81, 231, 1)', 'rgba(88, 81, 231, 0)']} style={styles.colorBorder}>
        {this.isImage()}
        <View style={styles.container}>
          <View style={styles.borderBottom}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.description}>{this.props.description === '' ? 'Sem descrição' : this.props.description}</Text>
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
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
            <Icon name="phone-alt" color="white" size={16} style={styles.marginRight} />
            <Text style={styles.phoneNumber}> {this.props.phoneClient === '' ? 'Sem número de telefone' : this.props.phoneClient}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            {
              this.props.concluded === 'false'
                ?
                <>
                  <Button icon={'delete'} onPress={() => this.props.excluir(this.props.id)} color={'#ed7c68'} mode={'outlined'} style={{ backgroundColor: '#c93d2450', borderColor: '#ed7c68' }}>
                    <Text>deletar</Text>
                  </Button>
                  <Button icon={'check'} onPress={() => this.handleConclud(this.props.item)} color={'#47ff97'} mode={'outlined'} style={{ backgroundColor: '#24c96b50', borderColor: '#47ff97' }}>
                    <Text>concluir</Text>
                  </Button>
                </>
                :
                <Button icon={'delete'} onPress={() => this.props.excluir(this.props.id)} color={'#ed7c68'} mode={'outlined'} style={{ backgroundColor: '#c93d2450', borderColor: '#ed7c68' }}>
                  <Text>deletar</Text>
                </Button>
            }
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center', marginTop: 20 }}>
            <Badge style={[styles.description, { backgroundColor: 'rgba(88, 81, 231, 1)', paddingHorizontal: 8 }]}>Pedido: {this.props.id}</Badge>
          </View>
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
