const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { tweet, tweetImage } = require('../utils/twitter');
const drawPoegram = require('../utils/drawPoegram');
const Lob = require('lob')(process.env.LOB_TEST_SECRET);

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
  console.log('formatted is', formatted);
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
  if(format === 'postcard') {
    await drawPoegram(this, format);
    const lobResponse = await Lob.postcards.create({
      description: 'Demo Node Postcard',
      to: {
        name: 'Harry Zhang',
        address_line1: '185 Berry St',
        address_line2: '# 6100',
        address_city: 'San Francisco',
        address_state: 'CA',
        address_zip: '94107'
      },
      front: fs.createReadStream(path.resolve(__dirname, `../../public/${this._id}-${format}.png`)),
      back: 'https://s3-us-west-2.amazonaws.com/public.lob.com/assets/templates/4x6_pc_template.pdf'
    }, function(err, res) {
      // console.log('Lob response:', err, res);
      if(err) { 
        console.log('returning err');
        return err;
      }
      console.log('returning res:', res);
      return res;
    });
    return lobResponse;
  }
};

module.exports = mongoose.model('Poegram', schema);

