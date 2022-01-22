/* eslint-disable semi */
/* eslint-disable no-undef */
/* eslint-disable no-spaced-func */
/* eslint-disable eqeqeq */
/* eslint-disable keyword-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import {SafeAreaView, Alert, StatusBar, ActivityIndicator,  Dimensions, View, Text, Image, TextInput, Pressable} from 'react-native'
import {Button} from "react-native-elements";

// import PLKNetworkErrorView from '../polka/PLKNetworkErrorView'
// import PLKCellComponent from '../polka/PLKCellComponent'
import PLKLoading from '../polka/PLKLoading'
import {Storage} from '../polka/Helpers'
import {EventListener} from "../polka/EventListener"
import GLOBALS from '../polka/Globals';
// export const SCREEN_WIDTH = Dimensions.get('window').width - 32;
// export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;






export default class ValidateCodeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
          loading : false,
          data : [],
          logged :false,
          token: "",
          networkError: false,
          // url: GLOBALS.BASE_URL + "validationCode",
          email: this.props.navigation.getParam('email'),
        }
    }

validationCode(){
    console.log(this.state.code);
    console.log(this.state.email);
  fetch('https://joy.studio54.app/gateway_no_covid/validationCode?codigo=' + this.state.code + '&email=' + this.state.email, {
  method: 'GET', //'POST',
  // Accept: 'application/json' ,
   headers: new Headers ({
     'Content-Type': 'aplication/x-www-form-urlencoded',
   }),
    // 'Content-Type': 'application/json'
  //body: 'codigo='+this.state.codigo,
  

})
.then((response) => response.json())
.then((responseJson) => {
 
  console.log('responseValidationCode:', responseJson);
  if (responseJson.status == 1) {
      // Alert.alert( responseJson.data);
    this.props.navigation.navigate('SetNewPassScreen', {code: this.state.code, email: this.state.email });
  }else{
    Alert.alert('Ha ocurrido un error, porfavor intente nuevamente')
    //Alert.alert('Resto', responseJson.data);
  }
}).catch((err) =>{
  console.log('err:', err);
})    
}



  render(){
    //console.log('code:',this.state.code);
    return(


    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View>
          <Text style={{fontSize:12, color:'#5f5f5f', backgroundColor:'#f7f7f7', padding:8, paddingTop:16, paddingBottom:8, paddingStart:12}}>A continuación introduzca el código enviado de su direccion de email.</Text>
        </View>
        <View style={{
            height: 40,
            paddingStart:12,
            alignItems:'center',
            borderTopWidth:0.5,
            borderColor: '#dbdbdb',
            justifyContent:'center',
            flexDirection:'row', backgroundColor:'#fff'}}>
            <Text style={{alignSelf:'center', fontSize:14, lineHeight:22,fontWeight:'bold'}}>Código</Text>
            <TextInput style={{flex: 1, textAlign:'right', fontSize:14, paddingEnd:12}}
            keyboardType="email-address"
            onChangeText={code => this.setState({code})}
            value={this.state.code}/>
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
              title="Validar código"
              onPress={() => this.validationCode()}
            />
          </View>
      </SafeAreaView>


      // <SafeAreaView style={{height: SCREEN_HEIGHT, flex:1,  alignItems:'center', justifyContent:'center'}}>
      // <Image
      //     // source={require('../assets/RestoLogo.png')}
      //     source={require('../assets/loading_heart.gif')}
      //     style={{width: 350, resizeMode: 'contain', height: 350, marginBottom: 30 }}/>
          

      //   <Text style={{color:"black", marginTop:8, marginBottom: 30, textAlign:'center',alignSelf:'center', fontSize:14, lineHeight:22,fontWeight:'bold',
      // }}>
      //     Porfavor introduzca el codigo que le mandamos a su direccion de email
      //   </Text>
      //   <TextInput
      //     style={{ backgroundColor: '#fff', height: 40,width:SCREEN_WIDTH, borderColor: 'black', borderWidth: 1 }}
      //     onChangeText={code => this.setState({code})}
      //     value={this.state.code}
      //   />
      //     {/* <Button
      //       //  onPress={this.acceder.bind(this)}
      //         title='Validar'
      //         titleStyle={{ fontSize:16 }}
      //         buttonStyle={[{ marginTop: 20, backgroundColor: "black", marginStart:16, marginEnd:16,}]}
      //         onPress={() => this.validationCode()}
      //       /> */}
      //       <Button
      //       title="Validar"
      //       titleStyle={{fontSize: 16}}
      //       buttonStyle={[
      //         {
      //           width: SCREEN_WIDTH,
      //           marginTop: 10,
      //           backgroundColor: 'black',
      //           marginStart: 16,
      //           marginEnd: 16,
      //         },
      //       ]}
      //       onPress={() => this.validationCode()}
      //     />
      // </SafeAreaView>
    )
  }

}




