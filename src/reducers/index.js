import { combineReducers } from 'redux'
import auth from './authentication'
import findingcat from './findingcat'
import news from './news'
const rootReducers = combineReducers({
  auth,
  findingcat,
  news
})
export default rootReducers