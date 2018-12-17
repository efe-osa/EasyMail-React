module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    res.sendStatus(403).send({ error: 'Oops! Not enough credit. Update your wallet and try again'})
  }
  next()
}