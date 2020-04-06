const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Poegram = require('../models/Poegram');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Poegram
      .create(req.body)
      .then(post => res.send(post))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Poegram
      .find({})
      .populate('userId')
      .populate('poemId')
      .then(post => res.send(post))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Poegram
      .findById(req.params.id)
      .populate('userId')
      .populate('poemId')
      .then(post => res.send(post))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Poegram
      .findOneAndDelete({ _id: req.params.id, userId: req.user._id })
      .then(post => res.send(post))
      .catch(next);
  });
