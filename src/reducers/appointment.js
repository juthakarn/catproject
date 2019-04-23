import { SET_APPOINTMENT } from "../actions";

let initailState = []

export default (state = [], action) => {
  switch (action.type) {
    case SET_APPOINTMENT:
      return state, action.payload
    default:
      return state
  }
}