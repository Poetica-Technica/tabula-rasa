const config = require('../middleware/config.js');
const fs = require('fs');
const path = require('path');
const Twit = require('twit');
const T = new Twit(config);

module.exports = (poegram, format) => {

  if(!format || format === 'tweet') {
    const tweet = {
      status: `${poegram.poemId.lines}

      —${poegram.poemId.author}
      from \u201C${poegram.poemId.title}\u201D #poegram`
    };

    T.post('statuses/update', tweet, tweeted);
    // eslint-disable-next-line no-inner-declarations
    function tweeted(err, data, response) { console.log(data); }
  
  }
  
  else if(format === 'tweetimage') {
    const image_path = path.join(__dirname, `../../public/${poegram._id}-${format}.png`);
    const b64content = fs.readFileSync(image_path, { encoding: 'base64' });
 
    // Start the post with media to Twitter
    T.post('media/upload', { media_data: b64content }, function(err, data, response) {
      
      // Now we can assign alt text to the media, for use by screen readers and
      // other text-based presentations and interpreters
      const mediaIdStr = data.media_id_string;
      const altText = poegram.poemId.lines;
      const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
     
      T.post('media/metadata/create', meta_params, function(err, data, response) {
        if(!err) {
          // Now we can reference the media and post a tweet (media will attach to the tweet)
          const params = { status: '#poegram', media_ids: [mediaIdStr] };
     
          T.post('statuses/update', params, function(err, data, response) {
            console.log(data);
          });
        }
      });
    });
  }  

};

