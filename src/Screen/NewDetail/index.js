import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class Setting extends Component {
  static navigationOptions = ({ navigation })=> ({
    headerTitle: 'TEST',
  });
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Helloworld</Text>
      </View>
    )
  }
}
export default Setting