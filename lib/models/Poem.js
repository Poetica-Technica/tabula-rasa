const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  lines: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('Poem', schema);
