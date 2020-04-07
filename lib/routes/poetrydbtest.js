const request = require('superagent');

const getAllPoemsByAuthor = async() => {
<<<<<<< HEAD
  const URL = 'http://poetrydb.org/author/Emma%20Lazarus';
=======
  const URL = `http://poetrydb.org/author/${req.query.author}`;
>>>>>>> 5d831e11c61fde9a9bb1809ae58c0a792d8be412
  const poemsData = await request.get(URL);
  return JSON.parse(poemsData.text)[0].lines[0];
  //   return JSON.parse(poemsData.text);
};

getAllPoemsByAuthor().then(res => console.log(res));

