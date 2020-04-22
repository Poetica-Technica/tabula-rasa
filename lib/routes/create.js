const Poem = require('../models/Poem');
const Poegram = require('../models/Poegram');
const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const chance = require('chance').Chance();
const { randomItem, getRandomPoemByAuthor, formattedResponse } = require('./route-functions.js');

module.exports = Router()

  // i.e. /api/v1/create/?author=Shakespeare
  .get('/', ensureAuth, (req, res, next) => {
    // Check for 'random' request and redirect to other route, preserving format query param
    // Return the redirect to prevent subsequent function from running
    if(req.query.author === 'random') {
      const url = require('url');
      if(req.query.format) {
        return res.redirect(url.format({ 
          pathname: '/api/v1/authors/fullyRandom', 
          query: { 'format': req.query.format } 
        }));
      } else return res.redirect('/api/v1/authors/fullyRandom');
    }
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
      .then(poegram => poegram.formattedRes(req.query.format, res))
      .catch(next);
  });


