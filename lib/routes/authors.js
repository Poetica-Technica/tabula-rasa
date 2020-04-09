
const { Router } = require('express');
const request = require('superagent');
const Poegram = require('../models/Poegram');
const Poem = require('../models/Poem');
const chance = require('chance').Chance();

const path = require('path');
const drawBackground = require('../utils/drawBackground');
const ensureAuth = require('../middleware/ensure-auth');


const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];
const randomAuthor = async() => { 
  const result = await request.get('http://localhost:7890/api/v1/authors/random');
  return result;
};

const getRandomPoemByAuthor = async(myAuthor) => {
  const URL = `http://poetrydb.org/author/${myAuthor}`;
  const poemsData = await request.get(URL);
  const poemArray = JSON.parse(poemsData.text);
  const poemObject = poemArray[Math.floor(Math.random() * poemArray.length)];
  return poemObject;
};

const randomAuthor = async() => { 
  const result = await request.get('http://localhost:7890/api/v1/authors/random');
  return result;
};

const formattedResponse = async(poegram, format, res) => {
  // Return JSON data if no format is specified
  if(!format) {
    res.send(poegram);
  }
  if(format === 'hello') {
    res.send('Why, hello there!');
  }
  if(format === 'image') {
    const generatedImage = await drawBackground(poegram);
    res.sendFile(path.resolve(__dirname, `../../public/${poegram._id}.png`));
    console.log('displaying generated image');
  }
  if(format === 'imagepath') {
    // console.log(drawBackground(poegram));
    res.send(path.resolve(__dirname, `../../public/${poegram._id}.png`));
  }
  if(format === 'imagetest') {
    res.sendFile(path.resolve(__dirname, '../../public/image.png'));
  }
};

const getRandomPoemByAuthor = async(myAuthor) => {
  const URL = `http://poetrydb.org/author/${myAuthor}`;
  const poemsData = await request.get(URL);
  const poemArray = JSON.parse(poemsData.text);
  const poemObject = poemArray[Math.floor(Math.random() * poemArray.length)];
  return poemObject;
};

module.exports = Router()

  .get ('/', (req, res, next) => {

    try {
      const URL = 'http://poetrydb.org/author';
      request.get(URL)
        .then(authors => {
          res.send(authors); 
        })
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
  
