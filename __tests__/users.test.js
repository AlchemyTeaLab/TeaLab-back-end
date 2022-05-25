const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('TeaLab-back-end routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should sign up user with POST', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({
        username: 'test_username',
        email: 'test@email.com',
        password: 'secretPassword',
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'test_username',
      email: 'test@email.com',
    });
  });
});
