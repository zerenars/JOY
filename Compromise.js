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
 import { EventListener } from '../polka/EventListener';
 import { Storage } from '../polka/Helpers';
 import { Button, Paragraph, Menu, Divider, Provider } from 'react-native-paper';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import FastImage from 'react-native-fast-image';
import { TouchablePreview } from 'react-native-navigation/lib/dist/adapters/TouchablePreview';
 export const SCREEN_WIDTH = Dimensions.get('window').width;
 export const SCREEN_HEIGHT = Dimensions.get('window').height;
 const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
 const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
 const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
 const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

 export default class CompromiseScreen extends Component {
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
       <SafeAreaView  style={{width:SCREEN_WIDTH,height: SCREEN_HEIGHT, flex: 1}}>
         <View onPress={this._closeMenu}>
         <FastImage
           style={{ background: 'white', height: 750 }}
           source={require('../assets/pink.jpg')}
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
             <Provider overlayAccessibilityLabel={'Close menu'}  style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}>
               <Menu 
               overlayAccessibilityLabel={'Close menu'}
                 margin={0}
                 backgroundColor={'black'}
                 visible={this.state.visible}
                //  onDismiss={this._closeMenu}
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
                   title="Pr??ximos eventos"
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
                   title="Cont??ctanos"
                 />
                 <Menu.Item
                   onPress={() => {
                     this.performLogout();
                   }}
                   style={{ margin: 2 }}
                   title="Cerrar sesi??n"
                 />
                <Menu.Item
                   onPress={() => {
                     this.props.navigation.navigate('Guide');
                   }}
                   style={{ margin: 2 }}
                   title="Atr??s"
                 />
               </Menu>
               </Provider>
           </View>


             <View style={{ marginTop: 20 }}>
               <View
                 style={{
                   marginTop: 30,
                   alignContent: 'center',
                   alignItems: 'center',
                 }}
               >
                 <Image
                   style={{
                     borderRadius: 150 / 2,
                     resizeMode: 'contain',
                     height: 60,
                     width: 60,
                   }}
                   source={require('../assets/diamondrosa.png')}
                 />
               </View>

               <View>

                 <Text
                   style={{
                     fontSize: 15,
                     padding: 10,
                     marginTop: 5,
                     textAlign: 'center',
                     color: 'black',
                   }}
                 >
                   ME COMPROMETO A...
                 </Text>
               </View>

           <View style={{flexDirection: 'row', marginStart: 30, marginEnd: 30 }}>
             <View style="flexDirection: column">
               <Icon name="smile-o" color="deeppink" size={35} />
              </View>

            <View style="flexDirection: column">
                  <Text style={{ marginTop: 20, textAlign: 'center' }}>
                   {' '}
                   MEDITAR (UNIFICAR)</Text>
                 <Text
                   style={{
                     textAlign: 'center',
                     color: 'black',
                     marginStart: 30,
                     marginEnd: 30,
                   }}
                 >
                   Al menos una hora al d??a. Si no sabes puedes acceder a la
                   p??gina web y buscar; ??C??mo puedo aprender el Sistema Isha
                   Judd?.
                 </Text>
               </View>
            </View>

               <View style={{flexDirection:'row', marginStart: 30, marginEnd: 30 }}>
                  <View style={{flexDirection: 'column'}}>
                      <Icon name="heart" color="deeppink" size={35} />
                  </View>

                  <View style={{flexDirection: 'column'}}>
                    <Text style={{marginEnd: 20,  marginTop: 20, textAlign: 'center' }}>
                   EJERCITAR LA CONCIENCIA DEL MOMENTO PRESENTE.</Text>
                    <Text
                      style={{
                        padding: 10,
                        textAlign: 'center',
                        color: 'black',
                        marginEnd: 30,
                        marginStart: 30,
                      }}
                    > Hacer este ejercicio lo m??s que pueda durante el d??a.</Text>
                 </View>
               </View>

               <View style={{flexDirection: 'row', marginStart: 30, marginEnd: 30 }}>

                  <View style={{flexDirection: 'column'}}>
                          <Icon name="heart" color="deeppink" size={35} />
                  </View>
                  <View style={{flexDirection: 'column'}}>
                        <Text style={{ textAlign: 'center' }}> CUIDAR MI CUERPO</Text>
                        <Text
                          style={{
                            padding: 10,
                            textAlign: 'center',
                            color: 'black',
                            marginEnd: 30,
                            marginStart: 30,
                          }}
                        >Alimentarlo, hidratarlo y ejercitarlo adecuadamente.</Text>
               </View>
               </View>


               <View style={{flexDirection: 'row', marginStart: 30, marginEnd: 30 }}>
               <View style={{flexDirection: 'column'}}>
                      <Icon name="frown-o" color="deeppink" size={35} />
                  </View>
            <View style={{flexDirection: 'column'}}>
                 <Text style={{ textAlign: 'center' }}>
                   {' '}
                   SENTIR MIS EMOCIONES
                 </Text>
                 <Text
                   style={{
                     padding: 10,
                     textAlign: 'center',
                     color: 'black',
                     marginEnd: 30,
                     marginStart: 30,
                   }}
                 >
                   Expresarlas y soltarlas de una forma adecuada.
                 </Text>
               </View>
               </View>

               <View style={{flexDirection: 'row',marginStart: 30, marginEnd: 30 }}>
               <View style={{flexDirection: 'column'}}>
                      <Icon name="meh-o" color="deeppink" size={35} />
                  </View>

              <View style={{flexDirection: 'column'}}>
                 <Text style={{ textAlign: 'center' }}>SER HONESTO</Text>
                 <Text
                   style={{

                     padding: 10,
                     textAlign: 'center',
                     color: 'black',
                     marginEnd: 30,
                     marginStart: 30,
                   }}
                 >
                   Expresando mis sentimientos y pensamientos
                 </Text>
               </View>
             </View>
             </View>

             <View
               style={{
                 marginTop: 30,
                 flex: 1,
                 justifyContent: 'space-between',
                 flexDirection: 'row',
               }}
             >
             {/* <TouchableOpacity style={{width: 70, height: 70}}> */}
               <Icon
                 style={{width: 40, height: 40, marginStart: 30 }}
                 onPress={() => this.props.navigation.navigate('Guide')}
                 name="chevron-left"
                 color="black"
                //  color="dimgray"
                 size={25}
               />
               {/* </TouchableOpacity> */}
               {/* <TouchableOpacity style={{width:70, height: 70}}> */}
               <Icon
                 style={{width: 40, height: 40, marginStart: 30 }}
                 onPress={() => this.props.navigation.navigate('Choose')}
                 name="chevron-right"
                 color="black"
                 size={25}
               />
               {/* </TouchableOpacity> */}
             </View>
         </FastImage>
         </View>
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

