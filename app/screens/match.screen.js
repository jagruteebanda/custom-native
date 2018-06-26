import React, { Component } from 'react';
import {
    Container,
    Content,
    Icon,
    Button
} from 'native-base';

import { inject } from 'mobx-react';
import Match from '../components/match.component';

@inject("stores")
export default class MatchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          stores: this.props.stores
        }
    }

    static navigationOptions = ({navigation}) => ({
        headerRight: <Button
                        transparent
                        onPress={() => navigation.navigate('Post')}
                     >
                        <Icon name='camera' style={{ color: '#fff' }} sie={28} />
                    </Button>
    })

    render() {
        return(
            <Container>
                <Content
                    scrollEnabled={false}
                    style={{ backgroundColor: '#858585' }}
                >
                    <Match {...this.props} />
                </Content>
            </Container>
        );
    }
}
