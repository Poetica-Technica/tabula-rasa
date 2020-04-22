const fs = require('fs');
const path = require('path');
const Twit = require('twit');
const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  strictSSL: true
});

const tweetImage = poegram => {
  const image_path = path.join(__dirname, `../../public/${poegram._id}-tweetimage.png`);
  const b64content = fs.readFileSync(image_path, { encoding: 'base64' });
 
  // Start the post with media to Twitter
  // make into a promise so we can wait for it
  return new Promise((resolve, reject) => {
    T.post('media/upload', { media_data: b64content }, (err, data) => {
      if(err) return reject(err);
      
      // Now we can assign alt text to the media, for use by screen readers and
      // other text-based presentations and interpreters
      const mediaIdStr = data.media_id_string;
      const altText = poegram.poemId.lines;
      const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
     
      T.post('media/metadata/create', meta_params, err => {
        if(err) return reject(err);

        // Now we can reference the media and post a tweet (media will attach to the tweet)
        const tweet = { status: '#poegram', media_ids: [mediaIdStr] };
     
        T.post('statuses/update', tweet, function(err, data) {
          if(err) return reject(err);
          return resolve(data);
        });
      });
    });
  });
};

const tweet = (poegram) => {
  return new Promise((resolve, reject) => {
    const tweet = {
      status: `${poegram.poemId.lines}
—${poegram.poemId.author}
from \u201C${poegram.poemId.title}\u201D
#poegram`
    };

    T.post('statuses/update', tweet, function(err, data) {
      if(err) return reject(err);
      return resolve(data);
    });
  });
};

module.exports = {
  tweet,
  tweetImage
};

