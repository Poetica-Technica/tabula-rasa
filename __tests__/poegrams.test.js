const { getUser, getPoegram, getPoegrams, getPoem, getAgent } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('Poegram routes', () => {
  // it('creates a poegram', async() => {
  //   const user = await getUser({ username: 'beauty' });
  //   const poem = await getPoem();
    
  //   return getAgent()
  //     .post('/api/v1/poegrams')
  //     .send({
  //       userId: user._id,
  //       poemId: poem._id,
  //       colors: ['#000000', '#FFFFFF']
  //     })
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: expect.any(String),
  //         userId: user._id.toString(),
  //         poemId: poem._id.toString(),
  //         colors: ['#000000', '#FFFFFF'],
  //         __v: 0
  //       });
  //     });    
  // });
  

  it('gets all poegrams', async() => {
    const poegrams = await getPoegrams();

    return request(app)
      .get('/api/v1/poegrams')
      .then(res => {
        expect(res.body).toEqual([{
          ...poegrams,
          userId: {
            _id: expect.any(String),
            username: expect.any(String),
            __v: 0
          },
          poemId: {
            _id: expect.any(String),
            author: expect.any(String),
            title: expect.any(String),
            text: expect.any(String),
            lines: expect.any(String),
            category: expect.any(String),
            __v: 0
          },
        }]);
      });
  });


  // it('gets a specific poegram', async() => {
  //   const poegram = await getPoegram();
  //   const user = await getUser({ _id: poegram.userId });
  //   const poem = await getPoem({ _id: poegram.poemId });

  //   return request(app)
  //     .get(`/api/v1/poegrams/${poegram._id}`)
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         ...poegram,
  //         user: user,
  //         poem: poem
  //       });
  //     });
  // });


  // it('deletes a poegram', async() => {
  //   const user = await getUser({ username: 'testUser' });
  //   const poegram = await getPoegram({ user: user._id });

  //   return getAgent()
  //     .delete(`/api/v1/poegrams/${poegram._id}`)
  //     .then(res => {
  //       expect(res.body).toEqual(poegram);
  //     });
  // });

});
