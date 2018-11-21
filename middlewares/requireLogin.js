module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({error:'You must log in to access this page.'})
  } 
  next()
}