const mongoose = require('mongoose');
const path = require('path');
const { tweet, tweetImage } = require('../utils/twitter');
const drawPoegram = require('../utils/drawPoegram');

const schema = new mongoose.Schema({
  userId: { 
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  poemId: {
    type: mongoose.Types.ObjectId,
    ref: 'Poem',
    required: true
  },
  colors: [{
    type: String
  }]
});

schema.methods.formattedRes = async function(format, res) {
  const formatted = await this.formatted(format);
  // console.log('formatted is', formatted);
  if(format === 'image') return res.redirect(formatted);

  res.send(formatted);
};

schema.methods.formatted = async function(format = 'json') {
  if(format === 'json') return this.toJSON();
  if(format === 'text') return `${this.poemId.lines}\n—${this.poemId.author} from "${this.poemId.title}"`;
  if(format === 'imagepath') return path.resolve(__dirname, `../../public/${this._id}-${format}.png`);
  if(format === 'image') {
    await drawPoegram(this, format);
    return `/poegrams/${this._id}-${format}.png`;
  }
  if(format === 'tweet') {
    const twitterResponse = await tweet(this);
    return twitterResponse;
  }
  if(format === 'tweetimage') {
    await drawPoegram(this, format);
    const twitterResponse = await tweetImage(this);
    return twitterResponse;
  }
};

module.exports = mongoose.model('Poegram', schema);

