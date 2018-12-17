const { redirectDomain } = require('../../config/keys')

module.exports = ({id,body}) => {
  return `
  <html> 
    <body>
      <div style="text-align:center">
        <h3>I'd like your input</h3>
        <p>Please answer the following question:</p>
        <p>${body}</p> 
        <div><a href="${redirectDomain}/api/surveys/${id}/yes"> Yes </> 
        <div><a href="${redirectDomain}/api/surveys/${id}/no"> No </> 
      </div> 
    </body>
  </html>`
} 