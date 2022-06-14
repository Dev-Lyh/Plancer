/* eslint-disable prettier/prettier */
import { Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, View, Image, Button } from 'react-native';
import React, { Component } from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';

import Database from '../../db/database';
import Client from '../../models/Client';

import CardClient from '../../components/CardClient';
import Logo from '../../assets/Logo';
export default class Clients extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      name: '',
      email: '',
      phoneNumber: '',
      imgPath: '',
      favorite: 'false',
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

  InsertClient = (name, email, phoneNumber, favorite, imgPath) => {
    const newClient = new Client(name, email, phoneNumber, favorite, imgPath);
    const db = new Database();
    db.InsertClient(newClient).then(
      this.ListClients());
    this.setState({ imgPath: '' });
    this.handleModal();
  }

  onSelectedImage = image => {
    const source = { uri: image.path };
    this.setState({ imgPath: source.uri });
    console.log('This is source.uri', source.uri, 'Type OF: ', typeof (source.uri));
    console.log('filePath STATE', this.state.imgPath);
  };

  choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 400,
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

  Concluir = (item) => {
    const db = new Database();
    db.UpdateToFavorite(item);
    this.ListClients();
  }
  Desconcluir = (item) => {
    const db = new Database();
    db.UpdateToUnfavorite(item);
    this.ListClients();
  }

  DeleteClient = (idClient) => {
    const db = new Database();
    db.DeleteClient(idClient);
    this.ListClients();
  }

  render() {
    return (
      <ScrollView style={styles.container}>

        <View style={styles.header}>
          <Logo />
          <TouchableOpacity onPress={this.handleModal}>
            <LinearGradient colors={['#5851E7', '#38347F']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={styles.containerButton}>
              <Icon name="touch-app" color="white" size={28} style={styles.icon} />
              <Text style={styles.textBtn}>Adicionar Cliente</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Modal isVisible={this.state.isVisible}>
          <View style={styles.containerModal}>
            <View style={styles.headerModal}>
              <Text style={styles.text}>Adicionar novo cliente</Text>
              <TouchableOpacity onPress={this.handleModal} style={styles.closeButton}>
                <LinearGradient colors={['#ED3D3D', 'rgba(255, 0, 0, 0.1)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.linearRed}>
                  <Icon name="close" color="white" size={24} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
            {this.state.imgPath === '' ? (
              <View style={styles.imageEmptyBox}>
                <Text style={styles.noneImage}>Nenhuma imagem selecionada</Text>
              </View>
            ) : (
              <Image source={{ uri: this.state.imgPath }} style={styles.imageFullBox} />
            )}
            <Button title={'Escolher uma foto da galeria'} onPress={this.choosePhotoFromLibrary} color={'rgba(88, 81, 231, 1)'}/>

            <LinearGradient colors={['rgba(88, 81, 231, 1)', 'rgba(88, 81, 231, 0)']} style={[styles.gradientContainer, { marginTop: 30 }]}>
              <TextInput style={styles.input} placeholder="Nome do Cliente" onChangeText={(value) => { this.setState({ name: value }); }} placeholderTextColor="rgba(255,255,255,0.5)" />
            </LinearGradient>

            <LinearGradient colors={['rgba(88, 81, 231, 1)', 'rgba(88, 81, 231, 0)']} style={styles.gradientContainer}>
              <TextInput style={styles.input} placeholder="Email" onChangeText={(value) => { this.setState({ email: value }); }} placeholderTextColor="rgba(255,255,255,0.5)" />
            </LinearGradient>

            <LinearGradient colors={['rgba(88, 81, 231, 1)', 'rgba(88, 81, 231, 0)']} style={styles.gradientContainer}>
              <TextInput style={styles.input} placeholder="Telefone do Cliente" onChangeText={(value) => { this.setState({ phoneNumber: value }); }} placeholderTextColor="rgba(255,255,255,0.5)" />
            </LinearGradient>

            <LinearGradient colors={['rgba(88, 81, 231, 1)', 'rgba(88, 81, 231, 0)']} style={styles.gradientContainerTwo} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <TouchableOpacity onPress={() => this.InsertClient(this.state.name, this.state.email, this.state.phoneNumber, this.state.favorite, this.state.imgPath)} style={styles.btnConcluded}>
                <Text style={styles.textConcluded}>Concluir Ação</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </Modal>

        {
          this.state.clientList.map(
            item => (
              <CardClient
                key={item.idClient}
                item={item}
                image={item.imgPath}
                name={item.name}
                email={item.email}
                phoneNumber={item.phoneNumber}
                favorite={item.favorite}
                deletar={this.DeleteClient}
                atualizar={this.Concluir}
                other={this.Desconcluir}
              />
            )
          )
        }

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
  headerModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerButton: {
    height: 50,
    width: 160,
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
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#181818',
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  text: {
    marginHorizontal: 5,
    marginBottom: 30,
    fontSize: 24,
    color: 'silver',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  linearRed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 120 / 20,
  },
  textButton: {
    fontSize: 18,
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  containerModal: {
    backgroundColor: '#181818',
    // minHeight: Dimensions.get('screen').height / 2,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 18,
  },
  gradientContainer: {
    height: 42,
    paddingVertical: 1,
    marginBottom: 30,
    paddingHorizontal: 1,
    borderRadius: 44 / 4,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#202020',
    color: 'white',
    width: '100%',
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 40 / 4,
  },
  gradientContainerTwo: {
    height: 42,
    paddingVertical: 1,
    marginBottom: 20,
    paddingHorizontal: 2,
    borderRadius: 44 / 4,
    justifyContent: 'center',
    marginTop: 10,
  },
  btnConcluded: {
    height: 36,
    backgroundColor: '#18181880',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textConcluded: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
