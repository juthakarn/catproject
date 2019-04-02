
import axios from 'axios'
import * as R from 'ramda'
import moment from 'moment'
export const AUTHENTICATION_SIGNUP = 'AUTHENTICATION_SIGNUP'
export const AUTHENTICATION_SIGNIN = 'AUTHENTICATION_SIGNIP'
export const UPDATE_FIND_CAT = 'UPDATE_FIND_CAT'
export const SET_UPLOAD_CAT = 'SET_UPLOAD_CAT'
export const SET_NEWS = 'SET_NEWS'
export const HOST = process.env.NODE_ENV === 'production' ? 'http://167.99.65.71:3000' : 'http://localhost:3000'

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
    console.log(res.data)
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

export const  fetchNews =()=>{
  return async dispatch =>{
    const res = await  axios.get(`${HOST}/news`)
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
  console.log(data)
  return async dispatch => {
    const res = await axios.post(`${HOST}/cat`, data, { headers: { 'Accept': 'application/json', 'Content-Type': 'multipart/form-data' } })
    console.log(res)
    dispatch({
      type: UPDATE_FIND_CAT,
      payload: res.data
    })
  }
}