/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
/* eslint-disable radix */
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
   Section,
   Dimensions,
 } from 'react-native';
 import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import FastImage from 'react-native-fast-image';
 import { EventListener } from '../polka/EventListener';
 import { Storage } from '../polka/Helpers';
 import { Button, Paragraph, Menu, Divider, Provider } from 'react-native-paper';
 import CountDown from 'react-native-countdown-component';
 export const SCREEN_WIDTH = Dimensions.get('window').width;
 export const SCREEN_HEIGHT = Dimensions.get('window').height;
 const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
 const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
 const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
 const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;


 export default class MeditationTimerScreen extends Component {
   constructor(props) {
     super(props);
     this.state = {
      visible: false,
       backgroundColor: 'lightgray',
       backgroundColor2: 'pink',
       pressed: false,
       loading: false,
       data: [],
       formView: false,
       networkError: false,
       formType: props.navigation.getParam('form_type'),
       buttonTitle: props.navigation.getParam('buttonTitle'),
       //form data:
       screen: this.props.navigation.getParam('screen'),
       //form Errors
       formError: false,
       formErrorTitle: 'Se requiere más información.',
       formErrorMessage: 'Error que no cambia',
       fcmTokenValue: 'Ready',
       time: '',
       created: '',
       user_id: '',
       token: '',
       interval2: '',
       selectedTime: 0,
       myInt: 0,
     };
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


   _openMenu = () => this.setState({ visible: true });

   _closeMenu = () => this.setState({ visible: false });

   componentDidMount() {
    EventListener.addEventListener(this, 'user', (d) => {
      this.checkPermission();
    });
    this.checkPermission();
  //  this._IDoRequest()
    this.createNotificationListeners();
     this.isLogged();
     console.log(this.state.time);
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

   setView(time){
    context = this;
    this.setState({ loading: true }, () => {
      context.setState({ selectedTime: time, loading: false });
    });
  }

   setTimeView(time, selectedTime
    ) {
     context = this;
     this.setState({ loading: true }, () => {
       context.setState({ selectedTime: time, loading: false });
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
     alert(
       this.state.formErrorTitle,
       this.state.formErrorMessage,
       [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
       { cancelable: false }
     );
     console.log('continua');
   }


  //  getTimer() {
  //   let instancia = this;
  //   fetch('https://joy.studio54.app/gateway/getMeditationTime', {
  //     method: 'POST',
  //     headers: new Headers({
  //       'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
  //     }),
  //     body:
  //       'user_id=' +
  //       this.state.user_id +
  //       'time=' +
  //       this.state.time +
  //       'date=' +
  //       this.state.date,
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       if (json.status != 1) {
  //         this.setState(
  //           {
  //             formErrorTitle: 'GetGong',
  //             // formErrorMessage: json.data.response.response.toString(),
  //           },
  //           () => {
  //             this.showAlert();
  //           }
  //         );
  //       }
  //       console.log(json);

  //       console.log('Entro');
  //       console.log(json.data);

  //       this.setState({
  //         data: json.data.items,
  //         message: json.data,
  //         loading: false,
  //         networkError: false,
  //       });

  //       if (json.status == 0) {
  //         return;
  //       }


  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       this.setState({
  //         networkError: true,
  //         loading: false,
  //       });
  //     });
  // }




   getTimer() {
     console.log('Entro 1');
     fetch('https://joy.studio54.app/gateway/getMeditationTime', {
       method: 'POST',
       headers: new Headers({
         'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
       }),
       body:
         'user_id=' +
         this.state.user_id +
         'time=' +
         this.state.time +
         'created=' +
         this.state.created,
     })

       .then((response) => response.text())
       .then((json) => {
        if (json.status != 1) {
          this.setState(
            {
              formErrorTitle: 'Iniciado',
              // formErrorMessage: json.data.response.response.toString(),
            },
            () => {
              this.showAlert();
            }
          );
        }
         console.log('Entro 2');
         console.log(json);

         console.log('Entro 3');
         console.log(json.data);

         this.setState({
           data: json.data.items.map,
           message: json.data,
           loading: false,
           networkError: false,
         });

         if (json.status == 0) {
           return;
         }

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
     console.log(this.state.selectedTime);

     if (this.state.loading) {
       return <View />;
     }

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
                 position: 'absolute',
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
                       <Icon name="bars" color="white" size={25} />
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
             <View style={{ marginTop: 50 }}>
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
                   marginTop: 15,
                   alignItems: 'center',
                   alignContent: 'center',
                   textAlign: 'center',
                 }}>
                 <CountDown
                   style={{width: 130, height: 130, margin: 20, color: 'black' , border: 'black', borderWidth: 3, borderRadius: 120, borderColor: '#FF1493', fontWeight: '300'}}
                   until={this.state.selectedTime * 60}
                   size={30}
                   // onFinish={(time) => alert('Finished')}
                   digitStyle={{color: 'black', backgroundColor: 'transparent', marginTop: 23, paddingStart: 12,paddingEnd: 12, fontSize: 20}}
                   // digitTxtStyle={{color: '#1CC625'}}
                  //  digitTxtStyle={{ margin: 10, color: 'black' , border: 'black', borderWidth: 3, borderRadius: 10, borderColor: '#FF1493'}}
                   timeToShow={['M' , ':',  'S']}
                  //  timeLabels={{m: 'MM', s: 'SS'}}
                  timeLabels={{m: null }}
                 />
               </View>

               {/* Vista que contiene horarios */}
               <View >
                 <View style={styles.viewTime}>
                   <TouchableOpacity
                     onPress={() => this.setTimeView(20)}
                     style={[
                       styles.touchable1,
                       this.state.selectedTime == 20 && styles.touchableActive,
                     ]}
                   >
                     <Text style={styles.point}>20{'\n'}min</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                        //  onPress={() => this.setState({time: 25, selectedTime: 25,
                        //  }) }
                        onPress={() => this.setTimeView(25)}
                     style={[
                       styles.touchable1,
                       this.state.selectedTime == 25 && styles.touchableActive,
                     ]}
                   >
                     <Text style={styles.point}>25{'\n'}min</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                   onPress={() => this.setTimeView(30)}
                        //  onPress={() => this.setState({time: 30, selectedTime: 30
                        //  }) }
                     style={[
                       styles.touchable1,
                       this.state.selectedTime == 30 && styles.touchableActive,
                     ]}
                   >
                     <Text style={styles.point}>30{'\n'}min</Text>
                   </TouchableOpacity>
                 </View>

                 <View style={styles.viewTime}>
                   <TouchableOpacity
                   onPress={() => this.setTimeView(35)}
                     style={[
                       styles.touchable1,
                       this.state.selectedTime == 35 && styles.touchableActive,
                     ]}
                   >
                     <Text style={styles.point}>35{'\n'}min</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                   onPress={() => this.setTimeView(40)}
                      // onPress={() =>     this.setState({time: 40,selectedTime: 40
                      //    }) }
                     style={[
                       styles.touchable1,
                       this.state.selectedTime == 40 && styles.touchableActive,
                     ]}
                   >
                     <Text style={styles.point}>40{'\n'}min</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                   onPress={() => this.setTimeView(45)}
                      // onPress={() =>     this.setState({time: 45, selectedTime: 45
                      //    }) }
                     style={[
                       styles.touchable1,
                       this.state.selectedTime == 45 && styles.touchableActive,
                     ]}
                   >
                     <Text style={styles.point}>45{'\n'}min</Text>
                   </TouchableOpacity>
                 </View>

                 <View style={styles.viewTime}>
                   <TouchableOpacity
                   onPress={() => this.setTimeView(50)}
                    //  onPress={() =>     this.setState({time: 50,selectedTime: 50
                    //  }) }
                     style={[
                       styles.touchable1,
                       this.state.selectedTime == 50 && styles.touchableActive,
                     ]}
                   >
                     <Text style={styles.point}>50{'\n'}min</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                   onPress={() => this.setTimeView(55)}
                      // onPress={() =>     this.setState({time: 55,selectedTime: 55
                      //    }) }
                     style={[
                       styles.touchable1,
                       this.state.selectedTime == 55 && styles.touchableActive,
                     ]}
                   >
                     <Text style={styles.point}>55{'\n'}min</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                   onPress={() => this.setTimeView(60)}
                      // onPress={() =>  this.setState({time: 60, selectedTime: 60
                      // }) }
                     style={[
                       styles.touchable1,
                       this.state.selectedTime == 60 && styles.touchableActive,
                     ]}
                   >
                     <Text style={styles.point}>60{'\n'}min</Text>
                   </TouchableOpacity>
                 </View>

                  <View style={{marginTop: 15, alignText: 'center', alignSelf: 'center' }}>
                   <TouchableOpacity
                    //  onPress={() => this.setTimeView(this.state.selectedTime)}
                    onPress={() => {this.getTimer();  this.setState({gong_state: 0});}}
                    // onPress={() => this.getTimer();}
                     style={styles.button2Style}
                   >
                     <Text
                       style={{
                         fontSize: 17,
                         marginTop: 10,
                         // fontWeight: 200,s
                         textAlign: 'center',
                         color: 'white',
                       }}
                     >
                       INICIAR
                     </Text>
                   </TouchableOpacity>
                 </View>

                 {/* Cierra vista */}
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
   touchable1: {
     width: 50,
     height: 50,
     marginTop: 0,
     backgroundColor: '#00CED1',
     borderRadius: 30,
     underlayColor: 'pink',
   },
   touchableActive: {
     backgroundColor: '#008B8B',
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
   point: {
     color: 'white',
     textAlign: 'center',
     marginTop: 8,
     fonSize: 20,
     fontWeight: '800',
   },
   viewTime: {
     marginStart: 60,
     marginEnd: 60,
     marginTop: 40,
     flexDirection: 'row',
     justifyContent: 'space-between',
   },
   button2Style: {
     marginTop: 30,
     marginBottom: 10,
     height: 40,
     width: 100,
     //  backgroundColor: '#fff',
     backgroundColor: '#FF1493',
     marginStart: 24,
     marginEnd: 24,
     color: 'white',
     // textAlign: 'center',
     // alignItems: 'center',
     // alignContent: 'center',
   },
 });

