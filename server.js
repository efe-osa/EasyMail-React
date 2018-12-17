// order of require statements matter
require('./models/User')
require('./models/Survey')
require('./services/passport')
const port = process.env.PORT || 5000
const keys = require('./config/keys')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const path = require('path')
const express = require('express')
const app = express()

//Connection setup to the monogoDb
mongoose.connect(keys.mongoURI, { useNewUrlParser: true }) 

app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session() )
require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)
require('./routes/surveyRoutes')(app)

if (process.env.NODE_ENV === 'production') {
  //express will serve up prodction assets like our main.js file e.t.c
  app.use(express.static('client/build'))
  //index.html would be served when route not found
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})