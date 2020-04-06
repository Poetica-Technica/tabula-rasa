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
  text: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
},

// {
//   toJSON: {
//     virtuals: true,
//     transform: (doc, ret) =>{
//       delete ret.id;
//     }
//   }
// });

// schema.virtual('poems', {
//   ref: 'Poem',
//   localField: '_id',
//   foreignField: 'poem'
// });

module.exports = mongoose.model('Poem', schema);