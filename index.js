import {AppRegistry} from 'react-native';
import FindScreen from './screens/FindScreen';
import MovieScreen from './screens/MovieScreen';
import SecondScreen from './screens/SecondScreen';
import ThirdScreen from './screens/ThirdScreen';
import {name as appName} from './app.json';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";
  
const MoviesNavigator = createStackNavigator({
    FindScreen: {
      screen: FindScreen
    },
    MovieScreen: {
      screen: MovieScreen
    }},
    {
        initialRouteName: 'FindScreen'
    }
  );

const TabNavigator = createBottomTabNavigator({
    MoviesScreen: MoviesNavigator,
    SecondScreen: SecondScreen,
    ThirdScreen: ThirdScreen
});

AppRegistry.registerComponent(appName, () => createAppContainer(TabNavigator));
