const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Recipe = require('../lib/models/Recipe');

describe('TeaLab-back-end recipe route', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should get a list of recipes', async () => {
    const res = await request(app).get('/api/v1/recipes');

    expect(res.body).toEqual([
      {
        id: '1',
        name: 'Jasmine Green Tea',
        userId: '1',
        notes: 'My go-to stress-reliever',
        createdAt: expect.any(String),
      },
      {
        id: '2',
        name: 'Iced Lemon Tea',
        userId: '1',
        notes: 'Summer Favorite',
        createdAt: expect.any(String),
      },
    ]);
  });

  it.skip('should allow authorized user to update a tea recipe', async () => {});
  it.skip('should allow authorized user to delete a tea recipe', async () => {});
});
