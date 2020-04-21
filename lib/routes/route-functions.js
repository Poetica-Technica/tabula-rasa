const request = require('superagent');

const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

const getRandomPoemByAuthor = async(myAuthor) => 
  request.get(`http://poetrydb.org/author/${myAuthor}`)
    .then(res => res.body) // use res.body to get json
    .then(randomItem);

// extract useful functions
const getAuthors = () => 
  request.get('http://poetrydb.org/author')
    .then(res => res.body)

const getRandomAuthor = () =>
  getAuthors()
    .then(randomItem);

module.exports = { getAuthors, getRandomAuthor, formattedResponse, getRandomPoemByAuthor };
