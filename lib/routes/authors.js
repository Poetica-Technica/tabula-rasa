
const { Router } = require('express');
const request = require('superagent');

const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

module.exports = Router()

  .get ('/', (req, res, next) => {

    try {
      const URL = 'http://poetrydb.org/author';
      request.get(URL)
        .then(authors => {
          res.send(authors); 
        });
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
  });
