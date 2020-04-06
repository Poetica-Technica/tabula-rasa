const { Router } = require('express');const ensureAuth = require('../middleware/ensure-auth');
const User = require('../models/User');
// eslint-disable-next-line new-cap
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router() 
  .post('/signup', (req, res, next) => {
    User
      .create(req.body) 
      .then(user => {
        const token = user.authToken();
        res.cookie('session', token, {
          maxAge: ONE_DAY_IN_MS,
          httpOnly: true
        });
        res.send(user);
      })
      .catch(next);
  });

