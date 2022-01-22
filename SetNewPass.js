/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable keyword-spacing */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-spaced-func */
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
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;


export default class SetNewPassScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
          loading : false,
          data : [],
          logged :false,
          token: "",
          networkError: false,
          // url: GLOBALS.BASE_URL + "newPass",
          email: this.props.navigation.getParam('email'),
        }
    }


    newPass(){
        //console.log(this.state.code);
      fetch('https://resto.studio54.app/gateway_no_covid/newPass?new_password=' + this.state.new_password + '&new_password2=' + this.state.new_password2 + '&email=' + this.state.email, {
      method:  'GET',
      headers: new Headers ({
        'Content-Type': 'aplication/x-www-form-urlencoded',
      }),
        // Accept: 'application/json' ,
        // 'Content-Type': 'application/json'
      //body: 'codigo='+this.state.codigo,
      
    
    })
    .then((response) => response.json())
    .then((responseJson) => {
     
      console.log('responsenewPass:', responseJson);
      if (responseJson.status == 1) {
           Alert.alert( responseJson.data);
        this.props.navigation.navigate('HomeScreen');
      }else{
        Alert.alert('Ha ocurrido un error, porfavor intente nuevamente')
        //Alert.alert('Resto', responseJson.data);
      }
    }).catch((err) =>{
      console.log('err:', err);
    })    
    }




    render() {
      if (this.state.loading) {
        return (
          <PLKLoading/>
        );
      }
  
      // if(this.state.networkError){
      //     return (
      //         <PLKNetworkErrorView context={this}/>
      //       );
      // }
        return(

        <SafeAreaView style={{flex: 1}}>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View>
              <Text style={{fontSize:12, color:'#5f5f5f', backgroundColor:'#f7f7f7', padding:8, paddingTop:16, paddingBottom:8, paddingStart:12}}>A contrinuación introduzca su nueva contraseña.</Text>
            </View>
            <View style={{
                height: 40,
                paddingStart:12,
                alignItems:'center',
                borderTopWidth:0.5,
                borderColor: '#dbdbdb',
                justifyContent:'center',
                flexDirection:'row', backgroundColor:'#fff'}}>
                <Text style={{alignSelf:'center', fontSize:14, lineHeight:22,fontWeight:'bold'}}>Nueva contraseña</Text>
                <TextInput style={{flex: 1, textAlign:'right', fontSize:14, paddingEnd:12}}
                onChangeText={new_password => this.setState({new_password})}
                value={this.state.new_password}
                secureTextEntry={true}/>
              </View>

              <View style={{
                height: 40,
                paddingStart:12,
                alignItems:'center',
                borderTopWidth:0.5,
                borderColor: '#dbdbdb',
                justifyContent:'center',
                flexDirection:'row', backgroundColor:'#fff'}}>
                <Text style={{alignSelf:'center', fontSize:14, lineHeight:22,fontWeight:'bold'}}>Nueva contraseña</Text>
                <TextInput style={{flex: 1, textAlign:'right', fontSize:14, paddingEnd:12}}
                onChangeText={new_password2 => this.setState({new_password2})}
                value={this.state.new_password2}
                secureTextEntry={true}/>
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
                  title="Actualizar contraseña"
                  onPress={() => this.newPass()}
                />
              </View>
          </SafeAreaView>
        
        )
    }

}

