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
import Appointment from '../Screen/AppointmentScreen'
import tab1 from '../Screen/Tab1';
import HeaderStyles from "../HeaderStyle";
import CustomHeader from '../Component/CustomHeader'

let headerDefaultNavigationConfig = {
    header: props => <CustomHeader {...props} />,
    ...HeaderStyles
};
const Register = createStackNavigator({
        SignIn: SignInScreen,
        SignUp: SignUpScreen,
        HomScreen1: HomScreen
    })


// const Tab1Screen = createStackNavigator(
//     {
//         Tab1: {
//             screen: tab1,
//             navigationOptions: {
//                 headerLeft: null,
//                 headerTitle: "Tab 1 Screen"
//             }
//         }
//     }
// );
// const Tab2Screen = createStackNavigator(
//     {
//         Tab1: {
//             screen: DetailScreen,
//             navigationOptions: {
//                 headerLeft: null,
//                 headerTitle: "Tab 2 Screen"
//             }
//         }
//     }
// );
// const Tab3Screen = createStackNavigator(
//     {
//         Tab1: {
//             screen: Appointment,
//             navigationOptions: {
//                 headerLeft: null,
//                 headerTitle: "Tab 3 Screen"
//             }
//         }
//     }
// );
// const Tab4Screen = createStackNavigator(
//     {
//         Tab1: {
//             screen: SettingScreen,
//             navigationOptions: {
//                 headerLeft: null,
//                 headerTitle: "Tab 3 Screen"
//             }
//         }
//     }
// );
// const HomeMapScreen = createStackNavigator(
//     {
//         Tab1: {
//             screen: HomeScreen,
//             navigationOptions: {
//                 headerLeft: null,
//                 headerTitle: "Map"
//             }
//         }
//     }
// );
// const AppStack = createBottomTabNavigator({

//     Home: {
//         screen: HomeMapScreen,
//     },
//     Detail: {
//         screen: Tab2Screen,
//     },
//     Appointment: {
//         screen: Tab3Screen
//     },
//     Setting: {
//         screen: Tab4Screen
//     }

// },
//     {
//         navigationOptions: {
//             ...headerDefaultNavigationConfig
//         }
//     })

// const Route = createSwitchNavigator(
//     {
//         Authentication: Register,
//         App: AppStack

//     },
//     {
//         initialRouteName: 'Authentication',
//     }
// )


export default createAppContainer(Register)