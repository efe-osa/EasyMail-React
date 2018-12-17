const mongoose= require('mongoose')
const _ = require('lodash')
const Path = require('path-parser').default
const { URL } = require('url')

const requireLogin = require('../middlewares/requireLogin')
const requireCredit = require('../middlewares/requireCredit')
const Mailer = require('../services/Mailer')
const surveyTemplates = require('../services/emaiTemplates/surveyTemplates')
const Survey = mongoose.model('surveys')

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredit, async (req, res) => {
    const { title, subject, body, recipients } = req.body
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    })

    // create new instance of the Mailer class(used to create config for the surveys)
    const mailer = new Mailer( survey, surveyTemplates(survey) )
    
    try {
      await mailer.send()
      await survey.save()
      req.user.credits -= 5
      const user = await req.user.save()
      res.send(user)
    } 
    catch (err) {
      res.status(422).send(`Unprocessable entity - ${err}`)
    }

  })

  app.post('/api/surveys/webhooks', (req, res) => {
    const path = new Path('/api/surveys/:surveyId/:choice')

    _.chain(req.body)
      .map(({ url, email }) => { 
        const match = path.test(new URL(url).pathname)
        if (match === null ) { return }
        const { surveyId, choice } = match
        return {email, surveyId, choice}
      }).compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false}
            }
          }, {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date(),
          }
        ).exec()
      })
      .value()
    res.send({})
  })

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for your feedback')
  })

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id}).select('-recipients')
    res.send(surveys)
  })
} 