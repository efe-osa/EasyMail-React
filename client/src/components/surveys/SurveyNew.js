import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import SurveyForm from './SurveyForm'
import FormReview from './FormReview'

class SurveyNew extends Component {
 state = { showReview: false }

 renderContent () {
   if (this.state.showReview) { return <FormReview onCancel={() => this.setState({ showReview: false})}  />}
   
   return <SurveyForm 
   onSurveySubmit={ () => this.setState({ showReview: true}) }   />
 }
 
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

export default reduxForm({form: 'surveyForm'})(SurveyNew) 
