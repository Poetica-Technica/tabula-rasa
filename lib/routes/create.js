const Poem = require('../models/Poem');
const Poegram = require('../models/Poegram');
const User = require('../models/User');
const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const request = require('superagent');
const path = require('path');
const drawBackground = require('../utils/drawBackground');

const formattedResponse = (poegram, format, res) => {
  // Return JSON data if no format is specified
  if(!format) {
    res.send(poegram);
  }
  if(format === 'hello') {
    res.send('Why, hello there!');
  }
  if(format === 'image') {
    drawBackground(poegram);
    res.sendFile(path.resolve(__dirname, '../../public/test.png'));
  }
  if(format === 'imagepath') {
    // console.log(drawBackground(poegram));
    res.send(path.resolve(__dirname, '../../public/image.png'));
  }
  if(format === 'imagetest') {
    res.sendFile(path.resolve(__dirname, '../../public/image.png'));
  }
};

const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

const getRandomPoemByAuthor = async(myAuthor) => {
  const URL = `http://poetrydb.org/author/${myAuthor}`;
  const poemsData = await request.get(URL);
  const poemArray = JSON.parse(poemsData.text);
  const poemObject = poemArray[Math.floor(Math.random() * poemArray.length)];
  return poemObject;
};

<<<<<<< HEAD
module.exports = Router()

  // i.e. /api/v1/create/?author=Shakespeare
  .get('/', ensureAuth, (req, res, next) => {
    getRandomPoemByAuthor(req.query.author)
=======
const formattedResponse = (poegram, format, res) => {
  // Return JSON data if no format is specified
  if(!format) {
    res.send(poegram);
  }
  if(format === 'hello') {
    res.send('Why, hello there!');
  }
  if(format === 'image') {
    drawBackground(poegram);
    res.sendFile(path.resolve(__dirname, '../../public/test.png'));
  }
  if(format === 'imagepath') {
    // console.log(drawBackground(poegram));
    res.send(path.resolve(__dirname, '../../public/image.png'));
  }
  if(format === 'imagetest') {
    res.sendFile(path.resolve(__dirname, '../../public/image.png'));
  }
};



module.exports = Router()

// i.e. /api/v1/create/?author=Shakespeare

  .get('/', (req, res, next) => {
    // console.log('** req is ', req);
    
    const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];
    getAllPoemsByAuthor(req.query.author)
      .then(poemObject => 
        Poem
          .create({ 
            author: poemObject.author, 
            title: poemObject.title,
            lines: randomItem(poemObject.lines),
            category: 'Romantic'
          })
          .then(poem => {
            // Hack in a random user since JWT isn't working right
            User
              .findOne()
              .then(user => {
                Poegram
                  .create({ 
                    // userId: req.user._id, 
                    userId: user._id, 
                    poemId: poem._id,
                    colors: ['ccc']
                  })
                  // .then(poegram => res.send(responseFormatter(poegram, req.query.format)))
                  .then(poegram => 
                    Poegram
                      .findById(poegram._id)
                      .populate('userId')
                      .populate('poemId')
                      .then(populatedPoegram => formattedResponse(populatedPoegram, req.query.format, res)));
              });
          }))
      .catch(next);
  })

// This doesn't work due to JWT issue in req
  .get('/old', ensureAuth, (req, res, next) => {

    console.log('** req.user is ', req.user);
    
    const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];
    getAllPoemsByAuthor(req.query.author)
>>>>>>> 077054cbf13484325e4067ef41ed23238a3e61ff
      .then(poemObject => 
        Poem
          .create({ 
            author: poemObject.author, 
            title: poemObject.title,
            lines: randomItem(poemObject.lines),
            category: 'Romantic'
<<<<<<< HEAD
          }))
      .then(poem =>
        Poegram
          .create({ 
            userId: req.user._id, 
            poemId: poem._id,
            colors: ['ccc']
          }))
      .then(poegram =>
        Poegram
          .findById(poegram._id)
          .populate('userId')
          .populate('poemId'))
      .then(poegram => formattedResponse(poegram, req.query.format, res))
=======
          })
          .then(poem => {
            console.log('User is ', req.user);
            Poegram
              .create({ 
                userId: req.user._id, 
                poemId: poem._id,
                colors: ['ccc']
              })
              .then(poegram => res.send(poegram));
          }))
>>>>>>> 077054cbf13484325e4067ef41ed23238a3e61ff
      .catch(next);
  });

// make a route either in create or poegrams.js 

// .post('/', ensureAuth, (req, res, next) => 
//   Poem
//     .create(req.body)
//     .then(poem => res.send(poem))
//     .catch(next);
// })


