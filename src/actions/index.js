
import axios from 'axios'
import * as R from 'ramda'
import { AsyncStorage } from 'react-native';
import moment from 'moment'
export const AUTHENTICATION_SIGNUP = 'AUTHENTICATION_SIGNUP'
export const AUTHENTICATION_SIGNIN = 'AUTHENTICATION_SIGNIP'
export const UPDATE_FIND_CAT = 'UPDATE_FIND_CAT'
export const SET_UPLOAD_CAT = 'SET_UPLOAD_CAT'
export const SET_NEWS = 'SET_NEWS'
export const SET_APPOINTMENT = 'SET_APPOINTMENT'
export const HOST = process.env.NODE_ENV === 'production' ? 'http://167.99.65.71:3000' : 'http://localhost:3000'

export const fetchToken = () => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('token', token);
      if (token !== null) {
        const payload = {
          message: 'success',
          token: token
        }
        dispatch({
          type: AUTHENTICATION_SIGNUP,
          payload: {
            token: payload
          }
        })
      }
    } catch (e) {

    }
  }
}
export const fetchAppointment = () => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`${HOST}/get/appointment`, {
        headers: {
          authorization: token
        }
      })
      await AsyncStorage.setItem('appointment', JSON.stringify(res.data));
      dispatch({
        type: SET_APPOINTMENT,
        payload: res.data,
      })
    } catch (e) {
      console.log(e)
    }
  }
}
export const addNewAppointment = (data) => {
  return async dispatch => {
    try {
      const { dateValue, hospital, detail } = data
      const payload = {
        dateValue,
        hospital,
        detail,
      }
      const token = await AsyncStorage.getItem('token');
      const res = await axios.post(`${HOST}/add/appointment`, payload, {
        headers: {
          authorization: token
        }
      })
      const appointmentList = await AsyncStorage.getItem('appointment');
      if (appointmentList !== null) {
        if (appointmentList !== res.data) {
          await AsyncStorage.setItem('appointment', JSON.stringify(res.data));
          dispatch({
            type: SET_APPOINTMENT,
            payload: res.data,
          })
        }
      }
    } catch (e) {

    }
  }
}
export const Signup = (data) => {
  return async dispatch => {
    const { name, surname, email, password } = data
    const form = {
      firstname: name,
      lastname: surname,
      email,
      password
    }
    const res = await axios.post(`${HOST}/authentication/signup`, form)
    dispatch({
      type: AUTHENTICATION_SIGNUP,
      payload: {
        token: res.data
      }
    })
  }
}
export const Signin = (data) => {
  return async dispatch => {
    const res = await axios.post(`${HOST}/authentication/signin`, data)
    const { token } = res.data
    try {
      await AsyncStorage.setItem('token', token);
    } catch (e) {
      console.log(e)
    }
    dispatch({
      type: AUTHENTICATION_SIGNIN,
      payload: {
        token: res.data
      }
    })
  }
}

export const fetchCatList = () => {
  return async dispatch => {
    const res = await axios.get(`${HOST}/catlist`)
    dispatch({
      type: UPDATE_FIND_CAT,
      payload: res.data
    })
  }
}

export const fetchNews = () => {
  return async dispatch => {
    const res = await axios.get(`${HOST}/news`)
    dispatch({
      type: SET_NEWS,
      payload: res.data
    })
  }
}

export const uploadFindCat = (payload) => {
  var data = new FormData();
  const file = R.pathOr('', ['pictureState'], payload)
  const latitude = R.pathOr('', ['location', 'latitude'], payload)
  const longitude = R.pathOr('', ['location', 'longitude'], payload)
  const address = R.pathOr('', ['payload', 'address'], payload)
  const contact = R.pathOr('', ['payload', 'contact'], payload)
  const message = R.pathOr('', ['payload', 'message'], payload)


  data.append('photo', {
    name: file.fileName,
    type: file.type,
    uri: file.uri,
  });

  data.append('address', address)
  data.append('contact', contact)
  data.append('message', message)
  data.append('latitude', latitude)
  data.append('longitude', longitude)
  return async dispatch => {
    const res = await axios.post(`${HOST}/cat`, data, { headers: { 'Accept': 'application/json', 'Content-Type': 'multipart/form-data' } })
    dispatch({
      type: UPDATE_FIND_CAT,
      payload: res.data
    })
  }
}