/* eslint-disable prettier/prettier */
import { Text, View, ScrollView, TextInput, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import React, { Component } from 'react';
import ImagePicker from 'react-native-image-crop-picker';

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
      imgPath: '',
      phoneClient: '',
      concluded: 'false',
      gigList: [],
    };
  }
    onSelectedImage = image => {
    const source = { uri: image.path };
    this.setState({ imgPath: source.uri });
    console.log('This is source.uri', source.uri, 'Type OF: ', typeof (source.uri));
    console.log('filePath STATE', this.state.imgPath);
  };

  choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 600,
      height: 400,
      cropping: true,
      cropperTintColor: '#5851e7',
      cropperToolbarColor: '#5851e7',
      cropperActiveWidgetColor: '#5851e7',
      cropperStatusBarColor: '#181818',
      cropperToolbarWidgetColor: '#ffffff',
      cropperToolbarTitle: 'Editar foto',
    }).then(image => {
      this.onSelectedImage(image);
      console.log(image);
    });
  }
  InsertGig = (title, description, gigDate, deadLine, price, clientName, phoneClient, concluded, imgPath) => {
    const g = new Gigs();
    const newGig = new Gig(title, description, gigDate, deadLine, price, clientName, phoneClient, concluded, imgPath);
    const db = new Database();
    db.InsertGig(newGig).then(g.ListGigs()).catch(error => console.log(error));
    this.setState({ imgPath: '' });
  }


  render() {
    return (
      <ScrollView style={styles.container}>

        <View style={styles.header}>
          <Logo />
        </View>

        <Text style={styles.titlePage}>Adicionar novo pedido</Text>
        {this.state.imgPath === '' ? (
          <View style={styles.imageEmptyBox}>
            <Text style={styles.noneImage}>Nenhuma imagem selecionada</Text>
          </View>
        ) : (
          <Image source={{ uri: this.state.imgPath }} style={styles.imageFullBox} />
        )}
        <Button title={'Escolher uma foto da galeria'} onPress={this.choosePhotoFromLibrary} color={'rgba(88, 81, 231, 1)'} />
        <LinearGradient colors={['rgba(88, 81, 231, 1)', 'rgba(88, 81, 231, 0)']} style={[styles.gradientContainer, { marginTop: 30 }]}>
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
          <TouchableOpacity onPress={() => this.InsertGig(this.state.title, this.state.description, this.state.gigDate, this.state.deadLine, this.state.price, this.state.clientName, this.state.phoneClient, this.state.concluded,this.state.imgPath)} style={styles.containerButton}>
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
  imageEmptyBox: {
    width: '100%',
    height: 200,
    backgroundColor: 'rgba(88, 81, 231, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageFullBox: {
    width: '100%',
    height: 200,
  },
  noneImage: {
    color: 'white',
    textAlign: 'center',
  },
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
