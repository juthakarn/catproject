let initailState = {
  name: 'kittinut',
  surname: 'pramhan',
  //token:'dsadasd'
}
import { AUTHENTICATION_SIGNUP, AUTHENTICATION_SIGNIN,LOG_OUT } from '../actions'

export default (state, action) => {
  switch (action.type) {
    case AUTHENTICATION_SIGNUP:
      return { state, ...action.payload }
    case AUTHENTICATION_SIGNIN:
      return { state, ...action.payload }
    case LOG_OUT:
      state ={}
      return state 
    default:
      return state = initailState
  }
}