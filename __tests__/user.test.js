require('dotenv').config();
const User = require('../lib/models/User');
const app = require('../lib/app');
const request = require('supertest');

describe('User model', () => {
  it ('hashes password', () => {
    const user = new User({
      username: 'beauty',
      password: 'beautiful'
    });
 
    expect(user.passwordHash).toEqual(expect.any(String));
    expect(user.toJSON().password).toBeUndefined();
  });
});
// it('logs in a user', async() => {
//   await User.create({ username: 'beauty', 
//     password: 'beautiful' });
//   return request(app)
//     .post('/api/v1/users/login')
//     .send({ username: 'beauty', 
//       password: 'beautiful' })
//     .then(res => {
//       expect(res.body).toEqual({
//         _id: expect.any(String),
//         username: 'beauty',
//         __v: 0
//       });
//     });
// });
// it('deletes a user', async() =>{
//   await 
// })
