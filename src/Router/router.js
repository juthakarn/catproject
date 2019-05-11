//router.js
import React, { Component } from 'react';
import { View,Text } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  TabBarBottom,
  createBottomTabNavigator,
  createSwitchNavigator,
  TabNavigator
} from 'react-navigation';
import SignInScreen from "../Screen/SignInScreen";
import SignUpScreen from '../Screen/SignUpScreen';
import HomScreen from '../Screen/HomeScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../Screen/HomeScreen';
import DetailScreen from '../Screen/DetailScreen';
import NewDetail from '../Screen/NewDetail';
import SettingScreen from '../Screen/SettingScreen';
import AppointmentScreen from '../Screen/AppointmentScreen'
import AppointmentStack from '../Screen/AppointmentStack/index'
import AddcatScreen from '../Screen/AddcatScreen'
import tab1 from '../Screen/Tab1';
import HeaderStyles from "../HeaderStyle";
import CustomHeader from '../Component/CustomHeader'
import HospitalView from '../Screen/AppointmentStack/hospitalView';
import MarkerView from '../Component/MarkerView';

let headerDefaultNavigationConfig = {
  header: props => <CustomHeader {...props} />,
  ...HeaderStyles
};
const Register = createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      title: "Sign Up ",
      header: null
    }
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      title: "Sign Up",
      header: null
    }
  },
})


// const Appointment = createStackNavigator(
//   {
//     AppointmentScreen: {
//       screen: AppointmentScreen,
//       navigationOptions: {
//         headerLeft: null,
//       }
//     }
//   }
// );
const Setting = createStackNavigator(
  {
    SettingScreen: {
      screen: SettingScreen,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "โปรไฟร์"
      }
    }
  }
);
const HomeMapScreen = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
    },
    MarkerScreen:{
      screen:MarkerView,
    },
    CatScreen :{
      screen: AddcatScreen,
    },
    NewDetail:{
      screen:NewDetail,
    },
    AppointmentStack:{
      screen:AppointmentStack,
    },
  }, 
);
const AppStack = createBottomTabNavigator({

  'หน้าหลัก': {
    screen: HomeMapScreen,
  },
  'ข่าวสาร': createStackNavigator({
    Detail:{
      screen:DetailScreen,
    },
    NewDetail:{
      screen:NewDetail,
    },
  }),
  'นัดหมาย':createStackNavigator({
    Appointment:{
      screen:AppointmentScreen,
    },
    AppointmentStack:{
      screen:AppointmentStack,
    },
    hospitalViewStack:{
      screen:HospitalView,
    }
  }),
  'โปรไฟร์': {
    screen: Setting
  }

})

const Route = createSwitchNavigator(
  {
    Authentication: Register,
    App: AppStack

  },
  {
    initialRouteName: 'Authentication',
  }
)


export default createAppContainer(Route)