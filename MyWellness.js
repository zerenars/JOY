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
   Button,
   Dimensions,
 } from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome';
 export const SCREEN_WIDTH = Dimensions.get('window').width;
 export const SCREEN_HEIGHT = Dimensions.get('window').height;
 const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
 const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
 const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
 const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

 export default class MyCompromiseScreen extends Component {
   constructor(props) {
     super(props);
     this.state = {
       loading: true,
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

       radioBtnsData: ['0', '1', '2', '3', '4'],
       checked: ['0', '0', '0', '0', '0'],
       backgroundColor: 'lightgray',
       backgroundColor2: '#00c200',
       pressed: false,
     };
   }

   changeColor() {
     if (!this.state.pressed) {
       this.setState({
         pressed: true,
         backgroundColor: '#00c200',
         backgroundColor2: 'gray',
       });
     } else {
       this.setState({
         pressed: false,
         backgroundColor: 'lightgray',
         backgroundColor2: '#00c200',
       });
     }
   }

   add2Questionaire(question, id) {
     datacheck = this.state.checked;

     datacheck[question - 1] = id;

     this.setState(
       {
         checked: datacheck,
       },
       () => {
         console.log(datacheck);
       }
     );
   }

   showAlert() {
     instancia = this;
     Alert.alert(
       instancia.state.formErrorTitle,
       instancia.state.formErrorMessage,
       [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
       { cancelable: false }
     );
     console.log('continua');
   }

   wellness() {
     let questions = this.state.checked;
     console.log('zerena la serena');

     // console.log(JSON.stringify(questions));

     let formdata = new FormData();
     formdata.append('wellness', JSON.stringify(questions));

     this.props.navigation.navigate('MyWellnessGraphic', {
       questions: questions,
       formdata: formdata,
     });
   }

   // answers(){
   //   let formData = new FormData();
   //   formData.append('question1' , this.state.question1);
   //   formData.append('question1' , this.state.question2);
   //   formData.append('question1' , this.state.question3);
   //   formData.append('question1' , this.state.question4);
   //   formData.append('question1' , this.state.question5);

   //   console.log(formData);
   //   fetch(this.state.url,{
   //     method: 'POST',
   //     headers: new Headers({
   //       "Content-Type": "multipart/form-data",

   //     }),
   //     body: formData

   //   })
   //   .then((response) => response.json())
   //   .then((json) => {

   //     if (json.status != 1){
   //       instancia.setState({formErrorTitle: "Register",formErrorMessage:json.data.response.response.toString()}, () => {
   //         instancia.showAlert();
   //       })
   //     }

   //     console.log("se hace login")

   //     this.setState({
   //       data : json.data.items,
   //       loading: false,
   //       networkError:false,

   //     })
   // }

   render() {
     return (
      <ScrollView>
       <SafeAreaView  style={{width:SCREEN_WIDTH,height: SCREEN_HEIGHT, flex: 1}}>
         <ImageBackground
           style={{ background: 'white', height: 750 }}
           // source={require('../assets/yoga4.png')}
         >
             <View style={{ marginTop: 20 }}>
               <View style={{ alignContent: 'center', alignItems: 'center' }}>
                 <Image
                   style={{
                     borderRadius: 150 / 2,
                     resizeMode: 'contain',
                     height: 60,
                     width: 60,
                   }}
                   source={require('../assets/diamondverde.png')}
                 />
               </View>

               <View>
                 <Text
                   style={{
                     marginTop: 10,
                     textAlign: 'center',
                     color: 'black',
                     fontWeight: '500',
                     fontSize: 20,
                   }}
                 >
                   MI BIENESTAR
                 </Text>
               </View>


               <View style={{ marginTop: 10, marginStart: 20, marginEnd: 20 }}>
                 <Text
                   style={{
                     padding: 15,
                     textAlign: 'center',
                     color: 'black',
                     fontSize: 15,
                     marginBottom: 0,
                   }}
                 >
                   1 ¿Sentí paz interior?
                 </Text>
                 <View
                   style={{ paddingLeft: 20, paddingRight: 20 }}
                   flexDirection="row"
                   justifyContent="space-evenly"
                 >
                   {this.state.radioBtnsData.map((data, key) => {
                     return (
                       <View key={key}>
                         {this.state.checked[0] == key ? (
                           <TouchableOpacity
                             onPress={() => {
                               this.changeColor();
                             }}
                             style={{
                               backgroundColor: this.state.backgroundColor2,
                               width: 25,
                               height: 25,
                               marginTop: 0,
                               borderRadius: 30,
                             }}
                           >
                             <Text style={styles.point}>{data}</Text>
                           </TouchableOpacity>
                         ) : (
                           <TouchableOpacity
                             onPress={() => {
                               this.add2Questionaire(1, key);
                             }}
                             style={{
                               backgroundColor: this.state.backgroundColor,
                               width: 25,
                               height: 25,
                               marginTop: 0,
                               borderRadius: 30,
                             }}
                           >
                             <Text style={styles.point}>{data}</Text>
                           </TouchableOpacity>
                         )}
                       </View>
                     );
                   })}
                 </View>

                 <Text
                   style={{
                     padding: 15,
                     marginTop: 10,
                     textAlign: 'center',
                     color: 'black',
                     fontSize: 15,
                   }}
                 >
                   2 ¿Viví con entusiasmo?
                 </Text>
                 <View
                   style={{ paddingLeft: 20, paddingRight: 20 }}
                   flexDirection="row"
                   justifyContent="space-evenly"
                 >
                   {this.state.radioBtnsData.map((data, key) => {
                     return (
                       <View key={key}>
                         {this.state.checked[1] == key ? (
                           <TouchableOpacity
                             onPress={() => {
                               this.changeColor();
                             }}
                             style={{
                               backgroundColor: this.state.backgroundColor2,
                               width: 25,
                               height: 25,
                               marginTop: 0,
                               borderRadius: 30,
                             }}
                           >
                             <Text style={styles.point}>{data}</Text>
                           </TouchableOpacity>
                         ) : (
                           <TouchableOpacity
                             onPress={() => {
                               this.add2Questionaire(2, key);
                             }}
                             style={{
                               backgroundColor: this.state.backgroundColor,
                               width: 25,
                               height: 25,
                               marginTop: 0,
                               borderRadius: 30,
                             }}
                           >
                             <Text style={styles.point}>{data}</Text>
                           </TouchableOpacity>
                         )}
                       </View>
                     );
                   })}
                 </View>

                 <Text
                   style={{
                     padding: 15,
                     marginTop: 10,
                     fontSize: 15,
                     textAlign: 'center',
                     color: 'black',
                   }}
                 >
                   3 ¿Me sentí en abundancia y di con dicha?
                 </Text>
                 <View
                   style={{ paddingLeft: 20, paddingRight: 20 }}
                   flexDirection="row"
                   justifyContent="space-evenly"
                 >
                   {this.state.radioBtnsData.map((data, key) => {
                     return (
                       <View key={key}>
                         {this.state.checked[2] == key ? (
                           <TouchableOpacity
                             onPress={() => {
                               this.changeColor();
                             }}
                             style={{
                               backgroundColor: this.state.backgroundColor2,
                               width: 25,
                               height: 25,
                               marginTop: 0,
                               borderRadius: 30,
                             }}
                           >
                             <Text style={styles.point}>{data}</Text>
                           </TouchableOpacity>
                         ) : (
                           <TouchableOpacity
                             onPress={() => {
                               this.add2Questionaire(3, key);
                             }}
                             style={{
                               backgroundColor: this.state.backgroundColor,
                               width: 25,
                               height: 25,
                               marginTop: 0,
                               borderRadius: 30,
                             }}
                           >
                             <Text style={styles.point}>{data}</Text>
                           </TouchableOpacity>
                         )}
                       </View>
                     );
                   })}
                 </View>

                 <Text
                   style={{
                     padding: 15,
                     fontSize: 15,
                     marginTop: 10,
                     textAlign: 'center',
                     color: 'black',
                   }}
                 >
                   4 ¿Flui y confié?
                 </Text>
                 <View
                   style={{ paddingLeft: 20, paddingRight: 20 }}
                   flexDirection="row"
                   justifyContent="space-evenly"
                 >
                   {this.state.radioBtnsData.map((data, key) => {
                     return (
                       <View key={key}>
                         {this.state.checked[3] == key ? (
                           <TouchableOpacity
                             onPress={() => {
                               this.changeColor();
                             }}
                             style={{
                               backgroundColor: this.state.backgroundColor2,
                               width: 25,
                               height: 25,
                               marginTop: 0,
                               borderRadius: 30,
                             }}
                           >
                             <Text style={styles.point}>{data}</Text>
                           </TouchableOpacity>
                         ) : (
                           <TouchableOpacity
                             onPress={() => {
                               this.add2Questionaire(4, key);
                             }}
                             style={{
                               backgroundColor: this.state.backgroundColor,
                               width: 25,
                               height: 25,
                               marginTop: 0,
                               borderRadius: 30,
                             }}
                           >
                             <Text style={styles.point}>{data}</Text>
                           </TouchableOpacity>
                         )}
                       </View>
                     );
                   })}
                 </View>

                 <Text
                   style={{
                     padding: 15,
                     marginTop: 10,
                     fontSize: 15,
                     textAlign: 'center',
                     color: 'black',
                   }}
                 >
                   5 ¿Me sentí cada vez más en unidad conmigo mismo/a y con mi
                   mundo?
                 </Text>
                 <View
                   style={{ paddingLeft: 20, paddingRight: 20 }}
                   flexDirection="row"
                   justifyContent="space-evenly"
                 >
                   {this.state.radioBtnsData.map((data, key) => {
                     return (
                       <View key={key}>
                         {this.state.checked[4] == key ? (
                           <TouchableOpacity
                             onPress={() => {
                               this.changeColor();
                             }}
                             style={{
                               backgroundColor: this.state.backgroundColor2,
                               width: 25,
                               height: 25,
                               marginTop: 0,
                               borderRadius: 30,
                             }}
                           >
                             <Text style={styles.point}>{data}</Text>
                           </TouchableOpacity>
                         ) : (
                           <TouchableOpacity
                             onPress={() => {
                               this.add2Questionaire(5, key);
                             }}
                             style={{
                               backgroundColor: this.state.backgroundColor,
                               width: 25,
                               height: 25,
                               marginTop: 0,
                               borderRadius: 30,
                             }}
                           >
                             <Text style={styles.point}>{data}</Text>
                           </TouchableOpacity>
                         )}
                       </View>
                     );
                   })}
                 </View>
               </View>
               {/* Cierra vista que contiene a las preguntas */}
             </View>

             <View
               style={{
                 marginTop: 70,
                 flexDirection: 'row',
                 justifyContent: 'space-between',
               }}
             >
               <TouchableOpacity style={{width: 40, height: 40}}>
               <Icon
                 style={{ marginTop: 7, marginStart: 20 }}
                 onPress={() =>
                   this.props.navigation.navigate('MyChoicesGraphic')
                 }
                 name="chevron-left"
                 color="black"
                 size={25}
               />
               </TouchableOpacity>
               <TouchableOpacity style={{width: 40, height: 40}}>
               <Icon
                 style={{ marginTop: 7, marginEnd: 20 }}
                 onPress={() => this.wellness()}
                 name="chevron-right"
                 color="black"
                 size={25}
               />
               </TouchableOpacity>
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
   touchable1: {
     width: 25,
     height: 25,
     marginTop: 0,
     backgroundColor: 'lightgray',
     borderRadius: 30,
   },
   touchable2: {
     width: 25,
     height: 25,
     marginTop: 0,
     backgroundColor: 'darkgray',
     borderRadius: 30,
   },
   point: {
     color: 'black',
     textAlign: 'center',
     marginTop: 3,
     fontWeight: '400',
   },
 });

