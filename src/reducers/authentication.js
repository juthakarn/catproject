let initailState = {
  name: 'kittinut',
  surname: 'pramhan',
  //token:'dsadasd'
}
import { AUTHENTICATION_SIGNUP, AUTHENTICATION_SIGNIN } from '../actions'

export default (state, action) => {
  switch (action.type) {
    case AUTHENTICATION_SIGNUP:
      return { state, ...action.payload }
    case AUTHENTICATION_SIGNIN:
      return { state, ...action.payload }
    default:
      return state = initailState
  }
}