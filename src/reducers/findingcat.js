import { UPDATE_FIND_CAT,SET_UPLOAD_CAT } from '../actions'

export default (state={}, action) => {
  switch (action.type) {
    case UPDATE_FIND_CAT:
      return { ...state, isUploadcat:false,list:action.payload.allFindCats }
    case SET_UPLOAD_CAT:
      return { ...state, isUploadcat: true }
    default:
      return state
  }
}