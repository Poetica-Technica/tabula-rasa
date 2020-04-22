const request = require('superagent');

const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

const getAuthors = () => 
  request.get('http://poetrydb.org/author')
    .then(res => res.body);

const getRandomAuthor = () =>
  getAuthors()
    .then(res => res.authors)
    .then(randomItem);

const getRandomPoemByAuthor = async(myAuthor) => 
  request.get(`http://poetrydb.org/author/${myAuthor}`)
    .then(res => res.body) // use res.body to get json
    .then(randomItem);

module.exports = { randomItem, getAuthors, getRandomAuthor, getRandomPoemByAuthor };
