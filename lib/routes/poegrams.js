const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Poegram = require('../models/Poegram');
const request = require('superagent');
const chance = require('chance').Chance();

const getAllPoemsByAuthor = async(myAuthor) => {
  const URL = `http://poetrydb.org/author/${myAuthor}`;
  const poemsData = await request.get(URL);
  const poemArray = JSON.parse(poemsData.text);
  const poemObject = poemArray[Math.floor(Math.random() * poemArray.length)];
  return poemObject;
};
// eslint-disable-next-line new-cap
module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];
    getAllPoemsByAuthor(req.query.author)
    // we don't just need lines we need a random author to pass to get all poems by author
    // how would we generate a list to pick one from randomly
      .then(poemObject => 
        Poegram
          .create({ 
            usedId: req.user._id,
            lines: randomItem(poemObject.lines),
            colors: chance.color()
          })
          .then(poegram => res.send(poegram))
          .catch(next));
  })

// can write a test for the new route to test

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
