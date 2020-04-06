const { getUser, getPoegram, getPoegrams, getPoem, getAgent } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('Poegram routes', () => {
  it('creates a poegram', async() => {
    const user = await getUser({ username: 'testUser' });
    const poem = await getPoem({ title: 'testTitle' });
    
    return getAgent()
      .post('/poegrams')
      .send({
        user: user._id,
        poem: poem._id,
        colors: ['#000000', '#FFFFFF']
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: user._id.toString(),
          poem: poem._id.toString(),
          colors: ['#000000', '#FFFFFF'],
          __v: 0
        });
      });
  });
  

  it('gets all poegrams', async() => {
    const poegrams = await getPoegrams();

    return request(app)
      .get('/poegrams')
      .then(res => {
        expect(res.body).toEqual(poegrams);
      });
  });


  it('gets a specific poegram', async() => {
    const poegram = await getPoegram();
    const user = await getUser({ _id: poegram.user });
    const poem = await getPoem({ _id: poegram.poem });

    return request(app)
      .get(`/poegrams/${poegram._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...poegram,
          user: user,
          poem: poem
        });
      });
  });


  it('deletes a poegram', async() => {
    const user = await getUser({ username: 'testUser' });
    const poegram = await getPoegram({ user: user._id });

    return getAgent()
      .delete(`/poegrams/${poegram._id}`)
      .then(res => {
        expect(res.body).toEqual(poegram);
      });
  });

});
