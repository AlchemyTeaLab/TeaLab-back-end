const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Ingredient = require('../lib/models/Ingredient');

describe('TeaLab-back-end routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it.skip('should allow admin to POST an ingredient', async () => {

  });

  it.skip('should get a list of ingredient', async () => {
    const expected = await Ingredient.getAllIngredients();

    const res = await request(app)
      .get('/api/v1/ingredients');

    expect(res.body).toEqual(expected);
  });
});