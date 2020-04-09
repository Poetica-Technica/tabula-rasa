const drawBackground = require('../utils/drawBackground');
const request = require('superagent');
const path = require('path');


const formattedResponse = async(poegram, format, res) => {
  // Return JSON data if no format is specified
  if(!format || format === 'json') { res.send(poegram); }
  if(format === 'imagepath') { res.send(path.resolve(__dirname, `../../public/${poegram._id}.png`)); }
  if(format === 'imagetest') { res.sendFile(path.resolve(__dirname, '../../public/image.png')); }
  if(format === 'image') {
    const generatedImage = await drawBackground(poegram);
    res.sendFile(path.resolve(__dirname, `../../public/${poegram._id}.png`));
  }
  if(format === 'tweet') {
    // ADD TWEET CODE HERE
  }
};


const randomAuthor = async() => { 
  const result = await request.get('http://localhost:7890/api/v1/authors/random');
  return result;
};

const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

const getRandomPoemByAuthor = async(myAuthor) => {
  const URL = `http://poetrydb.org/author/${myAuthor}`;
  const poemsData = await request.get(URL);
  const poemArray = JSON.parse(poemsData.text);
  const poemObject = poemArray[Math.floor(Math.random() * poemArray.length)];
  return poemObject;
};

module.exports = { formattedResponse, randomItem, getRandomPoemByAuthor, randomAuthor };
