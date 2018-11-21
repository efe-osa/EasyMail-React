import React, { Component } from 'react'
import {  BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

import Nav from './Nav'
import Landing from './Landing'
import Surveys from './Surveys'
import SurveyNew from './SurveyNew'

class App extends Component {

  componentDidMount() {
    this.props.fetchUser()
  }
  render() {
    return (
      <div className="container">    
        <BrowserRouter>
          <div>
            <Nav />
            <Route exact path='/' component={Landing} />
            <Route exact path='/surveys' component={Surveys} />
            <Route exact path='/survey/new' component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions)(App);
