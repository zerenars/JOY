/* eslint-disable no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-ionicons';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import LoginScreen from './src/screens/LoginScreen.js';
import MenuScreen from './src/screens/Menu.js';
import CreatingScreen from './src/screens/Creating.js';
import FocusScreen from './src/screens/Focus.js';
import GongScreen from './src/screens/Gong.js';
import GuideScreen from './src/screens/Guide.js';
import MeditationScreen from './src/screens/Meditation.js';
import MeditationTimerScreen from './src/screens/MeditationTimer.js';
import CompromiseScreen from './src/screens/Compromise.js';
import MyCompromiseScreen from './src/screens/MyCompromise.js';
import MyCompromiseGraphicScreen from './src/screens/MyCompromiseGraphic.js';
import ChooseScreen from './src/screens/Choose.js';
import MyChoicesScreen from './src/screens/MyChoices.js';
import MyChoicesGraphicScreen from './src/screens/MyChoicesGraphic.js';
import WellnessScreen from './src/screens/Wellness.js';
import MyWellnessScreen from './src/screens/MyWellness.js';
import MyWellnessGraphicScreen from './src/screens/MyWellnessGraphic.js';
import ProgressScreen from './src/screens/Progress.js';
// import RecoveryCodeScreen './src/screens/RecoveryCode.js';

import RegisterScreen from './src/screens/Register.js';
import RecoveryCodeScreen from './src/screens/RecoveryCode.js';
import ValidateCodeScreen from './src/screens/ValidateCode.js';
import InstructionsScreen from './src/screens/Instructions';
import SetNewPassScreen from './src/screens/SetNewPass.js';
// import Icon from 'react-native-vector-icons/FontAwesome';

import React from 'react';

const {width, height} = Dimensions.get('screen');

const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
    Menu: {
      screen: MenuScreen,
      headerMode: 'screen',
    },
    Instructions: {
      screen: InstructionsScreen,
      headerMode: 'screen',
    },
    Creating: {
      screen: CreatingScreen,
      headerMode: 'screen',
    },
    Focus: {
      screen: FocusScreen,
      headerMode: 'screen',
    },
    Gong: {
      screen: GongScreen,
      headerMode: 'screen',
    },
    Meditation: {
      screen: MeditationScreen,
      headerMode: 'screen',
    },
    MeditationTimer: {
      screen: MeditationTimerScreen,
      headerMode: 'screen',
    },
    Guide: {
      screen: GuideScreen,
      headerMode: 'screen',
    },
    Compromise: {
      screen: CompromiseScreen,
      headerMode: 'screen',
    },
    Choose: {
      screen: ChooseScreen,
      headerMode: 'screen',
    },
    Wellness: {
      screen: WellnessScreen,
      headerMode: 'screen',
    },
    MyWellness: {
      screen: MyWellnessScreen,
      headerMode: 'screen',
    },
    MyWellnessGraphic: {
      screen: MyWellnessGraphicScreen,
      headerMode: 'screen',
    },

    MyCompromise: {
      screen: MyCompromiseScreen,
      headerMode: 'screen',
    },
    MyCompromiseGraphic: {
      screen: MyCompromiseGraphicScreen,
      headerMode: 'screen',
    },
    MyChoices: {
      screen: MyChoicesScreen,
      headerMode: 'screen',
    },
    MyChoicesGraphic: {
      screen: MyChoicesGraphicScreen,
      headerMode: 'screen',
    },
    Progress: {
      screen: ProgressScreen,
      headerMode: 'screen',
    },
    RecoveryCode: {
      screen: RecoveryCodeScreen,
      headerMode: 'screen',
    },
    ValidateCode: {
      screen: ValidateCodeScreen,
      headerMode: 'screen',
    },
    SetNewPass: {
      screen: SetNewPassScreen,
      headerMode: 'screen',
    },
  },
  {
    // initialRouteName: 'MeditationTimer',
    defaultNavigationOptions: {
      headerTintColor: '#000',
      //headerLeft:  (<TouchableOpacity onPress={()=>{this.navigate.navigate('DrawerOpen')}}><Image style={{ width: 24, height: 24, marginLeft: 8 }} source={require('./src/assets/user.png')}/></TouchableOpacity>),
      //headerTitle : (<Image style={{ width: 32, height: 32 }} source={require('./src/assets/main_bar_icon.png')}/>),
      headerTitle: ' Joy',
      headerBackTitle: 'Atrás',
      headerStyle: {
        backgroundColor: '#fff',
      },
      backgroundColor: '#fff',
    },
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    Inicio: AuthNavigator,

    // Inicio: AuthNavigator,
    // Reservas: ReservationNavigator,
    //Promos: HomeNavigator,
    // Perfil: ProfileNavigator,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Inicio') {
          iconName = 'ios-home';
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          //IconComponent = HomeIconWithBadge;
        }

        // if (routeName === 'Reservas') {
        //   iconName = 'ios-calendar';
        // }

        // if (routeName === 'Promos') {
        //   iconName = `ios-flame`;
        // }

        // if (routeName === 'Perfil') {
        //   iconName = 'ios-person-circle-outline';
        // }
      },
    }),
    tabBarOptions: {
      marginBottom: 20,
      activeTintColor: '#000',
      inactiveTintColor: 'gray',
      fontSize: 32,
    },
  },
);

export default createAppContainer(AuthNavigator);
