/* eslint-disable prettier/prettier */
import { View } from 'react-native';
import React, { Component } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';

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
      listDates: {
        '2022-02-16': { marked: true, dotColor: '#5851E7' },
        '2022-02-17': { marked: true, dotColor: '#5851E7' },
        '2022-02-18': { marked: true },
      },
    };
  }

  render() {

    console.log(this.state.listDates);
    return (
      <View>
        <Calendar

          onDayPress={(day) => console.log(day.dateString)}

          markedDates={this.state.listDates}

          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#181818',
            textSectionTitleColor: '#d1d1d1',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#38347F',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#FFF',
            todayBackgroundColor: '#5851E7',
            dayTextColor: '#FFF',
            textDisabledColor: '#38347F',
            dotColor: '#000',
            selectedDotColor: '#ffffff',
            arrowColor: '#5851E7',
            disabledArrowColor: '#262449',
            monthTextColor: 'white',
            indicatorColor: 'purple ',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
            textDayFontSize: 16,
            textMonthFontSize: 24,
            textDayHeaderFontSize: 14,
          }}
        />
      </View>
    );
  }
}
