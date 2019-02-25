import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Text, View, StyleSheet,Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import styled from 'styled-components/native'
import { fetchCatList } from '../actions';

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
  }

  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
  navigator.geolocation.getCurrentPosition( position => {
      const locations = position;
      console.log(locations)
      this.setState({ mapRegion: { latitude: locations.coords.latitude, longitude: locations.coords.longitude, latitudeDelta: 0.5, longitudeDelta: 0.5 } });
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
                {
                  this.props.catlist.map(data=>{
                    const {id,latitude,longitude,address,contact,imagepath,message} = data
                    
                    console.log('data',data)
                    return (
                    <Marker 
                    key={id}
                    coordinate={{latitude,longitude,latitudeDelta: 0.5, longitudeDelta: 0.5}}
                    title={message}
                    description={`สถานที่ติดต่อ:${address} เบอร์ติดต่อ: ${contact}`}>
                    <View>
                      <Image
                       style={{width: 50, height: 50, borderTopRightRadius:100}}
                       source={{uri: `http://localhost:3000/${imagepath}`}}
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
const mapDispatchToProps = (dispatch)=>({
  fetchCat: ()=>dispatch(fetchCatList())
})
const mapStateToProps = ({findingcat})=>{
  const {list=[]} = findingcat
  return {
    catlist:list
  }
}
export default  connect(mapStateToProps,mapDispatchToProps)(App)

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
