import React, { Component } from 'react';
import {connect} from 'react-redux'
import { StyleSheet,Image,Text, View, Button } from 'react-native';
import { fetchUser,logout } from '../actions';

class Setting extends Component {
  componentDidMount(){
    this.props.handlerFetchUser()
  }

  render() {
    const {firstname,lastname,email} = this.props.user
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../Component/Image/logo.png')}></Image>
                <Text style={styles.title}>Application for cats</Text>
               {firstname&&<Text style={styles.title}>{`${firstname||'juthakarn'} ${lastname||'saelim'}`}</Text>}
                {email && <Text style={styles.title}>{email}</Text>}
        <Button
          color="#A60000"
          title="ออกจากระบบ"
          raised
          onPress={() => {
            this.props.handlerLogout() 
            this.props.navigation.navigate('Authentication')
          }}
        >
        </Button>
        </View>
      </View>
    )
  }
}
const mapStateToProps = ({user})=>({user})
const mapDispatchToProps = (dispatch)=>({
  handlerFetchUser:()=>dispatch(fetchUser()),
  handlerLogout:()=>dispatch(logout())
})
export default connect(mapStateToProps,mapDispatchToProps)(Setting)

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#3498db'
  },
  error: {
      color: 'red',
      fontSize: 12,
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
      color: '#FFF',
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