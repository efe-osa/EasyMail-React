import axios from 'axios'
import { FETCH_USER, FETCH_SURVEYS } from './constants'

export const fetchUser = () => async dispatch => { 
    const res = await axios.get('/api/current_user')
    dispatch({
      type: FETCH_USER,
      payload:res.data
    })
}

export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token)  
  dispatch({
    type: FETCH_USER,
    payload: res.data
  })
}

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values)
  // receives the history prop passed down by withRouter. 
  // uses the history(all routes) prop to redirect to ' /surveys'
  history.push('/surveys')
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys')
  dispatch({
    type: FETCH_SURVEYS,
    payload:res.data
  })
}