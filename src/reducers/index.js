import { combineReducers } from 'redux'
import auth from './authentication'
import findingcat from './findingcat'
const rootReducers = combineReducers({
  auth,
  findingcat,
})
export default rootReducers