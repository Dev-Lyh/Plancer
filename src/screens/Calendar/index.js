/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { Component } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import Database from '../../db/database';
import Logo from '../../assets/Logo';
import CardSchedule from '../../components/CardSchedule';


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

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Logo />
        </View>

        <Calendar
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: 'blue',
            indicatorColor: 'blue',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
          markedDates={{'2022-06-02': {marked: true}}}
        />

        <LinearGradient colors={['#5851E7', '#38347F']} style={styles.lineAfterCalendar} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} />

        <View style={styles.sameLine}>
          <Text style={styles.text}>Cronograma</Text>
          <TouchableOpacity onPress={this.PushDate}>
            <LinearGradient colors={['#5851E7', '#38347F']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={styles.containerButton}>
              <Text style={styles.textBtn}>Atualizar Lista</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

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
});
