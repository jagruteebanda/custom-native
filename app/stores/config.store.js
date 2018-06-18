import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBHnojEJYUQSZVW4Av8tBI8mLHAL-aweo0",
    authDomain: "custom-native.firebaseapp.com",
    databaseURL: "https://custom-native.firebaseio.com",
    projectId: "custom-native",
    storageBucket: "custom-native.appspot.com",
    messagingSenderId: "239276598592"
  };

export default class ConfigStore{
    constructor() {
        firebase.initializeApp(config)
        this.splashTime = 1000;
        this.splashImg = require('../../images/splash.jpg');
        this.loginBG = require('../../images/login.jpg');
    }

    get SplashImg() {
        return this.splashImg;
    }

    get SplashTime() {
        return this.splashTime;
    }

    get LoginBG() {
        return this.loginBG;
    }
};
