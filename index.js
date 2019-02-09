/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import FindScreen from './screens/FindScreen';
import SecondScreen from './screens/SecondScreen';
import ThirdScreen from './screens/ThirdScreen';
import {name as appName} from './app.json';
import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";
  
const TabNavigator = createBottomTabNavigator({
    FindScreen: FindScreen,
    SecondScreen: SecondScreen,
    ThirdScreen: ThirdScreen
});
    

AppRegistry.registerComponent(appName, () => createAppContainer(TabNavigator));
