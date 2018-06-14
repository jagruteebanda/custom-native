import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import SplashScreen from './screens/splash.screen';
const Splash = {
    screen: SplashScreen,
    navigationOptions: {
        header: null // sets header of the screen to null
    }
}

const RouteConfig = {
    initialRoute: 'SplashScreen'
};

const AppNavigator = DrawerNavigator({
    Splash: Splash
}, RouteConfig);

export default AppNavigator;
