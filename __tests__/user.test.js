require('dotenv').config();
const User = require('../lib/models/User');

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
