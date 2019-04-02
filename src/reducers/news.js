import { SET_NEWS } from '../actions'

const initialState = {
  list:[]
}
export default (state=initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return { state,list:action.payload.newsList }
    default:
      return state
  }
}