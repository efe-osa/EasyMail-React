// order of require statements matt er
const app = require('express')()
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
require('./models/User')
require('./services/passport')

//Connection setup to the monogoDb
mongoose.connect(keys.mongoURI, { useNewUrlParser: true } ) 

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session() )
require('./routes/authRoutes')(app)

app.listen(5000)