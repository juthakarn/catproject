import { combineReducers } from 'redux'
import auth from './authentication'
import findingcat from './findingcat'
import news from './news'
import appointment from './appointment'

const rootReducers = combineReducers({
  auth,
  findingcat,
  news,
  appointment
})
export default rootReducers