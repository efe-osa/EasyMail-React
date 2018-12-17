import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSurveys } from '../../actions'

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys()
  }
  renderSurveys() {
    return this.props.surveys.reverse().map(({_id, title, body, dateSent, yes, no}) => {
      return (
      <div key={_id} className="card">
        <div className="card-content">
          <span className="card-title"> {title} </span>
          <p>{body}</p>
          <p className="right"> Sent On: {new Date(dateSent).toLocaleDateString()}  </p>
        </div>
        <div className="card-action">
          <a>Yes: {yes}</a>
          <a>No: {no}</a>
        </div>
      </div>
      )
    })
  }

  render() {
    return (
      <div className="container">
        {this.props.surveys.length === 0 ? 
          <div>
          <h4> No Survey has been created.</h4> <i className="material-icons" style={{fontSize: '6rem'}}>error</i>
          </div>
          : <div> 
          <h4> Survey Lists </h4>
          {this.renderSurveys()}
          </div>}
      </div>
    )
  }
}

const mapStateToProps = ({surveys}) => ({ surveys })
export default connect(mapStateToProps, {fetchSurveys})(SurveyList)