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

 import React, { Component } from "react";
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
 } from "react-native";
 import Icon from "react-native-vector-icons/FontAwesome";
 import {
   VictoryBar,
   VictoryChart,
   VictoryTheme,
   VictoryPolarAxis,
   VictoryLabel,
   VictoryArea,
   VictoryGroup,
 } from "victory-native";
 export const SCREEN_WIDTH = Dimensions.get("window").width;
 export const SCREEN_HEIGHT = Dimensions.get("window").height;
 const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
 const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 0;
 const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 64;
 const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
 
 const characterData = [
   // { strength: 1, intelligence: 250, luck: 1, stealth: 40, charisma: 50 },
   // { strength: 2, intelligence: 300, luck: 2, stealth: 80, charisma: 90 },
   // { strength: 5, intelligence: 255, luck: 3, stealth: 60, charisma: 120 },
   { 1: 0, 2: 0, 3: 0, 4: 0, 5: 5 },
 ];
 const characterDataMaxima = [
   // { strength: 1, intelligence: 250, luck: 1, stealth: 40, charisma: 50 },
   // { strength: 2, intelligence: 300, luck: 2, stealth: 80, charisma: 90 },
   // { strength: 5, intelligence: 255, luck: 3, stealth: 60, charisma: 120 },
   { 1: 5, 2: 5, 3: 5, 4: 5, 5: 5 },
 ];
 
 export default class MyChoicesGraphicScreen extends Component {
   constructor(props) {
     super(props);
     this.state = {
       data: this.processData(characterData, characterDataMaxima),
       maxima: this.getMaxima(characterDataMaxima),
       questions1: this.props.navigation.getParam("questions"),
       formdata: this.props.navigation.getParam("formdata"),
     };
   }
 
   componentDidMount() {
     console.log("zr7");
     this.getValue();
   }
 
   getValue() {
     var source = ["1", "2", "3", "4", "5"];
     var questions = this.state.questions1;
     let result = [];
     result.push(
       source.reduce(
         (obj, arrValue, index) => ((obj[arrValue] = questions[index]), obj),
         {}
       )
     );
     console.log("made it");
     console.log(result);
 
     this.setState({
       data: this.processData(result, characterDataMaxima),
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
 
   processData(data, maxima) {
     const maxByGroup = this.getMaxima(maxima);
     console.log("valuesss");
     console.log(maxByGroup);
 
     const makeDataArray = (d) => {
       return Object.keys(d).map((key) => {
         return { x: key, y: d[key] / maxByGroup[key] };
       });
     };
     return data.map((datum) => makeDataArray(datum));
   }
 
   render() {
     return (
       <ScrollView>
         <SafeAreaView
           style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, flex: 1 }}
         >
           <VictoryChart
             polar
             theme={VictoryTheme.material}
             domain={{ y: [0, 1] }}
           >
             <VictoryGroup
               colorScale={["gold", "orange", "tomato"]}
               style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
             >
               {this.state.data.map((data, i) => {
                 return <VictoryArea key={i} data={data} />;
               })}
             </VictoryGroup>
             {Object.keys(this.state.maxima).map((key, i) => {
               return (
                 <VictoryPolarAxis
                   key={i}
                   dependentAxis
                   style={{
                     axisLabel: { padding: 10 },
                     axis: { stroke: "none" },
                     grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 },
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
               tickFormat={() => ""}
               style={{
                 axis: { stroke: "none" },
                 grid: { stroke: "grey", opacity: 0.5 },
               }}
             />
           </VictoryChart>
 
           <View style={{ marginTop: 10 }}>
             <Text
               style={{
                 textAlign: "center",
                 color: "black",
                 fontWeight: "500",
                 fontSize: 20,
               }}
             >
               MIS ELECCIONES
             </Text>
           </View>
 
           <View
             style={{
               marginStart: 25,
               marginEnd: 25,
               marginTop: 30,
               justifyContent: "flex-start",
             }}
           >
             <Text
               style={{
                 marginTop: 10,
                 fontSize: 15,
                 color: "black",
                 marginBottom: 0,
               }}
             >
               1 ¿Elegí vivir en el momento presente?
             </Text>
 
             <Text
               style={{
                 marginTop: 10,
                 fontSize: 15,
                 color: "black",
               }}
             >
               2 ¿Aprecié y agradecí?
             </Text>
 
             <Text
               style={{
                 marginTop: 10,
                 fontSize: 15,
                 color: "black",
               }}
             >
               3 ¿Me acepté y amé exactamente como soy?
             </Text>
 
             <Text
               style={{
                 marginTop: 10,
                 fontSize: 15,
                 color: "black",
               }}
             >
               4 ¿Solté apegos, adicciones, miedos, juicios, ideas y necesidad de
               tener razón?
             </Text>
 
             <Text
               style={{
                 marginTop: 10,
                 fontSize: 15,
                 color: "black",
               }}
             >
               5 ¿Me entregué con un gran sí a la vida?
             </Text>
 
             <View
               style={{
                 marginTop: 40,
                 flexDirection: "row",
                 justifyContent: "space-between",
               }}
             >
               <Icon
                 style={{ marginTop: 7, marginStart: 5 }}
                 onPress={() => this.props.navigation.navigate("MyChoices")}
                 name="chevron-left"
                 color="black"
                 size={25}
               />
               <Icon
                 style={{ marginTop: 7, marginEnd: 5 }}
                 onPress={() =>
                   this.props.navigation.navigate("MyWellness", {
                     formdata: this.state.formdata,
                   })
                 }
                 name="chevron-right"
                 color="black"
                 size={25}
               />
             </View>
           </View>
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
     fontWeight: "600",
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: "400",
   },
   highlight: {
     fontWeight: "700",
   },
   buttonStyle: {
     marginTop: 10,
     marginBottom: 10,
     height: 40,
     backgroundColor: "#000",
     marginStart: 24,
     marginEnd: 24,
     color: "white",
   },
   touchable1: {
     width: 25,
     height: 25,
     marginTop: 0,
     backgroundColor: "lightgray",
     borderRadius: 30,
   },
   point: {
     color: "black",
     textAlign: "center",
     marginTop: 3,
     fontWeight: "400",
   },
 });
 