import React, { Component } from 'react';
import {
  Button,
  Icon,
  Spinner,
  Card,
  CardItem,
  DeckSwiper
} from 'native-base';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import { createAutoSubscriber, autoSubscriber } from 'firebase-nest';

class Match extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.stores);
        this.state = {
          _autoSubscriberFetching: true,
          _autoSubscriberError: null,
          matches: this.props.stores.matches,
          auth: this.props.stores.auth
        }
    }

    static getSubs(props, state) {
      return this.state.auth.authUser ? this.state.matches.subs() : [];
    }

    subscribeSubs(subs, props, state) {
      const { matches } = props.stores;
      return matches.subscribeSubswWithPromise(subs);
    }

    markViewed(match) {
      this.props.stores.matches.markViewed(match[0]);
    }

    renderCard(post, store) {
      const postObj = post ? post[1] : null;
      if (postObj) {
        let pic = {
          uri: postObj.url
        };
        let text = postObj.text;
        return (
          <Card>
            <CardItem cardBody>
              {
                (pic.uri !== undefined && pic.uri !== "") ?
                  <Image source={pic} style={styles.thumbnail}/>
                :
                  null
              }
            </CardItem>
            <CardItem>
              <Text style={styles.text}>
                {text}
              </Text>
            </CardItem>
          </Card>
        );
      }
      return null;
    }

    renderNoMoreCards() {
      return (
        <Card>
          <CardItem cardBody>
            <Text style={styles.text}>Out of matches</Text>
          </CardItem>
        </Card>
      )
    }

    render() {
      const user = auth.authUser;
      const {_autoSubscriberFetching: fetching, _autoSubscriberError: fetchError} = this.state;
      if(fetchError) {
        return (
          <Text style={{ backgroundColor: 'red' }}>{fetchError}</Text>
        )
      }

      const postList = matches.getData('matches');
      const list = postList ? postList.entries() : null;
        return(
            <View>
              {
                (fetching) ?
                  <Spinner/>
                :
                  <DeckSwiper
                    dataSource={list}
                    renderItem={(card) => this.renderCard(card, matches)}
                    renderEmpty={() => this.renderNoMoreCards()}
                    looping={false}
                    onSwipeRight={(item) => this.markViewed(item)}
                    onSwipeLeft={(item) => this.markViewed(item)}
                  />
              }
            </View>
        );
    }
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  thumbnail: {
    width: 300,
    height: 300,
    flex: 1
  }
});

export default autoSubscriber(observer(Match));
