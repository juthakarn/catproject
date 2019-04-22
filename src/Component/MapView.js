import React, { Component } from 'react';
import moment from 'moment';

import { connect } from 'react-redux'
import { Text, View, StyleSheet, Image, AppState } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import styled from 'styled-components/native'
import { fetchCatList, HOST, fetchAppointment } from '../actions';
import PushNotification from 'react-native-push-notification'

const PinImage = styled.Image`
  width: 50;
  height: 50;
  border-radius: 100;
`
class App extends Component {

  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locations: null
  };

  componentDidMount() {
    this._getLocationAsync();
    this.props.fetchCat()
    this.props.handlerFetchAppointment()
    AppState.addEventListener('change', this.handlerAppStateChange)
  }
  componentWillUnmount() {
    AppState.addEventListener('change', this.handlerAppStateChange)
  }
  handlerAppStateChange = (AppState) => {
    if (AppState == 'background') {

      this.props.appointment.map(({ id, date, hospital, detail }) => {
        PushNotification.localNotificationSchedule({
          userInfo: { id: `${id}` },
          title: 'นัดหมายสัตว์เลี้ยง',
          message: `${detail}  ${hospital ? `ที่ ${hospital}` : ''} เวลา ${moment(date).format('llll')}`,
          date: new Date(date),
          repeatType: 'hour'
        })
      })
    } else {
      PushNotification.cancelAllLocalNotifications()
    }
  }

  _handleNotification = () => {
    PushNotification.localNotificationSchedule({
      foreground: true,
      message: 'test notification',
      date: new Date(Date.now() + (5000)),
      badge: 1
    })
  }
  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
    navigator.geolocation.getCurrentPosition(position => {
      const locations = position;
      this.setState({
        mapRegion: {
          latitude: locations.coords.latitude,
          longitude: locations.coords.longitude,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5
        }
      });
    },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
    // Center the map on the location we just fetched.
  };

  render() {
    console.log(this)
    return (
      <View style={styles.container}>
        
        {
          this.state.locationResult === null ?
            <Text>Finding your current location...</Text> :
            this.state.mapRegion === null ?
              <Text>Map region doesn't exist.</Text> :
              <MapView
                style={{ alignSelf: 'stretch', height: '100%' }}
                initialRegion={this.state.mapRegion}
              >
                {
                  this.props.catlist.map(data => {
                    const { id, latitude, longitude, address, contact, imagepath, message } = data
                    return (
                      <Marker
                        key={id}
                        coordinate={{ latitude, longitude, latitudeDelta: 0.5, longitudeDelta: 0.5 }}
                        title={message}
                        description={`สถานที่ติดต่อ:${address} เบอร์ติดต่อ: ${contact}`}>
                        <View>
                          <Image
                            style={{ width: 50, height: 50, borderTopRightRadius: 100 }}
                            source={{ uri: `${HOST}/${imagepath}` }}
                          />
                        </View>
                      </Marker>
                    )
                  })
                }

              </MapView>

        }
      </View>

    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchCat: () => dispatch(fetchCatList()),
  handlerFetchAppointment: () => dispatch(fetchAppointment())
})
const mapStateToProps = ({ findingcat, appointment }) => {
  const { list = [] } = findingcat
  return {
    catlist: list,
    appointment
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
