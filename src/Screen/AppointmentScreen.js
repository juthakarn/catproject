import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class Setting extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Appointment Screen</Text>
        <Button
          title="press1"
          raised
          onPress={() => this.props.navigation.navigate("DetailScreen", { hideTabBar: true })}
        />
        <Button
          title="press1"
          raised
          onPress={() => this.props.navigation.navigate("Tab2", { hideTabBar: true })}
        >
          <Text>โรคที่ควรรู้เบื้องต้น</Text>
        </Button>
      </View>
    )
  }
}
export default Setting