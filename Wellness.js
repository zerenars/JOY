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

 import React, {Component} from 'react';
 import FastImage from 'react-native-fast-image';

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
 import Icon from 'react-native-vector-icons/FontAwesome';
 import {EventListener} from '../polka/EventListener';
 import {Storage} from '../polka/Helpers';
 import { Button,Paragraph, Menu, Divider, Provider } from 'react-native-paper';
 export const SCREEN_WIDTH = Dimensions.get('window').width;
 export const SCREEN_HEIGHT = Dimensions.get('window').height;
 const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
 const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
 const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
 const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;



 export default class WellnessScreen extends Component {
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
      this.setState({logged: false, token: ''}, () => {
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
  // <ScrollView style={{width:SCREEN_WIDTH,height: SCREEN_HEIGHT}}>
    <SafeAreaView style={{width:SCREEN_WIDTH,height: SCREEN_HEIGHT, flex: 1}}>
      <FastImage
        style={{background: 'white', height: 750}}
        source={require('../assets/pink.jpg')} >

        <View style={{width: '100%', margin: 10, position: 'absolute', zIndex:100, alignItems: 'flex-start'}}>
          <Provider>
              <Menu
                  margin={0}
                  backgroundColor={'black'}
                  visible={this.state.visible}
                  onDismiss={this._closeMenu}
                  anchor={
                    <Button style={{margin: 0}} onPress={this._openMenu}><Icon name="bars" color="green" size={25} /></Button>
                  }><Menu.Item onPress={() => {}} style={{margin: 2}} title="Instrucciones" />
                  <Menu.Item onPress={() => {}} style={{margin: 2}} title="Próximos eventos" />
                  {/* <Divider /> */}
                  <Menu.Item onPress={() => {}} style={{margin: 2}} title="Conferencia Isha" />
                  <Menu.Item onPress={() => {}} style={{margin: 2}} title="Aprender el Sistema Isha Judd" />
                  <Menu.Item onPress={() => {}}  style={{margin: 2}} title="Contáctanos" />
                  <Menu.Item onPress={() => {this.performLogout();}}  style={{margin: 2}} title="Cerrar sesión" />
                  <Menu.Item
                   onPress={() => {
                     this.props.navigation.navigate('Choose');
                   }}
                   style={{ margin: 2 }}
                   title="Atrás"
                 />
              </Menu>
          </Provider>
        </View>

        <View style={{marginTop: 20}}>
          <View style={{marginTop: 30,alignContent: 'center', alignItems:'center'}}>
                <Image  style={{borderRadius: 150 / 2, resizeMode: 'contain',height: 60, width: 60}} source={require('../assets/diamondverde.png')} />
            </View>

            <View style={{marginTop: 10}}>
                <Text
                  style={{
                    fontSize: 15,
                    padding: 10,
                    marginTop: 5,
                    textAlign: 'center',
                    color: 'black',
                  }}>
              SIENTO MI BIENESTAR
                </Text>
            </View>



          <View style={{marginTop: 20, flexDirection: 'row', marginStart: 30, marginEnd: 30 }}>
             <View style={{flexDirection: 'column'}}>
               <Icon name="heart" color="green" size={35} />
              </View>

            <View style={{flexDirection: 'column',  marginStart: 20 }}>
                  <Text style={{ marginTop: 20,  marginStart: 20  }}>
                   {' '}
                  EXPERIMENTANDO PAZ INTERIOR</Text>
               </View>
            </View>




          <View style={{marginTop: 20, flexDirection: 'row', marginStart: 30, marginEnd: 30 }}>
             <View style={{flexDirection: 'column'}}>
               <Icon name="heart" color="green" size={35} />
              </View>

            <View style={{flexDirection: 'column',  marginStart: 20 }}>
                  <Text style={{ marginTop: 20, marginStart: 20  }}>
                   {' '}
                  REALIZANDO CON ENTUSIASMO</Text>
                 <Text
                   style={{
                     textAlign: 'center',
                     color: 'black',
                     marginStart: 30,
                     marginEnd: 30,
                   }}
                 >
                     mis tareas del día.
                 </Text>
               </View>
            </View>



            <View style={{marginTop: 20, flexDirection: 'row', marginStart: 30, marginEnd: 30 }}>
             <View style={{flexDirection: 'column'}}>
               <Icon name="heart" color="green" size={35} />
              </View>

            <View style={{flexDirection: 'column', marginStart: 30 }}>
                  <Text style={{ marginTop: 20, textAlign: 'center' ,  marginStart: 30 }}>
                   {' '}
                   DANDO CON DICHA</Text>
                 <Text
                   style={{
                     textAlign: 'center',
                     color: 'black',
                     marginStart: 30,
                     marginEnd: 30,
                   }}
                 >
                  desde mi abundancia interna.
                 </Text>
               </View>
            </View>


            <View style={{marginTop: 20, flexDirection: 'row', marginStart: 30, marginEnd: 30 }}>
             <View style={{flexDirection: 'column'}}>
               <Icon name="heart" color="green" size={35} />
              </View>

            <View style={{flexDirection: 'column'}}>
                  <Text style={{ marginTop: 20, textAlign: 'center' }}>
                   {' '}
                   FLUYENDO Y CONFIANDO</Text>
                 <Text
                   style={{
                     textAlign: 'center',
                     color: 'black',
                     marginStart: 30,
                     marginEnd: 30,
                   }}
                 >
                  en mi capacidad de resolver mis desafíos diarios.
                 </Text>
               </View>
            </View>



            <View style={{marginTop: 20, flexDirection: 'row', marginStart: 30, marginEnd: 30 }}>
             <View style={{flexDirection: 'column'}}>
               <Icon name="heart" color="green" size={35} />
              </View>

            <View style={{flexDirection: 'column'}}>
                  <Text style={{ marginTop: 20, textAlign: 'center' }}>
                   {' '}
                   SINTÍENDOME CADA VEZ MÁS</Text>
                 <Text
                   style={{
                     textAlign: 'center',
                     color: 'black',
                     marginStart: 30,
                     marginEnd: 30,
                   }}
                 >
                  en unidad conmigo mismo/a  y con mi mundo.
                 </Text>
               </View>
            </View>






          <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 60}}>
              {/* <TouchableOpacity style={{width: 70, height: 70}}> */}
                    <Icon style={{width: 40, height: 40, marginStart: 30}} onPress={()=> this.props.navigation.navigate('Choose') } name="chevron-left" color="black" size={25} />
              {/* </TouchableOpacity> */}
              {/* <TouchableOpacity style={{width: 70, height: 70}}> */}
                    {/* <Icon  style={{width: 40, height: 40,marginEnd: 30}} onPress={()=> this.props.navigation.navigate('Wellness') }
                    name="chevron-right" color="white" size={25} /> */}
              {/* </TouchableOpacity> */}
          </View>

          </View>

      </FastImage>
    </SafeAreaView>
    // </ScrollView>
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


