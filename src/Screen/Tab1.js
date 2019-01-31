import React from "react";
import { View, Text, Button } from "react-native";
import { connect } from 'react-redux'

const Tab1 = ({ auth, navigation }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Button title="Press to stack " onPress={() => { navigation.navigate('Appointment') }} />
    <Text>อุปกรณ์เลี้ยงแมวเบื้องต้น</Text>
    <TextSimulator pop={auth.name} bar='hi there' />
  </View>
)
const TextSimulator = ({ pop, bar }) => (
  <View>
    <Text>{pop}</Text>
    <Text>{bar}</Text>
  </View>
)
// class Tab1 extends React.Component {
//     render() {
//         console.log('props is=>', this.props)
//         return (
//             <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//                 <Button title="Press to stack " onPress={() => { this.props.navigation.navigate('Tab3') }} />
//                 <Text>อุปกรณ์เลี้ยงแมวเบื้องต้น</Text>
//             </View>
//         );
//     }
// }
const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps, null)(Tab1);