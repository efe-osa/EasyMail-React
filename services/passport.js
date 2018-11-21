const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

// mongoose => one argument means you are trying pull data
//          => two argument means you are trying send data
const User = mongoose.model('users')

//this creates cookie-session
passport.serializeUser((user, done) => {
  done(null, user.id)
})

//Verifies user by decoding the cookiesession to retrieve user's info when app is revisited 
passport.deserializeUser((id, done) => { 
  User.findById(id).then(user =>{
    done(null, user) 
  })
})

// google strategy for google+ api(oauth20)
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL : '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      
      //checks if user exists
      const existingUser = await User.findOne({googleId:profile.id})
      if (existingUser) {        
        return done(null, existingUser)
      }

      // creates new instance of User if no user exists
      const user = await new User ({googleId: profile.id}).save()
      done(null, user)
    }     
  )
)