import React, { Component } from 'react'
import { ListItem } from 'react-native-elements'
import { Text, View, TouchableOpacity } from 'react-native'
import { hospitalList } from './hospotalList'
const list = [
  {
    title: 'Appointments',
    icon: 'av-timer'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff'
  },
]

class HospitalView extends Component {
  render() {
    const {
      navigation: {
        goBack,
        state: {
          params: {
            handleHospital
          }
        } }
    } = this.props

    return (
      <View>
        {
          hospitalList.map((item, i) => (
            <TouchableOpacity key={item.id} onPress={() => handleHospital(item.name) || goBack()}>
              <ListItem
                title={item.name}
              />
            </TouchableOpacity>
          ))
        }
      </View>
    )
  }
}

export default HospitalView