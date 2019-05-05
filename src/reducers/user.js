import { SET_USER,LOG_OUT } from "../actions";


export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER: //{message:'success',user:{}}
      state = action.payload.user
      return state
    case LOG_OUT:
      state = {}
      return state
    default:
      return state
  }
}