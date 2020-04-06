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
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }, 
  toObject: {
    virtuals: true
  }
});

module.exports = mongoose.model('Poegram', schema);

