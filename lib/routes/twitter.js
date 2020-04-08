const Twitter = require('twitter');
const config = require('./config.js');
const client = new Twitter(config);

client.post('statuses/update', 
{status: 'I Love Twitter'}, 
  function(error, tweet, response) {
    if(error) throw error;
    console.log(tweet);  // Tweet body.
    console.log(response);  // Raw response object.
  });
