import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar, KeyboardAvoidingView, Image, Button } from 'react-native';
import { connect } from 'react-redux'
import { compose, withState, withHandlers } from 'recompose'
import { Signin } from '../actions'
const noRegistor = 'Not regist already?Please Signup'
const wrongPassword = 'We cannot found your email or password'
//() => { props.navigation.navigate('App') 
const SignUpScreen = ({ onChange, token, navigation, onSubmitHandler, isHasToken }, ...props) => {
    if (token !== noRegistor && token !== wrongPassword && token) {
        navigation.navigate('App')
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../Component/Image/logo.png')}></Image>
                <Text style={styles.title}>Application for cats</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.subformcontainer}>
                    <StatusBar
                        barStyle="light-content"
                    />
                    <TextInput
                        placeholder="username or email"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType="email-address"
                        onChangeText={(text) => onChange(text, 'email')}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="password"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        returnKeyType="go"
                        secureTextEntry
                        style={styles.input}
                        onChangeText={(text) => onChange(text, 'password')}
                    />
                    {
                        (token === noRegistor || token === wrongPassword) && <Text style={styles.error}>{token}</Text>
                    }
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text onPress={onSubmitHandler} style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                    <View style={styles.signupTextCont}>
                        <Text style={styles.signupText}>Don't have an account yet?</Text>
                        <Text title="Sign up" onPress={() => { navigation.navigate('SignUp') }} style={styles.signupbutton}>Sign up</Text>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}
const mapStateToprops = ({ auth }) => {
    return {
        token: auth.token
    }
}
const mapDispatchToProps = dispatch => ({
    onSubmit: data => dispatch(Signin(data))
})
export default compose(
    connect(mapStateToprops, mapDispatchToProps),
    withState('state', 'setState', { email: '', password: '' }),
    withHandlers({
        onChange: ({ setState, state }) => (text, name) => {
            setState({ ...state, [name]: text }),
                console.log('email', state)
        },
        onSubmitHandler: ({ state, onSubmit }) => () => {
            onSubmit(state)
        },
        isHasToken: ({ token }) => () => {
            if (token !== noRegistor && token !== wrongPassword && token) {
                return false
            }
            console.log('token', token)
        }
    })
)(SignUpScreen)

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