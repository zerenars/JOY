/* eslint-disable no-alert */
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
 import Ionicons from 'react-native-vector-icons/Ionicons';
 import React, { Component, useRef } from 'react';

 //  import Moment from 'moment';

 import {
   Switch,
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
   Dimensions,
 } from 'react-native';

// import messaging from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';

 import DateTimePicker from 'react-native-modal-datetime-picker';
 import { Button, Paragraph, Menu, Divider, Provider } from 'react-native-paper';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import FastImage from 'react-native-fast-image';
 import { EventListener } from '../polka/EventListener';
 import { Storage } from '../polka/Helpers';
 export const SCREEN_WIDTH = Dimensions.get('window').width;
 export const SCREEN_HEIGHT = Dimensions.get('window').height;
 const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
 const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
 const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
 const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

 //  const { selectedHours, selectedMinutes } = this.state;

 export default class GongScreen extends Component {
   constructor(props) {
     super(props);
     this.state = {
       isEnabled: false,
       selectedHours: '',
       selectedMinutes: '',
       visible: false,
       isDateTimePickerVisible: false,
       isDateTimePickerVisible2: false,
       rawTime: '',
       rawTime2: '',
       timeWithZeros: '',
       timeWithZeros2: '',
       email: '',
       fullname: '',
       token: '',
       password: '',
       formView: false,
       networkError: false,
       formError: false,
       formErrorTitle: 'Se requiere más información.',
       formErrorMessage: 'Error que no cambia',
       fcmTokenValue: 'Ready',
       data: [],
       isLogged: false,
       logged: false,
       gong_state: 0,
       gong_start: '',
       gong_end: '',
       user_id: '',
       backgroundColor: '',
       backgroundColor2: '',
     };
   }

   componentDidMount() {
    EventListener.addEventListener(this, 'user', (d) => {
      this.checkPermission();
    });
    this.checkPermission();
  //  this._IDoRequest()
    this.createNotificationListeners();
     this.isLogged();
     // this.focus();
   }




   isLogged() {
     Storage.get('user', (val) => {
       if (val == null) {
         console.log('el usuario no se encuentra logeado');
         this.props.navigation.navigate('Login');
         return;
       }

       console.log('token:', this.state.token);

       this.setState({
         user_id: val.user_id,
         token: val.token,
         isLogged: true,
         logged: true,
       });
       console.log('token:', this.state.token);
       //  this.focus();
     });
   }




     checkPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();


    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {

      await messaging().registerDeviceForRemoteMessages();
      await this.getToken();


    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
      this._IDoRequest();
    }
  }

  async getToken(){

    const fcmToken = await messaging().getToken();

    this.setState({fcmTokenValue: fcmToken},() =>{
      console.log('entro en getToken');
      this.isLogged();

      Storage.set('fcmToken', JSON.stringify(fcmToken));
      return;
    });

  }


  async createNotificationListeners() {

    // // This listener triggered when notification has been received in foreground
    // this.notificationListener = firebase.notifications().onNotification((notification) => {
    //   const { title, body } = notification;
    //   this.displayNotification(title, body);
    // });

    // This listener triggered when app is in backgound and we click, tapped and opened notifiaction
    this.notificationOpenedListener = messaging().onNotificationOpenedApp( notificationOpen => {
      const { title, body } = notificationOpen.notification;
      this.displayNotification(title, body);
    });

    // This listener triggered when app is closed and we click,tapped and opened notification
    const notificationOpen = await messaging().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.displayNotification(title, body);
    }
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
     alert(
       this.state.formErrorTitle,
       this.state.formErrorMessage,
       [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
       { cancelable: false }
     );
     console.log('continua');
   }

   getGongTime() {
     var instancia = this;
    //  this.setState({ gong_state: 1 });
     //  () => {

     // console.log({
     //   user_id: this.state.user_id,
     //   gong_start: this.state.gong_start,
     //   gong_end: this.state.gong_end,
     //   gong_state: this.state.gong_state
     // });

     // });

     //  return false;

     fetch('https://joy.studio54.app/gateway/getGong', {
       method: 'POST',
       headers: new Headers({
         'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
       }),
       body:
         'token=' +
         this.state.token +
         '&user_id=' +
         this.state.user_id +
         '&gong_start=' +
         this.state.gong_start +
         '&gong_end=' +
         this.state.gong_end +
         '&gong_state=' +
         this.state.gong_state,
     })
       .then((response) => response.json())
       .then((json) => {
         if (json.status != 1) {
           this.setState(
             {
               formErrorTitle: 'GetFoco',
               //  formErrorMessage: json.data.response.response.toString(),
             },
             () => {
               this.showAlert();
             }
           );
         }
         console.log(this.state.gong_state);
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

   changeColor() {
    if (!this.state.pressed) {
      this.setState({
        pressed: true,
        backgroundColor: '#FF69B4',
        backgroundColor2: 'lightgray',
      });
    } else {
      this.setState({
        pressed: false,
        backgroundColor: 'lightgray',
        backgroundColor2: '#FF69B4',
      });
    }
  }


   _openMenu = () => this.setState({ visible: true });

   _closeMenu = () => this.setState({ visible: false });

   _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

   _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

   _handleDatePicked = (date) => {
     console.log('A date has been picked: ', date);

     let hours = date.getHours();
     let minutes = date.getMinutes();
     // let seconds = date.getSeconds();

     let gong_start = `${hours}:${minutes}`;
     // :${seconds}`;
     let timeWithZeros = `${this.makeTwoDigits(hours)}:${this.makeTwoDigits(
       minutes
     )}`;
     // :${this.makeTwoDigits(seconds)}`;
     this.setState({ gong_start, timeWithZeros });

     this._hideDateTimePicker();
     console.log('gong_start', gong_start);
     console.log(timeWithZeros);
   };

   makeTwoDigits(time) {
     const timeString = `${time}`;
     if (timeString.length === 2) {
       return time;
     }
     return `0${time}`;
   }

   //TERMINAR
   _showDateTimePicker2 = () =>
     this.setState({ isDateTimePickerVisible2: true });

   _hideDateTimePicker2 = () =>
     this.setState({ isDateTimePickerVisible2: false });

   _handleDatePicked2 = (date) => {
     console.log('A date has been picked: ', date);

     let hours = date.getHours();
     let minutes = date.getMinutes();
     // let seconds = date.getSeconds();

     let gong_end = `${hours}:${minutes}`;
     // :${seconds}`;
     let timeWithZeros2 = `${this.makeTwoDigits(hours)}:${this.makeTwoDigits(
       minutes
     )}`;
     // :${this.makeTwoDigits(seconds)}`;
     this.setState({ gong_end, timeWithZeros2 });
     console.log('gong_end', gong_end);
     console.log(timeWithZeros2);

     this._hideDateTimePicker2();
   };

   render() {
     // const { selectedHours, selectedMinutes } = this.state;

     return (

      <ScrollView>
       <SafeAreaView style={{width:SCREEN_WIDTH,height: SCREEN_HEIGHT, flex: 1}}>
       <ImageBackground
           style={{ height: 750 }}
           source={require('../assets/white.jpg')}
         >
           <View
             style={{
               width: '100%',
               margin: 5,
              //  position: 'absolute',
               zIndex: 100,
               alignItems: 'flex-start',
             }}
           >
             <Provider>
               <Menu
                 margin={0}
                 backgroundColor={'black'}
                 visible={this.state.visible}
                 onDismiss={this._closeMenu}
                 anchor={
                   <Button style={{ margin: 0 }} onPress={this._openMenu}>
                     <Icon name="bars" color="#008B8B" size={25} />
                   </Button>
                 }
               >
                 <Menu.Item
                   onPress={() => {}}
                   style={{ margin: 2 }}
                   title="Próximos eventos"
                 />
                 {/* <Divider /> */}
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
             </Provider>
           </View>

             <View style={{ marginTop: 80 }}>
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

               <View
                 style={{
                   flexDirection: 'row',
                   justifyContent: 'space-between',
                   marginTop: 50,
                 }}
               >
                 <View
                   style={{marginTop: 30, marginStar: 5, flexDirection: 'column' }}
                 >
                   <Text
                     style={{
                      // textAlign: 'center',
                      marginBottom: 30,
                       fontSize: 22,
                       textAlign: 'center',
                      //  padding: 15,
                      //  marginTop: 5,
                      //  marginStart: 10,
                      //  color: 'black',
                      //  textAlign: 'center',
                     }}
                   >
                     EMPEZAR
                   </Text>

                   <View style={{ marginStart: 25 }}>
                     <TouchableOpacity onPress={this._showDateTimePicker}>
                       <View
                         style={{
                           borderWidth: 2,
                           borderRadius: 5,
                           width: 130,
                           height: 50,
                         }}
                       >
                         <Text
                           style={{
                             fontSize: 20,
                             color: '#008B8B',
                             textAlign: 'center',
                             marginTop: 10,
                           }}
                         >
                           {this.state.timeWithZeros}
                         </Text>
                       </View>
                     </TouchableOpacity>

                     <DateTimePicker
                       showTime={{ format: 'HH:mm' }}
                       value={this.state.gong_start}
                       isVisible={this.state.isDateTimePickerVisible}
                       onConfirm={this._handleDatePicked}
                       onCancel={this._hideDateTimePicker}
                       mode={'time'}
                     />
                   </View>
                 </View>

                 <View style={{marginTop: 30, marginStar: 5, flexDirection: 'column' }}>
                   <Text
                     style={{
                      //  textAlign: 'center',
                       marginBottom: 30,
                       fontSize: 22,
                      //  padding: 15,
                      //  marginTop: 5,
                      //  marginStart: 10,
                      //  textAlign: 'center',
                      //  color: 'black',
                     }}
                   >
                     TERMINAR
                   </Text>

                   <View style={{ marginEnd: 25 }}>
                     <TouchableOpacity
                       placeholder={'11:00AM'}
                       onPress={this._showDateTimePicker2}
                     >
                       <View
                         placeholder={'11:00AM'}
                         style={{
                           placeholder: '11:00AM',
                           borderWidth: 2,
                           borderRadius: 5,
                           width: 130,
                           height: 50,
                         }}
                       >
                         <Text
                           style={{
                             fontSize: 20,
                             color: '#008B8B',
                             textAlign: 'center',
                             marginTop: 10,
                           }}
                         >
                           {this.state.timeWithZeros2}
                         </Text>
                       </View>
                     </TouchableOpacity>

                     <DateTimePicker
                       showTime={{ format: 'HH:mm' }}
                       value={this.state.gong_end}
                       isVisible={this.state.isDateTimePickerVisible2}
                       onConfirm={this._handleDatePicked2}
                       onCancel={this._hideDateTimePicker2}
                       mode={'time'}
                     />
                   </View>
                 </View>
               </View>

               <View style={{ marginTop: 150 }}>
                 <View
                   style={{
                     textAlign: 'center',
                     alignItems: 'center',
                     alignContent: 'center',
                   }}
                 >
                   <View
                     style={{
                       flexDirection: 'row',
                       justifyContent: 'space-between',
                       backgroundColor: 'lightgray',
                    }} >
                     <Text
                    onPress={() => {this.getGongTime(); this.changeColor(); this.setState({gong_state: 0});}}
                     style={{fontsize: 14,borderRadius: 60, backgroundColor: this.state.backgroundColor, padding: 20 }}>Apagado</Text>
                     <Text
                       onPress={() =>{ this.getGongTime(); this.changeColor(); this.setState({gong_state: 1});}}
                       style={{
                        borderRadius: 60,
                        fontsize: 20,
                        backgroundColor: this.state.backgroundColor2,
                        padding: 20 }}
                       value={1}
                     >
                       Encendido
                     </Text>
                   </View>

                   {/* <Button onPress={() => this.getGongTime()}>
                      <Switch
                      // onPress={this.setState({gong_state: true})}
                      trackColor={{ false: '#767577', true: '#81b0ff' }}
                      // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() => this.setState({isEnabled: !this.state.isEnabled})}
                      value={this.state.isEnabled}
                      // onPress={() => this.getGong()}
                      // onActivate={() => this.getGongTime()}
                      />
                  </Button> */}
                 </View>
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
     backgroundColor: '#000',
     marginStart: 24,
     marginEnd: 24,
     color: 'white',
   },
   picker: {
     backgroundColor: '#E5E5E5',
   },
 });

