import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';

import SplashScreen from './screens/splash.screen';
import LoginScreen from './screens/login.screen';
import MatchScreen from './screens/match.screen';

const Splash = {
    screen: SplashScreen,
    navigationOptions: {
        header: null // sets header of the screen to null
    }
}
const Login = {
    screen: LoginScreen,
    navigationOptions: {
        header: null // sets header of the screen to null
    }
}
const Match = {
    screen: MatchScreen,
    navigationOptions: {
        headerMode: 'screen',
        headerTitle: 'Matches',
        drawerLabel: 'Matches'
    }
}

const MatchStack = StackNavigator({
    Match: Match
}, {});

const RouteConfig = {
    initialRoute: 'SplashScreen'
};

const AppNavigator = DrawerNavigator({
    Splash: Splash,
    Login: Login,
    Match: { screen: MatchStack }
}, RouteConfig);

export default AppNavigator;
