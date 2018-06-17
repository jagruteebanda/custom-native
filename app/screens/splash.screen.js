import React, { Component } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import { inject } from 'mobx-react'; //decorator

@inject("stores")
export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: this.props.stores,
            navigation: this.props.navigation
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.state.navigation.navigate("Login")
        }, this.state.stores.config.SplashTime);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image
                    style={{ flex: 1, width: null, height: null }}
                    source={this.state.stores.config.SplashImg}
                />
            </View>
        );
    }
}

// export default SplashScreen;
