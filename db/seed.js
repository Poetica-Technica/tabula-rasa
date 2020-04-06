const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Poegram = require('../lib/models/Poegram');
const Poem = require('../lib/models/Poem');


module.exports = async({ usersToCreate = 3, poemsToCreate = 10, poegramsToCreate = 50 } = {}) => {

  const loggedInUser = await User.create({
    username: 'beauty',
    password: 'beautiful',
  });

  const categories = ['Romantic', 'Lake', 'American'];
  const loggedInPoem = await Poem.create({
    author: chance.name(),
    title: chance.name(),
    text: chance.sentence(),
    lines: chance.sentence(),
    category: chance.pickone(categories),
  });

  await Poegram.create({
    userId: loggedInUser,
    poemId: loggedInPoem,
    colors: [chance.color(), chance.color()]
  });



  const users = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: chance.name(),
    password: chance.animal(),
  })));

  // hits external api 
  const poems = await Poem.create([...Array(poemsToCreate)].slice(1).map(() => ({
    author: chance.name(),
    title: chance.name(),
    text: chance.sentence(),
    lines: chance.sentence(),
    category: chance.pickone(categories),
  })));

  await Poegram.create([...Array(poegramsToCreate)].slice(1).map(() => ({
    userId: chance.pickone(users),
    poemId: chance.pickone(poems),
    colors: [chance.color(), chance.color()]
  })));
};
