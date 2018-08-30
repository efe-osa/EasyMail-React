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
      callbackURL : '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({googleId:profile.id})
      .then((existingUser => {
        if (existingUser) {
          //means user exists
          done(null, existingUser)
        } else {
          // creates new instance of User
           new User ({googleId: profile.id})
           .save()
           .then(user => done(null, user))
        }
      }))
     
    }
  )
)