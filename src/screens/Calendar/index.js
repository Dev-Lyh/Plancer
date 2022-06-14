/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button } from 'react-native';
import React, { Component } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Database from '../../db/database';
import Logo from '../../assets/Logo';
import CardSchedule from '../../components/CardSchedule';
import Modal from 'react-native-modal';


LocaleConfig.locales.br = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'br';

export default class CalendarPage extends Component {

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
      modalInfo: true,
      gigList: [],
      dateList: [],
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

  showInfo = () => {
    if (this.state.modalInfo === false) {
      this.setState({ modalInfo: true });
    } else {
      this.setState({ modalInfo: false });
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Logo />
          <TouchableOpacity onPress={this.showInfo}>
            <LinearGradient colors={['#5851E7', '#38347F']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={styles.containerButtonInfo}>
              <Icon name={'info-outline'} color={'white'} size={28} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Modal isVisible={this.state.modalInfo}>
          <View style={styles.modalInfo}>
            <Icon name={'error'} color={'white'} size={48} />
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Resurso não implementado.</Text>
          </View>
          <Button color={'mediumslateblue'} title={'Fechar'} onPress={this.showInfo} />
        </Modal>

        <Calendar
          theme={{
            backgroundColor: '#181818',
            calendarBackground: '#181818',
            textSectionTitleColor: '#fff',
            textSectionTitleDisabledColor: '#fff',
            selectedDayBackgroundColor: '#fff',
            selectedDayTextColor: '#5851E7',
            todayTextColor: '#5851E7',
            dayTextColor: '#fff',
            textDisabledColor: '#a0a0a0',
            dotColor: '#5851E7',
            selectedDotColor: '#181818',
            arrowColor: '#5851E7',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: 'white',
            indicatorColor: 'blue',
            textDayFontFamily: 'sans-serif',
            textMonthFontFamily: 'sans-serif',
            textDayHeaderFontFamily: 'sans-serif',
            textDayFontWeight: 'bold',
            textMonthFontWeight: '400',
            textDayHeaderFontWeight: '400',
            textDayFontSize: 16,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 12,
          }}
          markedDates={{ '2022-06-02': { marked: true } }}
        />

        <LinearGradient colors={['#5851E7', '#38347F']} style={styles.lineAfterCalendar} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} />

        <View style={styles.sameLine}>
          <Text style={styles.text}>Cronograma</Text>
          <TouchableOpacity onPress={this.ListGigs}>
            <LinearGradient colors={['#5851E7', '#38347F']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={styles.containerButton}>
              <Text style={styles.textBtn}>Atualizar Lista</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {
            this.state.gigList.map(
              (item, index) => (
                <CardSchedule
                  key={index}
                  item={item}
                  id={index + 1}
                  title={item.title}
                  gigDate={item.gigDate}
                  deadLine={item.deadLine}
                />
              )
            )
          }
        </ScrollView>

      </View>
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
  text: {
    marginHorizontal: 5,
    marginVertical: 20,
    fontSize: 24,
    color: 'silver',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#181818',
    paddingHorizontal: 20,
  },
  lineAfterCalendar: {
    height: 5,
    width: '100%',
    borderRadius: 5,
    marginTop: 10,
  },
  containerButton: {
    height: 50,
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50 / 4,
  },
  containerButtonInfo: {
    height: 45,
    width: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50 / 2,
  },
  textBtn: {
    color: 'white',
    fontSize: 16,
  },
  sameLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  modalInfo: {
    backgroundColor: '#0c0945',
    paddingHorizontal: 25,
    alignItems: 'center',
    paddingVertical: 40,
  },
});
