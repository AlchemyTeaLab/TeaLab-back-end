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
    const expected = await Recipe.getAllRecipes();
    const res = await request(app).get('/api/v1/recipes');

    expect(res.body).toEqual(expected);
  });

  it.skip('should allow authorized user to update a tea recipe', async () => {});
  it.skip('should allow authorized user to delete a tea recipe', async () => {});
});
