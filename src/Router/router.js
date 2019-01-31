//router.js
import React, { Component } from 'react';
import { View } from "react-native";
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
import SettingScreen from '../Screen/SettingScreen';
import AppointmentScreen from '../Screen/AppointmentScreen'
import tab1 from '../Screen/Tab1';
import HeaderStyles from "../HeaderStyle";
import CustomHeader from '../Component/CustomHeader'

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
      title: "Sign In",
      header: null
    }
  },
  HomScreen1: {
    screen: HomScreen,
    navigationOptions: {
      headerLeft: null,
      headerTitle: "Tab 2 Screen"
    }
  }
})


const Tab1Screen = createStackNavigator(
  {
    Tab1: {
      screen: tab1,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Tab 1 Screen"
      }
    }
  }
);
const Detail = createStackNavigator(
  {
    Tab1: {
      screen: DetailScreen,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Detail"
      }
    }
  }
);
const Appointment = createStackNavigator(
  {
    Tab1: {
      screen: AppointmentScreen,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Appointment"
      }
    }
  }
);
const Setting = createStackNavigator(
  {
    Tab1: {
      screen: SettingScreen,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Setting"
      }
    }
  }
);
const HomeMapScreen = createStackNavigator(
  {
    Tab1: {
      screen: HomeScreen,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Map"
      }
    }
  }
);
const AppStack = createBottomTabNavigator({

  Home: {
    screen: HomeMapScreen,
  },
  Detail: {
    screen: Detail,
  },
  Appointment: {
    screen: Appointment
  },
  Setting: {
    screen: Setting
  }

},
  {
    navigationOptions: {
      ...headerDefaultNavigationConfig
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