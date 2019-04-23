import React,{Component} from 'react'
import PushNotification from 'react-native-push-notification'
export default class  PushNotificationControllerr extends  Component{
  componentDidMount(){
    PushNotification.configure({
      onNotification:(notification)=>{
        console.log('Notification',notification)
      }
    })
  }
  render(){
    return null;
  }
}