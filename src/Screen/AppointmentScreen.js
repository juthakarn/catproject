import React, { Component } from 'react';
import { Text, View, Button,AppState} from 'react-native';
import  PushNotification from 'react-native-push-notification'

class Setting extends Component {
  componentDidMount(){
    AppState.addEventListener('change',this.handlerAppStateChange)
  }
  componentWillUnmount(){
    AppState.addEventListener('change',this.handlerAppStateChange)
  }
  handlerAppStateChange=(AppState)=>{
    if(AppState=='background'){
      PushNotification.localNotificationSchedule({
        message:'test notification',
        date: new Date(Date.now() + (5000))
      })
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Appointment Screen</Text>
        <Button
          title="press12"
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