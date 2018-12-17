import React from 'react'

export default ({input, label, meta: {error, touched}}) => {
  return (
    <div>
      <label htmlFor="{this.props.label}" className="white-text">
        <h6>{label}</h6>
      </label>
      <input {...input} />
      <div className="red-text" style={{marginBottom: '20px'}}>
      {touched && error}</div>
      
    </div>
  )
}