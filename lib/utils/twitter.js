
console.log('it works!');
const config = require('../middleware/config.js');
const Twit = require('twit');
const T = new Twit(config);

module.exports = (poegram) => {
  const tweet = {
    status: `${poegram.poemId.lines}\n -${poegram.poemId.author} -${poegram.poemId.title} #poegram`
  };

  T.post('statuses/update', tweet, tweeted);  
  function tweeted(err, data, response) {
    console.log(data);
  }
};

