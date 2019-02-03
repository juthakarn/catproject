import React, { Component } from 'react';
import Mapview from '../Component/MapView'
import { StyleSheet, Text, View, Image } from 'react-native';

export default class HomeScreen extends Component {

  render() {

    const user = {
      name: 'kittinut',
      surname: 'pramhan',
      age: 21,
      father: (arg) => {
        return arg + 'pramhan'
      }
    }
    return (
      <View style={styles.container}>
        <Mapview/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db'
  },
  subformcontainer: {
    padding: 20
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 150,
    height: 150
  },
  title: {
    color: '#252525',
    marginTop: 5,
    width: 160,
    textAlign: 'center',
    opacity: 1.0
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500'

  }
});