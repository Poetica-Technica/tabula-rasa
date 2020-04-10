
const { Router } = require('express');
const request = require('superagent');
const Poegram = require('../models/Poegram');
const Poem = require('../models/Poem');
const chance = require('chance').Chance();
const ensureAuth = require('../middleware/ensure-auth');
const { randomAuthor, randomItem, getRandomPoemByAuthor, formattedResponse } = require('./route-functions.js');


module.exports = Router()

  .get ('/', (req, res, next) => {
    try {
      const URL = 'http://poetrydb.org/author';
      request.get(URL)
        .then(authors => { res.send(JSON.parse(authors.text)); })
        .catch(next);
    }
    catch(error) {
      next(error);
    }
  })

  .get ('/random', (req, res, next) => {
    try {
      const URL = 'http://poetrydb.org/author';
      request.get(URL)
        .then(authors => {
          res.send(randomItem(authors.body.authors));
        });
    }
    catch(error){
      next(error);
    }  
  })

  .get('/fullyRandom/', ensureAuth, (req, res, next) => {
    getRandomPoemByAuthor(randomAuthor())
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
  
