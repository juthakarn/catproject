import { combineReducers } from 'redux'
import auth from './authentication'
import findingcat from './findingcat'
import news from './news'
import appointment from './appointment'
import user from './user'

const rootReducers = combineReducers({
  auth,
  findingcat,
  news,
  appointment,
  user
})
export default rootReducers