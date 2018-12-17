import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'


class Nav extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return
      case false: 
        return <li><a href="/auth/google">Sign in with Google</a></li>
      default:
        return   [
            <li key='1' style={{marginRight: '5px'}}><Payments /></li>,
            <li key='2'>Credits: {this.props.auth.credits}</li>,
            <li key='3'>
              <Link to={'/surveys'} >
                Surveys
              </Link>
            </li>,
            <li key='4'><a href="/api/logout">Logout</a></li>
        ]    
    }
  }

  render () {
    return (
    <nav className="transparent row">
      <div className="nav-wrapper">
        <Link 
        to={'/'} 
        className="black-text">
          Easy-Mail
        </Link>
        <ul className="right">
        { this.renderContent() }
        </ul>
      </div>
     
    </nav>
    )
  }
}

//reducers holds the state and passes it to this component as props using mapStateToProps
function mapStateToProps({ auth }) {
  return { auth }
}
export default connect(mapStateToProps)(Nav)