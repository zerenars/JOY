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

 export default class InstructionsScreen extends Component {
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
           style={{ height: 750, opacity: 5 }}
           source={require('../assets/celeste.jpg')}
         >
           <View
             style={{
               width: '100%',
               margin: 10,
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
                 {/* <Menu.Item onPress={() => {this.props.navigation.navigate('menu')}}  style={{margin: 2}} title='Atras' /> */}
                 <Menu.Item
                   onPress={() => {
                     this.performLogout();
                   }}
                   style={{ margin: 2 }}
                   title="Cerrar sesión"
                 />
                  <Menu.Item
                   onPress={() => {
                     this.props.navigation.navigate('Menu');
                   }}
                   style={{ margin: 2 }}
                   title="Atrás"
                 />
               </Menu>
             </Provider>
           </View>

           
             <View style={{ marginTop: 110 }}>
               <View>
                 {/* title="JOY"> */}
                 <Text
                   style={{
                     textAlign: 'center',
                     color: 'white',
                     fontWeight: '200',
                     fontSize: 70,
                   }}
                 >
                   JOY
                 </Text>
               </View>

               <View style={{ marginTop: 50 }}>
                 <TouchableOpacity
                   onPress={() => this.props.navigation.navigate('Creating')}
                   style={styles.buttonStyle}
                 >
                   <Text
                     style={{
                       marginTop: 10,
                       textAlign: 'center',
                       color: 'white',
                     }}
                   >
                     Instrucciones
                   </Text>
                 </TouchableOpacity>
               </View>

               <View>
                 <TouchableOpacity
                   style={styles.buttonStyle}
                   onPress={() => this.props.navigation.navigate('MyCompromise')}
                 >
                   <Text
                     style={{
                       marginTop: 10,
                       textAlign: 'center',
                       color: 'white',
                     }}
                   >
                     Evaluación
                   </Text>
                 </TouchableOpacity>
               </View>

               <View>
                 <TouchableOpacity
                   style={styles.buttonStyle}
                   onPress={() => this.props.navigation.navigate('Progress')}
                 >
                   <Text
                     style={{
                       marginTop: 10,
                       textAlign: 'center',
                       color: 'white',
                     }}
                   >
                     Resultado
                   </Text>
                 </TouchableOpacity>
               </View>
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
     // backgroundColor: '#000',
     backgroundColor: '#add8e69e',
     marginStart: 24,
     marginEnd: 24,
     color: 'white',
     // opacity: 0.8,
   },
 });

