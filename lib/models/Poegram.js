
const mongoose = require('mongoose');

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

module.exports = mongoose.model('Poegram', schema);

