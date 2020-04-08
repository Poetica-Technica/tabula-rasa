const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const User = require('../models/User');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

const handleAuthorization = (res, user) => {
  console.log('COOKIE:', res.cookie);
  res.cookie('session', user.authToken(), {
    maxAge: ONE_DAY_IN_MS,
    httpOnly: true
  });
  res.send(user);
};
// eslint-disable-next-line new-cap
module.exports = Router()
  .post('/signup', (req, res, next) => {
    User
      .create(req.body)
      .then(user => handleAuthorization(res, user))
      .catch(next);
  })
  .post('/login', (req, res, next) => {
    User
      .authorize(req.body)
      .then(user => handleAuthorization(res, user))
      .catch(next);
  })
  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });
