/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable space-infix-ops */
/* eslint-disable handle-callback-err */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import {ImageBackground, SafeAreaView, Alert, StatusBar, ActivityIndicator,  Dimensions, View, Text, Image, TextInput, Pressable, StyleSheet} from 'react-native'
// import {Button} from 'react-native-elements';
import {EventListener} from '../polka/EventListener';
import {Storage} from '../polka/Helpers';
import { Button,Paragraph, Menu, Divider, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';

import PLKNetworkErrorView from '../polka/PLKNetworkErrorView'
// import PLKCellComponent from '../polka/PLKCellComponent'
import PLKLoading from '../polka/PLKLoading'
// import {Storage} from '../polka/Helpers'
// import {EventListener} from '../polka/EventListener'
// import GLOBALS from '../polka/Globals';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;




export default class RecoveryCodeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
          loading : false,
          data : [],
          logged :false,
          token: '',
          networkError: false,
          searchText:'',
          searchLoading:false,
          // url: GLOBALS.BASE_URL+'sendRecoveryCode',
          email: '',
        }
    }

sendRecoveryCode(){
  this.setState({loading: true});
  //console.log(this.state.email);
  fetch('https://joy.studio54.app/gateway/sendRecoveryCode?email='+this.state.email, {
  method: 'GET', //method: POST sin los datos de la url
  headers: new Headers({
    //Accept: 'application/json',
    //'Content-Type': 'application/json'
    'Content-Type': 'aplication/x-www-form-urlencoded',
  }),
  //body: 'email='+this.state.email

})
.then((response) => response.json())
.then((responseJson) => {

  console.log('responseSendRecoveryCode:', responseJson);
  if (responseJson.status == 1) {
   // Alert.alert('Se ha enviado el codigo exitosamente!')
    this.props.navigation.navigate('ValidateCodeScreen', { email: this.state.email });
   //Alert.alert('Resto', 'Su cod de verif. es:'+ responseJson.data);
  } else {
    Alert.alert('Ha ocurrido un error, porfavor intente nuevamente')
    //Alert.alert('Resto', responseJson.data);
  }
}).catch((err) =>{
  this.setState({
    networkError : true,
    loading: false,
  })
})
}
  //console.log('err:', err);





  render(){

    if (this.state.loading) {
        return <PLKLoading />;
      }

    if (this.state.networkError) {
        return <PLKNetworkErrorView context={this} />;
    }
    console.log('email:',this.state.email);
    return (
  <SafeAreaView style={{flex: 1,width:SCREEN_WIDTH,height: SCREEN_HEIGHT}}>
    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View>
        <Text style={{fontSize:12, color:'#5f5f5f', backgroundColor:'#f7f7f7', padding:8, paddingTop:16, paddingBottom:8, paddingStart:12}}>Enviar código de verificación</Text>
      </View>
      <View style={{
          height: 40,
          paddingStart:12,
          alignItems:'center',
          borderTopWidth:0.5,
          borderColor: '#dbdbdb',
          justifyContent:'center',
          flexDirection:'row', backgroundColor:'#fff'}}>
          <Text style={{alignSelf:'center', fontSize:14, lineHeight:22,fontWeight:'bold'}}>Email</Text>
          <TextInput style={{flex: 1, textAlign:'right', fontSize:14, paddingEnd:12}}
          keyboardType="email-address"
          onChangeText={email => this.setState({email})}
         value={this.state.email}/>
        </View>  
        <View style={{flex: 1,height: 1, backgroundColor: '#f1eff2'}} />
        <View style={{height: 60}}>
          <Button
            titleStyle={{fontSize: 14, fontWeight: 'bold'}}
            buttonStyle={[
              {
                marginTop: 8,
                height: 40,
                backgroundColor: '#000',
                marginStart: 12,
                marginEnd: 12,
              },
            ]}
            title="Enviar codigo"
            onPress={() => this.sendRecoveryCode()}
          />
        </View>
    </SafeAreaView>
    )
  }

}


