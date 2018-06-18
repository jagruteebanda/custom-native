import React, { Component } from 'react';

import AppNavigator from './app/app.navigator';

type Props = {};
export default class App extends Component<Props> {

  // cameraButtonPress() {
  //   NativeModules.CustomModule.openCamera();
  // }

  render() {
    return (
      <AppNavigator/>
    );
  }
}

// <View>
//   <TouchableWithoutFeedback onPress={() => this.cameraButtonPress()}>
//     <View style={{ height: 50, width: 100, backgroundColor: '#ba124c', alignItems: 'center', justifyContent: 'center' }}>
//       <Text style={{ fontSize: 20, color: '#000000' }}>{'Camera'}</Text>
//     </View>
//   </TouchableWithoutFeedback>
// </View>
