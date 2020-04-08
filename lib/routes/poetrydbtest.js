const request = require('superagent');

const getAllPoemsByAuthor = async() => {
  const URL = 'http://poetrydb.org/author/Emma%20Lazarus';
  const poemsData = await request.get(URL);
  return JSON.parse(poemsData.text)[0].lines[0];
  //   return JSON.parse(poemsData.text);
};

getAllPoemsByAuthor().then(res => console.log(res));

