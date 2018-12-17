import React from 'react'
import { connect } from 'react-redux';
import { withRouter  } from 'react-router' 
import * as actions from '../../actions'
import FIELDS from './fields'

const FormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = () => FIELDS.map(({label, name}) => {
        return (
        <div key={name} style={{marginBottom: '20px'}}>
          <h5 className="black-text">{label}</h5>
          <p className="white-text">{formValues[name]}</p>
        </div> )
  })
  return (
    <div className="container">
      <h3><em>Verify your entries</em></h3>
      { reviewFields() }
      <button 
        className="grey btn-flat left white-text" onClick={onCancel}>
          Back 
          <i className=" material-icons right">navigate_before</i>
      </button>
      <button 
      type="submit" className="teal btn-flat white-text right"
      onClick={() => submitSurvey(formValues, history)}>
          Submit 
          <i className=" material-icons right">email</i>
          <i className=" material-icons right">done</i>
        </button>
    </div>
  )
}

const mapStatetoProps = (state) => {
  return {formValues: state.form.surveyForm.values}
}

export default withRouter(connect(mapStatetoProps, actions)(FormReview))
// export default connect(mapStatetoProps, actions)(withRouter(FormReview))