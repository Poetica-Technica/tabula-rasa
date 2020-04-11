const drawPoegram = require('../utils/drawPoegram');
const request = require('superagent');
const path = require('path');
const tweet = require('../utils/twitter');

const formattedResponse = async(poegram, format, res) => {
  // Return JSON data if no format is specified
  if(!format || format === 'json') { res.send(poegram); }
  else if(format === 'text') { res.send(`${poegram.poemId.lines}\n—${poegram.poemId.author} from "${poegram.poemId.title}"`); }
  else if(format === 'imagepath') { res.send(path.resolve(__dirname, `../../public/${poegram._id}-${format}.png`)); }
  else if(format === 'image') {
    await drawPoegram(poegram, format);
    res.redirect(`/poegrams/${poegram._id}-${format}.png`);
  }
  else if(format === 'tweet') { 
    await tweet(poegram); 
    res.send('Tweet sent!');
  }
  else if(format === 'tweetimage') {
    await drawPoegram(poegram, format);
    await tweet(poegram, format); 
    res.send('Image tweet sent!');
  }
};

const randomAuthor = async() => { 
  const URL = 'http://poegram.herokuapp.com';
  const result = await request.get(`${URL}/api/v1/authors/random`);
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
