import { FETCH_SURVEYS } from '../actions/constants'

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
    return action.payload || false
    
    default:
    return state 
  }
} 