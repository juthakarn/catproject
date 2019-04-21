import React, { Component } from 'react';
import moment from 'moment'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import styled from 'styled-components';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { addNewAppointment } from '../../actions';



const DateTextInput = styled(Text)`
  border: 1px solid #000;
  width:250px;
  height:40px;
  padding:10px 15px;
  margin-right: 15px;
`
const TouchedComponent = styled(TouchableOpacity)`
  display: flex;
  justify-content:space-evenly;
  flex-direction:row;
  margin: 15px;
  
`
export const Wrapper = styled(View)`
`

class AppointmentStack extends Component {
  state = {
    isDateTimePickerVisible: false,
    dateValue: false,
    hospital: '',
    detail: '',
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.setState({
      dateValue: date
    })
    this._hideDateTimePicker();

  };
  _handleHospital = (value) => {
    this.setState({
      hospital: value
    })
  }
  handleSubmitForm = () => {
    this.props.handlerAddAppointment(this.state)
    this.props.navigation.goBack()
  }
  render() {
    const { dateValue, hospital } = this.state
    const { navigation } = this.props
    return (
      <View style={{ flex: 1, paddingTop: 50, justifyContent: "flex-start", alignItems: "center" }}>
        <TouchedComponent onPress={this._showDateTimePicker}>
          <DateTextInput>{dateValue ? moment(dateValue).format('LLLL') : 'เลือกวันที่นัดหมาย'}</DateTextInput>
          <Icon
            name='calendar'
            size={40}
            type='font-awesome'
            color='#f50'
       />
        </TouchedComponent>
        <TouchedComponent onPress={() => navigation.navigate('hospitalViewStack', {
          handleHospital: this._handleHospital,
        })}>
          <DateTextInput>{hospital ? hospital : 'เลือกโรงพยาบาล'}</DateTextInput>
          <Icon
            name='hospital-o'
            size={40}
            type='font-awesome'
            color='#f50'
          />
        </TouchedComponent>
        <Input
          label="รายละเอียด"
          onChangeText={(text) => this.setState({ detail: text })}
          containerStyle={{ padding: 15 }}
          shake={true}
        />
        <Button
          onPress={this.handleSubmitForm}
          title="ยืนยันรายการแจ้งเตือน"
        />
        <DateTimePicker
          mode="datetime"
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    );
  }

}
const mapDispatchToProps = (dispatch) => ({
  handlerAddAppointment: (payload) => dispatch(addNewAppointment(payload))
})
export default connect(null, mapDispatchToProps)(AppointmentStack)