const { Router } = require('express');
const Poegram = require('../models/Poegram');
const Poem = require('../models/Poem');
const chance = require('chance').Chance();
const ensureAuth = require('../middleware/ensure-auth');
const { randomItem, getAuthors, getRandomAuthor, getRandomPoemByAuthor } = require('./route-functions.js');


module.exports = Router()

  .get ('/', (req, res, next) => {
    // no need for try catch when you are promise chaining
    getAuthors()
      .then(authors => res.send(authors))
      .catch(next);
  })

  .get ('/random', (req, res, next) => {
    getRandomAuthor()
      .then(author => res.send(author))
      .catch(next);
  })

  .get('/fullyRandom/', ensureAuth, (req, res, next) => {
    getRandomAuthor()
      .then(getRandomPoemByAuthor)
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
  
