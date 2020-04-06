const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Poegram = require('../lib/models/Poegram');
const Poem = require('../lib/models/Poem');

module.exports = async({ usersToCreate = 5, poegramsToCreate = 100, poemsToCreate = 25 } = {}) => {
  const loggedInUser = await User.create({
    username: 'beauty',
    password: 'beautiful',
  });

  const users = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: chance.name(),
    password: chance.animal(),
  })));

  await Poegram.create([...Array(poegramsToCreate)].map(() => ({
    poemId: chance.profession(),
    colors: chance.color(),
    userId: chance.weighted([loggedInUser, ...users], [2, ...users.map(() => 1)])._id
  })));

  // hits external api 
  const poem = await Poem.create([...Array(poemsToCreate)].slice(1).map(() => ({
    author: chance.name(),
    title: chance.name(),
    text: chance.sentence(),
    lines: chance.sentence(),
    category: chance.pickone(poem),
  })));
};
