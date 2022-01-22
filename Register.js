/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Section,
  TextInput,
  Asyncstorage,
  Dimensions,
} from 'react-native';
import {Storage} from '../polka/Helpers';
import {EventListener} from '../polka/EventListener';
import {Button, Paragraph, Menu, Divider, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      //   url: GLOBALS.BASE_URL + props.navigation.getParam('url'),
      formView: false,
      networkError: false,
      formType: props.navigation.getParam('form_type'),
      buttonTitle: props.navigation.getParam('buttonTitle'),
      //form data:
      email: '',
      fullname: '',
      password: '',
      confirmPass: '',
      screen: this.props.navigation.getParam('screen'),
      //form Errors
      formError: false,
      formErrorTitle: 'Se requiere más información.',
      formErrorMessage: 'Error que no cambia',
      fcmTokenValue: 'Ready',
    };
  }

  componentDidMount() {
    // this._IDoRequest();
    this.getToken();
  }

  validateFormRegister() {
    // instancia = this;
    this.setState({
      formError: false,
      formErrorTitle: 'Se requiere más información.',
    });

    if (this.state.fullname.length < 2) {
      this.setState(
        {formError: true, formErrorMessage: 'Debe ingresar un nombre válido'},
        () => {
          this.showAlert();
        },
      );

      console.log('el error: ', this.state.formErrorMessage);
      return;
    }

    // if(instancia.state.lastname.length < 2){
    //   instancia.setState({formError:true, formErrorMessage:"Debe ingresar un apellido válido"}, () => {
    //     instancia.showAlert();
    //   })
    //   return;
    // }

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let number_reg =
      /^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;

    if (reg.test(this.state.email) === false) {
      this.setState(
        {
          formError: true,
          formErrorMessage: 'Debe ingresar una dirección válida de email.',
        },
        () => {
          this.showAlert();
        },
      );
      return;
    }

    // if(number_reg.test(this.state.phone) === false) {
    //   instancia.setState({formError:true, formErrorMessage:"Debe ingresar un numero de telefono con formato internacional ej: +595981321000."}, () => {
    //     instancia.showAlert();
    //   })
    //   return
    // }

    // if(instancia.state.password.length < 6) {
    //   instancia.setState({formError:true, formErrorMessage:"Las contraseña debe tener al menos 6 caracteres."}, () => {
    //     instancia.showAlert();
    //   })
    //   return
    // }

    if (this.state.password != this.state.confirmPass) {
      this.setState(
        {
          formError: true,
          formErrorMessage: 'Las contraseñas deben coincidir.',
        },
        () => {
          this.showAlert();
        },
      );
      return;
    }

    this.register();
  }

  async getToken() {
    const fcmToken = await getToken();

    this.setState({fcmTokenValue: fcmToken}, () => {
      console.log('entro en getToken');
    });
  }

  register() {
    var instancia = this;
    fetch('https://joy.studio54.app/gateway/Register', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
      }),
      body:
        'password=' +
        this.state.password +
        '&fullname=' +
        this.state.fullname +
        '&email=' +
        this.state.email +
        '&token=' +
        this.state.token, // <-- Post parameters
    })
      .then(response => response.json())
      .then(json => {
        if (json.status != 1) {
          instancia.setState(
            {
              formErrorTitle: 'Register',
              formErrorMessage: json.data.response.response.toString(),
            },
            () => {
              instancia.showAlert();
            },
          );
        }

        console.log('Inner data: ', json.data);

        this.setState({
          data: json.data.items,
          networkError: false,
        });
        if (json.status == 0) {
          return;
        }

        Storage.set('user', {
          // token: this.state.token,
          // fullname: this.state.fullname,
          token: json.data.response.token,
          fullname: json.data.response.fullname,
          //phone: json.data.response.phone,
        }).then(() => EventListener.dispatchEvent('user'));

        this.props.navigation.navigate('Menu');
        //EventListener.dispatchEvent("user")
      })
      .catch(error => {
        console.log(error);
        this.setState({
          networkError: true,
          loading: false,
        });
      });
  }

  showAlert() {
    instancia = this;
    Alert.alert(
      instancia.state.formErrorTitle,
      instancia.state.formErrorMessage,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
    console.log('continua');
  }

  render() {
    return (
      <ScrollView style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}>
        <SafeAreaView
          style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT, flex: 1}}>
          <ImageBackground
            style={{height: 750}}
            source={require('../assets/isha.jpg')}>
            <View style={{marginTop: 110}}>
              <View>
                {/* title="JOY"> */}
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#FFFAF0',
                    fontWeight: '200',
                    fontSize: 70,
                  }}>
                  JOY
                </Text>
              </View>

              <View style={{alignItems: 'center', marginTop: 50}}>
                <TextInput
                  placeholder="Nombre Completo"
                  placeholderTextColor="black"
                  onChangeText={fullname => this.setState({fullname})}
                  style={{
                    marginTop: 10,
                    textAlign: 'center',
                    color: 'black',
                    height: 40,
                    width: '90%',
                    backgroundColor: 'white',
                  }}
                />
              </View>

              <View style={{alignItems: 'center'}}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="black"
                  onChangeText={email => this.setState({email})}
                  style={{
                    marginTop: 20,
                    textAlign: 'center',
                    color: 'black',
                    height: 40,
                    backgroundColor: 'white',
                    width: '90%',
                  }}
                />
              </View>

              <View style={{alignItems: 'center'}}>
                <TextInput
                  placeholder="Contraseña"
                  placeholderTextColor="black"
                  secureTextEntry={true}
                  onChangeText={password => this.setState({password})}
                  style={{
                    marginTop: 20,
                    textAlign: 'center',
                    color: 'black',
                    height: 40,
                    backgroundColor: 'white',
                    width: '90%',
                  }}
                />
              </View>

              <View style={{alignItems: 'center'}}>
                <TextInput
                  placeholder="Confirmar Contraseña"
                  placeholderTextColor="black"
                  secureTextEntry={true}
                  onChangeText={confirmpass => this.setState({confirmpass})}
                  style={{
                    marginTop: 20,
                    textAlign: 'center',
                    color: 'black',
                    height: 40,
                    backgroundColor: 'white',
                    width: '90%',
                  }}
                />
              </View>

              <View style={{marginTop: 100}}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => this.register()}>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 15,
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    Registrarme
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    backgroundColor: '#FF1493',
    marginStart: 24,
    marginEnd: 24,
    color: 'white',
    opacity: 0.8,
  },
});
