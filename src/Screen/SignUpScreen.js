import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar, KeyboardAvoidingView, Image, Button } from 'react-native';
import { Signup } from '../actions/index'
class SignUpComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: '',
            passwordMatch: true
        };
    }

    render() {
        const { token, onSignup, navigation } = this.props
        if (token) {
            console.log('noundified')
            navigation.navigate('App')
        }
        const onChange = (text, name) => {
            this.setState({ [name]: text })
        }
        const onSumit = () => {
            const { password, confirmPassword } = this.state
            if (password !== confirmPassword) {
                this.setState({ passwordMatch: false })
            } else {
                this.setState({ passwordMatch: true })
                onSignup(this.state)
            }
        }
        const { passwordMatch } = this.state
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View behavior="padding" style={styles.container}>
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
                                textContentType="text"
                                name={'name'}
                                placeholder="Name"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                returnKeyType="next"
                                onChangeText={(text) => onChange(text, 'name')}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                                onSubmitEditing={() => { this.surname.focus(); }}
                            />
                            <TextInput
                                textContentType="text"
                                name={'surname'}
                                placeholder="Surname"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                returnKeyType="next"
                                onChangeText={(text) => onChange(text, 'surname')}
                                onSubmitEditing={(e) => this.email.focus()}
                                keyboardType="email-address"
                                ref={(input) => { this.surname = input; }}
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                            />
                            <TextInput
                                type="email"
                                name="email"
                                placeholder="Email"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                returnKeyType="next"
                                onChangeText={(text) => onChange(text, 'email')}
                                onSubmitEditing={() => this.password.focus()}
                                ref={(input) => { this.email = input; }}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                            />
                            <TextInput
                                type="password"
                                name="password"
                                placeholder="Password"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                returnKeyType="go"
                                secureTextEntry
                                onChangeText={(text) => onChange(text, 'password')}
                                style={styles.input}
                                onSubmitEditing={() => this.confirmPassword.focus()}
                                ref={(input) => { this.password = input; }}

                            />
                            <TextInput
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                returnKeyType="go"
                                secureTextEntry
                                onChangeText={(text) => onChange(text, 'confirmPassword')}
                                style={styles.input}
                                ref={(input) => { this.confirmPassword = input; }}

                            />
                            {
                                passwordMatch ? null : <Text style={styles.error}>**Password is wrong</Text>
                            }
                            <TouchableOpacity style={styles.buttonContainer}>
                                <Text onPress={onSumit} style={styles.buttonText}>LOGIN</Text>
                            </TouchableOpacity>
                            <View style={styles.signupTextCont}>
                                <Text style={styles.signupText}>Already Account yet?</Text>Text>
                        <Text onPress={() => { this.props.navigation.navigate('SignIn') }} style={styles.signupbutton}>Sign In</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
const mapStateToProps = ({ auth }) => {
    const { token } = auth
    return {
        token: token
    }
}
const mapDispatchToProp = dispatch => {
    return {
        onSignup: data => dispatch(Signup(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProp
)(SignUpComponent)

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

