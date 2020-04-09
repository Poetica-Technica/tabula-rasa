const Poem = require('../models/Poem');
const Poegram = require('../models/Poegram');
const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const chance = require('chance').Chance();
const { randomItem, getRandomPoemByAuthor, formattedResponse } = require('./route-functions.js');

module.exports = Router()

  // i.e. /api/v1/create/?author=Shakespeare
  .get('/', ensureAuth, (req, res, next) => {
    getRandomPoemByAuthor(req.query.author)
      .then(poemObject => 
        Poem
          .create({ 
            author: poemObject.author, 
            title: poemObject.title,
            lines: randomItem(poemObject.lines),
            category: 'Romantic'
          }))
      .then(poem =>
        Poegram
          .create({ 
            userId: req.user._id, 
            poemId: poem._id,
            colors: [chance.color({ format: 'hex' }), chance.color({ format: 'hex' })]
          }))
      .then(poegram =>
        Poegram
          .findById(poegram._id)
          .populate('userId')
          .populate('poemId'))
      .then(poegram => formattedResponse(poegram, req.query.format, res))
      .catch(next);
  });


