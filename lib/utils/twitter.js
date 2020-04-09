console.log('it works!');
// const Twitter = require('twitter');
const config = require('../middleware/config.js');
console.log(config);
// const fs = require('fs');
const Twit = require('twit');
const T = new Twit(config);
  
// .get('account/verify_credentials', {
//   include_entities: false,
//   skip_status: true,
//   include_email: false
// });
const tweet = {
  status: 'Poegrams are art and poetry!' 
};
T.post('statuses/update', tweet, tweeted);  
function tweeted(err, data, response) {
  console.log(data);
}

// console.log(tweet);  
// console.log(response);  



// const poegram = fs.readFileSync('http://https://glacial-shelf-60937.herokuapp.com/public/image.png'); //replace with the path to your image
 
// client.post('media/upload', { media: poegram }, 
//     const status = {
//       status: 'I tweeted from Node.js!',
//       media_ids: media.media_id_string
//     };
 
//     client.post('statuses/update', status, function(error, tweet, response) {
//       if(error) {
//         console.log(error);
//       } else {
//         console.log('Successfully tweeted an image!');
//       }
//     });
//   }
