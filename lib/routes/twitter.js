const Twitter = require('twitter');
const config = require('./config.js');
const client = new Twitter(config);
const fs = require('fs');

const imageData = fs.readFileSync("./media/george.jpg") //replace with the path to your image
 
client.post('media/upload', { media: imageData }, function(error, media, response) {
  if(error) {
    console.log(error);
  } else {
    const status = {
      status: 'I tweeted from Node.js!',
      media_ids: media.media_id_string
    }
 
    client.post('statuses/update', status, function(error, tweet, response) {
      if(error) {
        console.log(error);
      } else {
        console.log('Successfully tweeted an image!');
      }
    });
  }
});
