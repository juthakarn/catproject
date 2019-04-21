import React, { Component } from 'react';
import { Text, View, ScrollView, Button, AppState } from 'react-native';
import moment from 'moment'
import { Card, ListItem, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import PushNotification from 'react-native-push-notification'
import { fetchAppointment } from '../actions';

class Appointment extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <Button
        onPress={() => navigation.navigate("AppointmentStack")}
        title="สร้างรายการแจ้งเตือน"
        color="#007AC2"
      />
    ),
  });
  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          {
            this.props.appointment.map(({ id, date, hospital, detail }) => {
              return (
                <Card
                  key={`card-data-${id}`}
                  width={'90%'}
                  title={`เรื่อง ${detail}`}
                >
                  <Text style={{ color: '#000' }}>เวลา​{moment(date).format('llll')}</Text>
                  {hospital ? <Text style={{ color: '#000' }} key={id}>ที่ {hospital}</Text> : null}
                </Card>
              )
            })
          }
          {
            this.props.appointment.length == 0 && <Text style={{ marginTop: 20 }}>ไม่มีรายการแจ้งเตือน</Text>
          }

        </View>
      </ScrollView>
    )
  }
}
const mapStateToProps = ({ appointment }) => {
  return {
    appointment
  }
}
const mapDisPatchToProps = (dispatch) => ({
  handlerFetchAppointment: () => dispatch(fetchAppointment())
})

export default connect(mapStateToProps, mapDisPatchToProps)(Appointment)