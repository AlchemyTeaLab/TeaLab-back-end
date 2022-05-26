const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Ingredient = require('../lib/models/Ingredient');
const UserService = require('../lib/services/UserService');

const agent = request.agent(app);

describe('TeaLab-back-end ingredient route', () => {
  jest.setTimeout(30000);
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  const admin = {
    email: 'admin@tealab.com',
    password: 'secretPassword',
    username: 'admin'
  };

  const mockIngredient = {
    id: 2,
    commonName: 'test ingredient name',
    scientificName: 'test ingredient scientific name',
    image: '',
    type: 'base',
    healthBenefits: 'test happiness',
    description: 'test description'
  };

  it('should only allow admin to POST an ingredient', async () => {
    await UserService.create(admin);
    await agent
      .post('/api/v1/users/session')
      .send(admin);

    const res = await agent
      .post('/api/v1/ingredients')
      .send(mockIngredient);

    expect(res.body).toEqual({ ...mockIngredient });
  });

  it('should get a list of ingredient', async () => {
    const expected = await Ingredient.getAllIngredients();

    const res = await request(app)
      .get('/api/v1/ingredients');

    expect(res.body).toEqual(expected);
  });
});
