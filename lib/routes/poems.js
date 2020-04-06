// Poem - /api/v1/poems

// [POST - (auth) Stretch - create a poem]
// GET - get all poems
// GET/:id - get to get poem by id
// DELETE - (auth) delete a poem

const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Poem = require('../models/Poem');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Poem
      .create(req.body)
      .then(poem => res.send(poem))
      .catch(next);
  })

  .get('/:id', ensureAuth, (req, res, next) => {
    Poem
      .findById(req.params.id)
      .then(poem => res.send(poem))
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    Poem
      .find()
      .then(poem => res.send(poem))
      .catch(next);
  })
  
  .delete('/:id', ensureAuth, (req, res, next) => {
    Poem
      .findByIdAndDelete(req.params.id)
      .then(post => res.send(post))
      .catch(next);
  });
