import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmail';
import FIELDS from './fields'

class SurveyForm extends Component {

  renderFields() {
    return FIELDS.map( ({label, name}) => 
      <Field label={label}
        key={name}
        type="text"
        name={name}
        component={SurveyField}  /> 
    )
  }

  render() {
    return (
      <div className="container">
      <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
        {this.renderFields()}
        <Link to="/surveys" className="red  btn-flat left white-text">
          Cancel <i className=" material-icons right"> close </i>
        </Link>
        <button type="submit" className="teal btn-flat white-text right">
          Next <i className=" material-icons right">navigate_next </i>
        </button>
        </form>
      </div>
    )
  }
}

// create input validation for form 
const validate = (values) => {
  const errors = {}
  errors.recipients = validateEmails(values.recipients || '')

  FIELDS.forEach( ({ name, errorMsg }) => {
    if (!values[name]) { errors[name]  = errorMsg }
  })

  return errors
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false //Tells redux form to keep the content of the form
})(SurveyForm)