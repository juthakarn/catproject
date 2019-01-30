
import axios from 'axios'
export const AUTHENTICATION_SIGNUP = 'AUTHENTICATION_SIGNUP'
export const AUTHENTICATION_SIGNIN = 'AUTHENTICATION_SIGNIP'
const HOST = 'http://localhost:3000'

export const Signup =  (data) =>{
  return async dispatch =>{
    const res = await axios.post(`${HOST}/authentication/signup`,data)
    console.log(res.data)
     dispatch({
      type:AUTHENTICATION_SIGNUP,
      payload:{
        token:res.data
      }
    })
  }
}
export const Signin =  (data) =>{
  return async dispatch =>{
    const res = await axios.post(`${HOST}/authentication/signin`,data)
    console.log(res.data)
     dispatch({
      type:AUTHENTICATION_SIGNIN,
      payload:{
        token:res.data
      }
    })
  }
 
}