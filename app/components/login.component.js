import React, { Component } from 'react';
import {
    Button,
    Item,
    Input,
    Icon,
    Form,
    Text
} from 'native-base';
import {
  ToastAndroid
} from 'react-native';

import { observer } from 'mobx-react/native';
import { observable } from 'mobx';

@observer
class Login extends Component {

    @observable email = '';
    @observable password = '';

    constructor(props) {
        super(props);
        this.state = {
            auth: this.props.stores.auth,
            navigation: this.props.navigation
        };
    }

    signIn() {
        // const { auth } = this.props.stores;
        // const { navigate } = this.props.navigation;
        this.state.auth.signIn({
            email: this.email,
            password: this.password
        }).then((response) => {
            console.log(response);
            this.state.navigation.navigate('Match');
        }).catch((err) => {
            ToastAndroid.show('Pleaes check credentials');
        });
    }

    render() {
        return (
            <Form>
                <Item style={{ marginBottom: 10 }} rounded>
                    <Icon style={{ color: '#fff' }} name="person-outline" />
                    <Input
                        style={{ color: '#fff' }}
                        placeholder="Please enter email"
                        placeholderTextColor="#fff"
                        onChangeText={(email) => this.email = email}
                    />
                </Item>
                <Item style={{ marginBottom: 10 }} rounded>
                    <Icon style={{ color: '#fff' }} name="lock-open" />
                    <Input
                        style={{ color: '#fff' }}
                        placeholder="Please enter password"
                        placeholderTextColor="#fff"
                        secureTextEntry={true}
                        onChangeText={(pass) => this.password = pass}
                    />
                </Item>
                <Button
                    rounded
                    block
                    style={{ marginBottom: 10 }}
                    onPress={() => this.signIn()}>
                    <Text>Login</Text>
                </Button>
            </Form>
        );
    }

}

export default Login;
