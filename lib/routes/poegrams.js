const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Poegram = require('../models/Poegram');
const chance = require('chance').Chance();
const { getRandomPoemByAuthor } = require('./route-functions.js');


module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    getRandomPoemByAuthor(req.query.author)
    // we don't just need lines we need a random author to pass to get all poems by author
    // how would we generate a list to pick one from randomly
      .then(poemObject => 
        Poegram
          .create({ 
            usedId: req.user._id,
            lines: chance.pickone(poemObject.lines),
            colors: chance.color({ format: 'hex' })
          }))
      .then(poegram => res.send(poegram))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Poegram
      .find()
      .populate('userId')
      .populate('poemId')
      .then(poegrams => res.send(poegrams))
      .catch(next);
  })

  .get('/mine', ensureAuth, (req, res, next) => {
    Poegram
      .find({ userId : req.user._id })
      .populate('userId')
      .populate('poemId')
      .then(poegrams => res.send(poegrams))
      .catch(next);
  })

  .get('/random', (req, res, next) => {
    Poegram
      .count()
      .exec(function(err, count) {
      // Get a random entry
        const random = Math.floor(Math.random() * count);
        // Query all users but only fetch one offset by our random #
        Poegram
          .findOne()
          .skip(random)
          .populate('userId')
          .populate('poemId')
          .then(poegram => poegram.formattedRes(req.query.format, req, res))
          .catch(next);
      });
  })

  .get('/:id', (req, res, next) => {
    Poegram
      .findById(req.params.id)
      .populate('userId')
      .populate('poemId')
      .then(poegram => poegram.formattedRes(req.query.format, req, res))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Poegram
      .findOneAndDelete({ _id: req.params.id, userId: req.user._id })
      .then(post => res.send(post))
      .catch(next);
  });
