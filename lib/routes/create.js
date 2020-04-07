const Poem = require('../models/Poem');
const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const request = require('superagent');

// const lines = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getAllPoemsByAuthor = async(myAuthor) => {
  const URL = `http://poetrydb.org/author/${myAuthor}`;
  const poemsData = await request.get(URL);
  const poemArray = JSON.parse(poemsData.text);
  const poemObject = poemArray[Math.floor(Math.random() * poemArray.length)];

  return poemObject;
};
// eslint-disable-next-line new-cap
module.exports = Router()
//api/v1/create/?author=Shakespeare

  .get('/', (req, res, next) => {
    const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];
    getAllPoemsByAuthor(req.query.author)
      .then(poemObject => 
        Poem
          .create({ 
            author: poemObject.author, 
            title: poemObject.title[0],
            lines: randomItem(poemObject.lines),
            category: 'Romantic'
          })
          .then(poem => res.send(poem))
          .catch(next));
  });
// .post('/', ensureAuth, (req, res, next) => 
//   Poem
//     .create(req.body)
//     .then(poem => res.send(poem))
//     .catch(next);
// })


