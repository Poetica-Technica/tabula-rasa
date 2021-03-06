const { getUser, getPoegram, getPoegrams, getPoem, getAgent } = require('../db/data-helpers');

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');

describe('Poegram routes', () => {
  it('creates a poegram', async() => {
    //the test isn't working because we're not getting a poem right now because we're not passing an author
    return getAgent()
      .post('/api/v1/poegrams')
      .then(res => { 
        expect(res.body).toEqual({
          _id: expect.any(String),
          userId: expect.any(String),
          lines: expect.any(String),
          colors: [expect.any(String)],
          __v: 0
        });
      });    
  });

  it('gets all poegrams', async() => {
    const poegrams = await getPoegrams();

    return request(app)
      .get('/api/v1/poegrams')
      .then(res => {
        poegrams.forEach(poegram => {
          expect(res.body).toContainEqual({
            ...poegram,
            userId: expect.any(Object),
            poemId: expect.any(Object)
          });
        });     
      });
  });
  it('gets a specific poegram', async() => {
    const poegram = await getPoegram();
    const user = await getUser({ _id: poegram.userId });
    const poem = await getPoem({ _id: poegram.poemId });

    return request(app)
      .get(`/api/v1/poegrams/${poegram._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...poegram,
          userId: user,
          poemId: poem
        });
      });
  });

  it('deletes a poegram', async() => {
    const user = await getUser({ username: 'beauty' });
    const poegram = await getPoegram({ userId: user._id });

    return getAgent()
      .delete(`/api/v1/poegrams/${poegram._id}`)
      .then(res => {
        expect(res.body).toEqual(poegram);
      });
  });
});



