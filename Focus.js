/* eslint-disable eqeqeq */
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
 import Icon from 'react-native-vector-icons/FontAwesome';
 import { Card, ListItem } from 'react-native-elements';
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
   Section,
   FlatList,
   Asyncstorage,
   Dimensions,
 } from 'react-native';
 import Ionicons from 'react-native-vector-icons/Ionicons';
 import { Storage } from '../polka/Helpers';
 import { EventListener } from '../polka/EventListener';
 import { Button, Paragraph, Menu, Divider, Provider } from 'react-native-paper';

 import FastImage from 'react-native-fast-image';
 export const SCREEN_WIDTH = Dimensions.get('window').width;
 export const SCREEN_HEIGHT = Dimensions.get('window').height;
 const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
 const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
 const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
 const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

 export default class FocusScreen extends Component {
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
       message: '',
       token: '',
       screen: this.props.navigation.getParam('screen'),
       //form Errors
       formError: false,
       formErrorTitle: 'Se requiere más información.',
       formErrorMessage: 'Error que no cambia',
       fcmTokenValue: 'Ready',
       isLogged: false,
       visible: false,
     };
   }
   _openMenu = () => this.setState({ visible: true });

   _closeMenu = () => this.setState({ visible: false });

   componentDidMount() {
     this.isLogged();
     // this.focus();
   }

   isLogged() {
     Storage.get('user', (val) => {
       if (val == null) {
         console.log('el usuario no se encuentra logeado');
         this.props.navigation.navigate('LoginScreen');
         return;
       }
       console.log('token:', this.state.token);

       this.setState({ token: val.token, isLogged: true, logged: true });
       console.log('token:', this.state.token);
       this.focus();
     });
   }

   performLogout() {
     Storage.set('user', null).then(() => {
       // EventListener.dispatchEvent('user');
       console.log('se hace el logout');
       this.setState({ logged: false, token: '' }, () => {
         this.props.navigation.navigate('Login');
       });
     });
   }

   showAlert() {
     // instancia = this;
     Alert.alert(
       this.state.formErrorTitle,
       this.state.formErrorMessage,
       [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
       { cancelable: false }
     );
     console.log('continua');
   }

   focus() {
     let instancia = this;
     fetch('https://joy.studio54.app/gateway/getFocoOfTheDay', {
       method: 'POST',
       headers: new Headers({
         'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
       }),
       body: 'token=' + this.state.token,
     })
       .then((response) => response.json())
       .then((json) => {
         if (json.status != 1) {
           this.setState(
             {
               formErrorTitle: 'GetFoco',
               formErrorMessage: json.data.response.response.toString(),
             },
             () => {
               this.showAlert();
             }
           );
         }

         console.log('Entro');
         console.log(json.data);

         this.setState({
           data: json.data.items,
           message: json.data,
           loading: false,
           networkError: false,
         });

         if (json.status == 0) {
           return;
         }

         // Storage.set('user', {
         //   token: json.data.response.token,
         //   // fullname: json.data.response.fullname,
         // //   phone: json.data.response.phone,
         // }).then(() => {
         //   EventListener.dispatchEvent('user');
         // });
       })
       .catch((error) => {
         console.log(error);
         this.setState({
           networkError: true,
           loading: false,
         });
       });
   }

   render() {
     return (
      // <ScrollView >
       <SafeAreaView style={{width:SCREEN_WIDTH,height: SCREEN_HEIGHT, flex: 1}}>
         <ImageBackground
           style={{ resizeMode: 'contain', height: 750 }}
           source={require('../assets/pink.jpg')}
         >
           <View
             style={{
               width: '100%',
               margin: 5,
               position: 'absolute',
               zIndex: 100,
               alignItems: 'flex-start',
             }}
           >
         {/* <Provider>
               <Menu
                 margin={0}
                 backgroundColor={'black'}
                 visible={this.state.visible}
                 onDismiss={this._closeMenu}
                 anchor={
                   <Button style={{ margin: 0 }} onPress={this._openMenu}>
                     <Icon name="bars" color="deeppink" size={25} />
                   </Button>
                 }
               >
                 <Menu.Item
                   onPress={() => {}}
                   style={{ margin: 2 }}
                   title="Instrucciones"
                 />
                 <Menu.Item
                   onPress={() => {}}
                   style={{ margin: 2 }}
                   title="Próximos eventos"
                 />

                 <Menu.Item
                   onPress={() => {}}
                   style={{ margin: 2 }}
                   title="Conferencia Isha"
                 />
                 <Menu.Item
                   onPress={() => {}}
                   style={{ margin: 2 }}
                   title="Aprender el Sistema Isha Judd"
                 />
                 <Menu.Item
                   onPress={() => {}}
                   style={{ margin: 2 }}
                   title="Contáctanos"
                 />
                 <Menu.Item
                   onPress={() => {
                     this.performLogout();
                   }}
                   style={{ margin: 2 }}
                   title="Cerrar sesión"
                 />
               </Menu>
             </Provider> */}
           </View>

             <View style={{ marginTop: 30 }}>
               <View>
                 {/* title="JOY"> */}
                 <Text
                   style={{
                     textAlign: 'center',
                     color: 'black',
                     fontWeight: '300',
                     fontSize: 70,
                   }}
                 >
                   JOY
                 </Text>
               </View>

               <View style={{ marginTop: 10 }}>
                 <Text
                   style={{
                     fontSize: 25,
                     padding: 10,
                     marginTop: 5,
                     textAlign: 'center',
                     color: 'black',
                   }}
                 >
                   FOCO DEL DÍA
                 </Text>
                 {/* </TouchableOpacity> */}
               </View>

               <Card style={{ borderRadius: 50 }}>
                 <View style={{ borderRadius: 30 }}>
                   <Text
                     style={{
                       padding: 10,
                       textAlign: 'center',
                       color: 'black',
                     }}
                   >
                     {this.state.message}
                     {/* "El viaje hacia la felicidad no es otra cosa más que cambiar las elecciones que hasta ahora hemos hecho.
                   Ahora, con la práctica comprometida del sistema, tiene la posibilidad de que sea tu conciencia quien elija, pero tienes que hacerlo! En este punto ya no es automático. Tenemos que hacer elecciones diferentes si queremos resultados diferentes.
                   Hasta que asumamos la responsabilidad de nuestra propia felicidad, hasta que nos demos cuenta de que nosotros y solamente nosotros podemos construirla y que somos responsables de nuestro bienestar, permaneceremos insatisfechos. " */}
                   </Text>
                   {/* </TouchableOpacity> */}
                 </View>
                 <View>
                   <Text
                     style={{
                       padding: 10,
                       marginTop: 10,
                       textAlign: 'center',
                       color: 'black',
                     }}
                   >
                     ISHA JUDD
                   </Text>
                   <Text
                     style={{
                       textAlign: 'center',
                       color: 'black',
                     }}
                   >
                     Libro: ¿Por qué caminar si puedes volar?
                   </Text>
                   {/* </TouchableOpacity> */}
                 </View>
               </Card>
             </View>

         </ImageBackground>
       </SafeAreaView>
      //  </ScrollView>
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
     backgroundColor: '#000',
     marginStart: 24,
     marginEnd: 24,
     color: 'white',
   },
 });

