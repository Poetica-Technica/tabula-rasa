require('dotenv').config();
require('../lib/utils/connect')();
const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Poegram = require('../lib/models/Poegram');
const Poem = require('../lib/models/Poem');
const { getRandomPoemByAuthor, randomAuthor, randomItem } = require('../lib/routes/route-functions');

async function seedFunction() {
  const loggedInUser = await User.create({
    username: 'test',
    password: 'test',
  });
  console.log('hi');
  return getRandomPoemByAuthor(randomAuthor())
    .then(poemObject => 
      Poem
        .create({ 
          author: poemObject.author, 
          title: poemObject.title,
          lines: randomItem(poemObject.lines),
          category: 'Romantic'
        })
    )
    .then(poem =>
      Poegram
        .create({ 
          userId: loggedInUser,
          poemId: poem._id,
          colors: [chance.color({ format: 'hex' }), chance.color({ format: 'hex' })]
        }));
}

seedFunction().then(() => console.log('hi'));
