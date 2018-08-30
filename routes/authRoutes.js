const passport = require('passport')

//handles sign in with google  
module.exports = (app) => {
  app.get(
    '/auth/google', 
    passport.authenticate(
      'google',
      {
        scope: ['profile', 'email']
      }
    )
  )
  //  the callback url for /auth/google
  app.get(
    '/auth/google/callback',
    passport.authenticate(
      'google'
    ) 
  )
  // logging out
  app.get(
    '/api/logout',
     (req, res) => {
    // .logout() is a function of passport
      req.logout()
      res.send('You have successfully logged out!')
  })
  // Finish line: User gets logged in and retrieve user's info when app is reloaded using .deserializeUser()
  app.get(
    '/api/current_user', 
    (req, res) => {
      res.send(req.user)
  })
}