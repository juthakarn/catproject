import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
export default class App extends Component {
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locations: null
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
  navigator.geolocation.getCurrentPosition( position => {
      const locations = position;
      console.log(locations)
      this.setState({ mapRegion: { latitude: locations.coords.latitude, longitude: locations.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } });
    },
    error => Alert.alert(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
    // Center the map on the location we just fetched.
  };

  render() {
    return (
      <View style={styles.container}>
      {
          console.log('mapRegi',this.state.mapRegion)

      }
        {
          this.state.locationResult === null ?
            <Text>Finding your current location...</Text> :
              this.state.mapRegion === null ?
                <Text>Map region doesn't exist.</Text> :
                <MapView
                  style={{ alignSelf: 'stretch', height: '100%' }}
                  initialRegion={this.state.mapRegion}
                >
                  <Marker coordinate={this.state.mapRegion}
                    title={'test'}
                    description={'test discibbe'} />
                </MapView>
        }
      </View>

    );
  }
}

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
