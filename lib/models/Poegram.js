const mongoose = require('mongoose');
const path = require('path');
const { tweet, tweetImage } = require('../utils/twitter');
const drawPoegram = require('../utils/drawPoegram');

// your model has no virtuals
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

schema.methods.formattedWithRes = function(format, res) {
  const formatted = this.formatted(format);
  if(format === 'image') return res.redirect(formatted);

  res.send(formatted);
}

schema.methods.formatted = async function(format = 'json') {
  if(format === 'json') return this.toJSON();
  if(format === 'text') return `${this.poemId.lines}\n—${this.poemId.author} from "${this.poemId.title}"`
  if(format === 'imagepath') return path.resolve(__dirname, `../../public/${this._id}-${format}.png`)
  if(format === 'image') {
    await drawPoegram(this);
    return `/poegrams/${this._id}-${format}.png`
  }
  if(format === 'tweet') return tweet(this);
  if(format === 'tweetimage') {
    await drawPoegram(this)
    await tweetImage(this);
    return 'tweet sent';
  }
}

module.exports = mongoose.model('Poegram', schema);

