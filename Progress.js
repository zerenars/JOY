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
 import Icon from 'react-native-vector-icons/FontAwesome';
 import Svg, { G, Path, Line } from 'react-native-svg';
 import {
   VictoryBar,
   VictoryChart,
   VictoryTheme,
   VictoryPolarAxis,
   VictoryLabel,
   VictoryArea,
   VictoryGroup,
 } from 'victory-native';
 import CalendarStrip from 'react-native-calendar-strip';
 import ProgressBar from 'react-native-progress/Bar';
 import * as Progress from 'react-native-progress';
 import { EventListener } from '../polka/EventListener';
 import { Storage } from '../polka/Helpers';
 import { Button, Paragraph, Menu, Divider, Provider } from 'react-native-paper';
 import FastImage from 'react-native-fast-image';
import { pinkA700 } from 'react-native-paper/lib/typescript/styles/colors';
 export const SCREEN_WIDTH = Dimensions.get('window').width;
 export const SCREEN_HEIGHT = Dimensions.get('window').height;
 const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
 const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
 const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
 const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

 const characterData = [
   { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 },
   // { strength: 2, width: 20, height: 20, intelligence: 30, luck: 2, stealth: 80, charisma: 45 },
   // { strength: 5, width: 20, height: 20, intelligence: 25, luck: 3, stealth: 60, charisma: 60 },
 ];

 export default class ProgressScreen extends Component {
   constructor(props) {
     super(props);
     this.state = {
       data: this.processData(characterData),
       maxima: this.getMaxima(characterData),
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

   getMaxima(data) {
     const groupedData = Object.keys(data[0]).reduce((memo, key) => {
       memo[key] = data.map((d) => d[key]);
       return memo;
     }, {});
     return Object.keys(groupedData).reduce((memo, key) => {
       memo[key] = Math.max(...groupedData[key]);
       return memo;
     }, {});
   }

   processData(data) {
     const maxByGroup = this.getMaxima(data);
     const makeDataArray = (d) => {
       return Object.keys(d).map((key) => {
         return { x: key, y: d[key] / maxByGroup[key] };
       });
     };
     return data.map((datum) => makeDataArray(datum));
   }

   render() {
     return (
       <ScrollView >
         <SafeAreaView 
           style={{
             marginBottom: 20,
             width: SCREEN_WIDTH,
             height: SCREEN_HEIGHT,
            //  marginBottom: 50,
             flex: 1,
           }}
         >
        <ImageBackground
           style={{ backgroundColor: 'black', height: 800 }}
          //  source={require('../assets/stars4.jpg')}
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

           <View style={styles.container}>
             <CalendarStrip
             backgroundColor={'transparent'}
            color={'white'}
            highlightDateNameStyle={{
              color: 'black',
              fontWeight: '700',
            }}
            highlightDateNumberStyle={{
              color: 'black',

              fontWeight: '700',
            }}
               calendarColor={'white'}
               zIndex={10}
               style={{
                //  backgroundColor: 'transparent',
                 color: 'transparent',
                 height: 100,
                 paddingTop: 20,
                 paddingBottom: 10,
               }}
             />
           </View>

           <View style={{ flexDirection: 'column' }}>
             <View style={{ flexDirection: 'row', marginTop: 0 }}>
               <VictoryChart
                 polar
                 height={200}
                 width={200}
                 theme={VictoryTheme.material}
                 domain={{ y: [0, 1] }}
               >
                 <VictoryGroup
                  //  colorScale={['gold', 'orange', 'tomato']}
                   style={{ data: { fillOpacity: 0, strokeWidth: 0 } }}
                 >
                   {this.state.data.map((data, i) => {
                     return (
                       <VictoryArea
                        //  style={{ width: 50, height: 50 }}
                         key={i}
                         data={data}
                       />
                     );
                   })}
                 </VictoryGroup>
                 {Object.keys(this.state.maxima).map((key, i) => {
                   return (
                     <VictoryPolarAxis
                       key={i}
                       dependentAxis
                       style={{
                         axisLabel: { padding: 10 },
                         axis: { stroke: 'none' },
                         grid: {
                           stroke: 'grey',
                           strokeWidth: 0.25,
                           opacity: 0.5,
                         },
                       }}                       
                       tickLabelComponent={
                         <VictoryLabel labelPlacement="vertical" />
                       }
                       labelPlacement="perpendicular"
                       axisValue={i + 1}
                       label={key}
                       tickFormat={(t) => Math.ceil(t * this.state.maxima[key])}
                       tickValues={[0.25, 0.5, 0.75]}
                     />
                   );
                 })}
                 <VictoryPolarAxis
                   labelPlacement="parallel"
                   tickFormat={() => ''}
                   style={{
                     axis: { stroke: 'none' },
                     grid: { stroke: 'grey', opacity: 0.5 },
                   }}
                 />
               </VictoryChart>
               <View style={{ marginTop: 70 }}>
                 <View ><Text style={{ marginBottom: 20, color: 'white'}}>DIAMANTE COMPROMISO</Text></View>
                 <Progress.Bar color={'#FF1493'} progress={0.3} width={170} height={20} />
               </View>
             </View>
             <View style={{ flexDirection: 'row' }}>
               <VictoryChart
                 polar
                 height={200}
                 width={200}
                 theme={VictoryTheme.material}
                 domain={{ y: [0, 1] }}
               >
                 <VictoryGroup
                   colorScale={['gold', 'orange', 'tomato']}
                   style={{ data: { fillOpacity: 0, strokeWidth: 0 } }}
                 >
                   {this.state.data.map((data, i) => {
                     return (
                       <VictoryArea
                        //  style={{ width: 50, height: 50 }}
                         key={i}
                         data={data}
                       />
                     );
                   })}
                 </VictoryGroup>
                 {Object.keys(this.state.maxima).map((key, i) => {
                   return (
                     <VictoryPolarAxis
                       key={i}
                       dependentAxis
                       style={{
                         axisLabel: { padding: 10 },
                         axis: { stroke: 'none' },
                         grid: {
                           stroke: 'grey',
                           strokeWidth: 0.25,
                           opacity: 0.5,
                         },
                       }}
                       tickLabelComponent={
                         <VictoryLabel labelPlacement="vertical" />
                       }
                       labelPlacement="perpendicular"
                       axisValue={i + 1}
                       label={key}
                       tickFormat={(t) => Math.ceil(t * this.state.maxima[key])}
                       tickValues={[0.25, 0.5, 0.75]}
                     />
                   );
                 })}
                 <VictoryPolarAxis
                   labelPlacement="parallel"
                   tickFormat={() => ''}
                   style={{
                     axis: { stroke: 'none' },
                     grid: { stroke: 'grey', opacity: 0.5 },
                   }}
                 />
               </VictoryChart>

               <View style={{ marginTop: 70 }}>
               <View ><Text style={{ marginBottom: 20, color: 'white'}}>DIAMANTE ELECCIONES</Text></View>
                 <Progress.Bar  color={'#F4A460'} progress={0.3} width={170} height={20} />
               </View>
             </View>

             <View style={{ flexDirection: 'row' }}>
               <VictoryChart
                 polar
                 height={200}
                 width={200}
                 theme={VictoryTheme.material}
                 domain={{ y: [0, 1] }}
               >
                 <VictoryGroup
                   colorScale={['gold', 'orange', 'tomato']}
                   style={{ data: { fillOpacity: 0, strokeWidth: 0 } }}
                 >
                   {this.state.data.map((data, i) => {
                     return (
                       <VictoryArea
                        //  style={{ width: 50, height: 50 }}
                         key={i}
                         data={data}
                       />
                     );
                   })}
                 </VictoryGroup>
                 {Object.keys(this.state.maxima).map((key, i) => {
                   return (
                     <VictoryPolarAxis
                       key={i}
                       dependentAxis
                       style={{
                         axisLabel: { padding: 10 },
                         axis: { stroke: 'none' },
                         grid: {
                           stroke: 'grey',
                           strokeWidth: 0.25,
                           opacity: 0.5,
                         },
                       }}
                       tickLabelComponent={
                         <VictoryLabel labelPlacement="vertical" />
                       }
                       labelPlacement="perpendicular"
                       axisValue={i + 1}
                       label={key}
                       tickFormat={(t) => Math.ceil(t * this.state.maxima[key])}
                       tickValues={[0.25, 0.5, 0.75]}
                     />
                   );
                 })}
                 <VictoryPolarAxis
                   labelPlacement="parallel"
                   tickFormat={() => ''}
                   style={{
                     axis: { stroke: 'none' },
                     grid: { stroke: 'grey', opacity: 0.5 },
                   }}
                 />
               </VictoryChart>

               <View style={{ marginTop: 70 }}>
               <View ><Text style={{color: 'white', marginBottom: 20}}>DIAMANTE BIENESTAR</Text></View>
                 <Progress.Bar color={'#00c200'} progress={0.3} width={170} height={20} />
               </View>
             </View>

             {/* <View
             style={{
               flexDirection: 'row',
               justifyContent: 'space-between',
             }}
           >
             <Icon
               style={{ marginTop: 7, marginStart: 30 }}
               onPress={() => this.props.navigation.navigate('MyWellness')}
               name="chevron-left"
               color="black"
               size={25}
             />
             <Icon
               style={{ marginTop: 7, marginEnd: 30 }}
               onPress={() =>
                 this.props.navigation.navigate('MyWellnessGraphic')
               }
               name="chevron-right"
               color="black"
               size={25}
             />
           </View> */}



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
   point: {
     color: 'black',
     textAlign: 'center',
     marginTop: 3,
     fontWeight: '400',
   },
 });

