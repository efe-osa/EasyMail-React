import React from 'react'
import { Link } from 'react-router-dom'
import SurveyList from './surveys/surveyList'
  

const Dashboard = () => {
  return (
    <div style={{textAlign: 'center'}}>
      <SurveyList />
      <div className="fixed-action-btn">
      {/* use Link tags when referring a user within the app */}
        <Link to="/survey/new" className="btn-floating btn-large pulse">
        <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard