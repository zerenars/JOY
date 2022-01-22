/* eslint-disable consistent-this */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component } from 'react';
 import {
   ImageBackground,
   SafeAreaView,
   ScrollView,
   StatusBar,
   TouchableOpacity,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   Image,
   Alert,
   Section,
   Button,
   TextInput,
   Asyncstorage,
   Dimensions,
 } from 'react-native';
 import { Storage } from '../polka/Helpers';
 import { EventListener } from '../polka/EventListener';
 import { faAssistiveListeningSystems } from '@fortawesome/free-solid-svg-icons';
 export const SCREEN_WIDTH = Dimensions.get('window').width;
 export const SCREEN_HEIGHT = Dimensions.get('window').height;
 const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
 const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
 const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
 const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

 export default class LoginScreen extends Component {
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
       token: '',
       password: '',
       screen: this.props.navigation.getParam('screen'),
       //form Errors
       formError: false,
       formErrorTitle: 'Se requiere más información.',
       formErrorMessage: 'Error que no cambia',
       fcmTokenValue: 'Ready',
       isLogged: faAssistiveListeningSystems,
     };
   }

   componentDidMount() {
     // this._IDoRequest();
     this.getToken();
   }

   validateFormLogin() {
     // instancia = this;
     this.setState({
       formError: false,
       formErrorTitle: 'Se requiere más información.',
     });
     //IMPORTANTE: Antes validaba el email pero como puede venir el numero de cedula deje de validar esto

     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     let number_reg =
       /^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;
     // if(reg.test(instancia.state.email) === false) {
     //   instancia.setState({formError:true, formErrorMessage:"Debe ingresar una dirección válida de email."}, () => {
     //     instancia.showAlert();
     //   })
     //   return
     // }
     this.login();
   }
   //FCMTOKEN FIREBASE

   async getToken() {
     // const fcmToken = await messaging().getToken();

     // this.setState({fcmTokenValue: fcmToken}, () => {
     //   console.log('entro en getToken');
     // });

     Storage.get('user', (data) => {
       if (data != null && data != '') {
         this.props.navigation.navigate('Menu');
       }
     });
   }

   login() {
     var instancia = this;
     // this.setState({loading: true});
     // console.log('la url de login: ' + this.state.url);
     fetch('https://joy.studio54.app/gateway/Login', {
       method: 'POST',
       headers: new Headers({
         'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
       }),
       body:
         'email=' +
         this.state.email +
         '&password=' +
         this.state.password +
         '&token=' +
         this.state.token +
         '&fcmToken=' +
         this.state.fcmTokenValue, // <-- Post parameters
     })
       .then((response) => response.json())
       .then((json) => {
         if (json.status != 1) {
           instancia.setState(
             {
               formErrorTitle: 'Login',
               formErrorMessage: json.data.response.response.toString(),
             },
             () => {
               instancia.showAlert();
             }
           );
         }

         console.log('se hace login');

         this.setState({
           data: json.data.items,
           loading: false,
           networkError: false,
         });

         if (json.status == 0) {
           return;
         }
         console.log('el json vine asi', json.data);

         Storage.set('user', {
           token: json.data.response.token,
           fullname: json.data.response.fullname,
           user_id: json.data.response.user_id,
           //   phone: json.data.response.phone,
         }).then(() => {
           this.props.navigation.navigate('Menu');
         });
       })
       .catch((error) => {
         console.log(error);
         this.setState({
           networkError: true,
           loading: false,
           isLogged: true,
         });
       });
   }

   isLogged() {
     Storage.get('user', (val) => {
       if (val == null) {
         console.log('el usuario no se encuentra logeado');
         Alert.alert('El usuario no se encuentra loggeado');
         // this._IDoRequest()
         return;
       }
       console.log('token:', this.state.token);

       this.setState({ token: val.token, isLogged: true, logged: true });
       console.log('token:', this.state.token);
       // this._IDoRequest()
     });
   }

   showAlert() {
     instancia = this;
     Alert.alert(
       instancia.state.formErrorTitle,
       instancia.state.formErrorMessage,
       [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
       { cancelable: false }
     );
     console.log('continua');
   }

   render() {
     return (
      <ScrollView>
       <SafeAreaView style={{width:SCREEN_WIDTH,height: SCREEN_HEIGHT, flex: 1}}>
         <ImageBackground
           style={{ resizeMode: 'center', height: 750 }}
           source={require('../assets/isha.jpg')}
         >
           {/* source={require('../assets/yoga4.png')}> */}

             <View style={{ marginTop: 65 }}>
               <View>
                 {/* title="JOY"> */}
                 <Text
                   style={{
                     textAlign: 'center',
                     color: '#FFFAF0',
                     fontWeight: '200',
                     fontSize: 70,
                   }}
                 >
                   JOY
                 </Text>
               </View>

               <View>
                 <Text
                   style={{
                     textAlign: 'center',
                     color: '#FFFAF0',
                     fontWeight: '300',
                     fontSize: 30,
                   }}
                 >
                   ISHA JUDD
                 </Text>
               </View>

               <View style={{ marginTop: 50 }}>
                 <TouchableOpacity style={styles.buttonStyle}>
                   <TextInput
                     placeholder="Email"
                     placeholderTextColor="black"
                     onChangeText={(email) => this.setState({ email })}
                     style={{
                       textAlign: 'center',
                       color: 'black',
                       height: 35,
                       //  backgroundColor: 'black',
                     }}
                   />
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.buttonStyle}>
                   <TextInput
                     placeholder="Contraseña"
                     placeholderTextColor="black"
                     secureTextEntry={true}
                     onChangeText={(password) => this.setState({ password })}
                     style={{
                       textAlign: 'center',
                       color: 'black',
                       height: 35,
                       backgroundColor: 'transparent',
                     }}
                   />
                 </TouchableOpacity>
               </View>

               <TouchableOpacity
                 //    onPress={ () => this.props.navigation.navigate('Menu')}
                 //    onPress={() => this.login()}
                 style={styles.button2Style}
                 onPress={() => this.validateFormLogin()}
               >
                 <Text
                   style={{
                     marginTop: 5,
                     fontSize: 20,
                     // fontWeight: 250,
                     textAlign: 'center',
                     color: 'white',
                   }}
                 >
                   Ingresar
                 </Text>
               </TouchableOpacity>

               <View style={{ marginTop: 90 }}>
                 <TouchableOpacity
                   onPress={() => this.props.navigation.navigate('RecoveryCode')}
                 >
                   <Text
                     style={{
                       marginTop: 10,
                       textAlign: 'center',
                       color: '#FFFAF0',
                     }}
                   >
                     Olvidaste tu contraseña?
                   </Text>
                 </TouchableOpacity>
                 <TouchableOpacity
                   onPress={() => this.props.navigation.navigate('Register')}
                 >
                   <Text
                     style={{
                       marginTop: 10,
                       fontSize: 22,
                       textAlign: 'center',
                       color: '#FFFAF0',
                     }}
                   >
                     Crear una cuenta nueva
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
     //  backgroundColor: '#fff',
     backgroundColor: '#F8F8FF',
     marginStart: 24,
     marginEnd: 24,
     color: 'white',
   },
   button2Style: {
     marginTop: 20,
     marginBottom: 10,
     height: 40,
     //  backgroundColor: '#fff',
     backgroundColor: '#FF1493',
     marginStart: 24,
     marginEnd: 24,
     color: 'white',
   },
 });

