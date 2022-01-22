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

 export default class GuideScreen extends Component {
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
     };
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

   _openMenu = () => this.setState({ visible: true });

   _closeMenu = () => this.setState({ visible: false });

   static navigationOptions = {
     header: null, // !!! Hide Header
   };
   render() {
     return (
      // <ScrollView>
       <SafeAreaView style={{width:SCREEN_WIDTH,height: SCREEN_HEIGHT, flex: 1}}>
         <ImageBackground
           style={{ background: 'white', height: 750 }}
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
             <Provider overlayAccessibilityLabel={'Close menu'}>
               <Menu
               overlayAccessibilityLabel={'Close menu'}
                 margin={0}
                 backgroundColor={'black'}
                 visible={this.state.visible}
                 onDismiss={this._closeMenu}
                 anchor={
                   <Button style={{ margin: 0 }} onPress={this._openMenu}>
                     <Icon name="bars" color="#008B8B" fontWeight={'200'} size={25} />
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
                 <Menu.Item
                   onPress={() => {
                     this.props.navigation.navigate('Creating');
                   }}
                   style={{ margin: 2 }}
                   title="Atrás"
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
                     fontWeight: '500',
                     fontSize: 70,
                   }}
                 >
                   JOY
                 </Text>
               </View>

               <View>
                 <Text
                   style={{
                     padding: 30,
                     marginTop: 10,
                     marginStart: 30,
                     marginEnd: 30,
                     textAlign: 'center',
                     color: 'black',
                   }}
                 >
                   Hay dos posibles conductores para el vehículo de las
                   ELECCIONES: La CONCIENCIA que es quienes somos y nos lleva a
                   destino ó el PROGRAMA, errático, basado en el miedo por
                   nuestras experiencias pasadas y que nos impide alcanzar la
                   meta.
                 </Text>
                 {/* </TouchableOpacity> */}
               </View>

               <View>
                 <Text
                   style={{
                     padding: 10,
                     marginTop: 10,
                     marginStart: 30,
                     marginEnd: 30,
                     textAlign: 'center',
                     color: 'black',
                   }}
                 >
                   La llave para elegir la conciencia, es tu COMPROMISO con las
                   herramientas del Sistema Isha Judd. A continuación una guía
                   para cada día evaluar tu progreso y ¡desafiarte a completar tu
                   diamante!
                 </Text>

               </View>
             </View>

             <View
               style={{
                 marginTop: 105,
                 flexDirection: 'row',
                 justifyContent: 'space-between',
               }}
             >
               {/* <TouchableOpacity style={{width: 40, height: 40}}> */}
               <Icon
                 style={{width: 40, height: 40, marginTop: 7, marginStart: 30 }}
                 onPress={() => this.props.navigation.navigate('Creating')}
                 name="chevron-left"
                 color="black"
                 size={25}
               />
               {/* </TouchableOpacity> */}

                 <Text
                   style={{
                     padding: 10,
                     textAlign: 'center',
                     backgroundColor: '#008B8B',
                     color: 'white',
                     width: 100,
                     height: 40,
                   }}
                 >
                   GUIA
                 </Text>
               {/* <TouchableOpacity style={{with: 40, height: 40}}> */}
               <Icon
                 style={{width: 40, height: 40, marginTop: 7, marginStart: 20 }}
                 onPress={() => this.props.navigation.navigate('Compromise')}
                 name="chevron-right"
                 color="black"
                 size={25}
               />
               {/* </TouchableOpacity> */}
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

