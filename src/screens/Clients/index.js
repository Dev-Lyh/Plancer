/* eslint-disable prettier/prettier */
import { Text, ScrollView, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
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
          <Button onPress={this.handleModal} icon={'account-plus-outline'} color={'#7b68ee'} mode={'outlined'} style={{ borderColor: '#7b68ee', backgroundColor: '#372EDF50' }}>
            <Text>Adicionar Cliente</Text>
          </Button>
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
            <Button onPress={this.choosePhotoFromLibrary} icon={'camera'} color={'#7b68ee'} mode={'outlined'} style={{ borderColor: '#7b68ee', backgroundColor: '#372EDF50' }}>
              <Text>Escolher uma foto da galeria</Text>
            </Button>

            <LinearGradient colors={['rgba(88, 81, 231, 1)', 'rgba(88, 81, 231, 0)']} style={[styles.gradientContainer, { marginTop: 30 }]}>
              <TextInput activeUnderlineColor={'#7b68ee80'} style={styles.input} placeholder="Nome do Cliente" onChangeText={(value) => { this.setState({ name: value }); }} placeholderTextColor="rgba(255,255,255,0.5)" theme={{ colors: { text: 'white' } }} />
            </LinearGradient>

            <LinearGradient colors={['rgba(88, 81, 231, 1)', 'rgba(88, 81, 231, 0)']} style={styles.gradientContainer}>
              <TextInput activeUnderlineColor={'#7b68ee80'} style={styles.input} placeholder="Email" onChangeText={(value) => { this.setState({ email: value }); }} placeholderTextColor="rgba(255,255,255,0.5)" theme={{ colors: { text: 'white' } }} />
            </LinearGradient>

            <LinearGradient colors={['rgba(88, 81, 231, 1)', 'rgba(88, 81, 231, 0)']} style={styles.gradientContainer}>
              <TextInput activeUnderlineColor={'#7b68ee80'} style={styles.input} placeholder="Telefone do Cliente" onChangeText={(value) => { this.setState({ phoneNumber: value }); }} placeholderTextColor="rgba(255,255,255,0.5)" theme={{ colors: { text: 'white' } }} />
            </LinearGradient>
            <Button icon={'account-plus-outline'} onPress={() => this.InsertClient(this.state.name, this.state.email, this.state.phoneNumber, this.state.favorite, this.state.imgPath)} color={'#47ff97'} mode={'outlined'} style={{ borderColor: '#47ff97', backgroundColor: '#24c96b50' }}>
              <Text>Concluir Ação</Text>
            </Button>
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
                favoritar={this.Concluir}
                desfavoritar={this.Desconcluir}
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
    justifyContent: 'center',
    borderRadius: 4,
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
