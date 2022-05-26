const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Ingredient = require('../lib/models/Ingredient');
const UserService = require('../lib/services/UserService');

let agent;

describe('TeaLab-back-end ingredient route', () => {
  jest.setTimeout(30000);
  beforeEach(() => {
    agent = request.agent(app);
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

  const notAdmin = {
    email: 'user@email.com',
    password: 'wrongPassword',
    username: 'otherUser'
  };

  const mockIngredient = {
    commonName: 'test ingredient name',
    scientificName: 'test ingredient scientific name',
    image: '',
    type: 'Base',
    healthBenefits: ['test happiness'],
    description: 'test description'
  };
  
  it('should only allow admin to POST an ingredient', async () => {
    await agent
      .post('/api/v1/users')
      .send(admin);

    await agent
      .post('/api/v1/users/session')
      .send(admin);

    const res = await agent
      .post('/api/v1/ingredients')
      .send(mockIngredient);

    expect(res.body).toEqual({ ...mockIngredient, id: expect.any(String) });
  });

  it('should not allow user to POST an ingredient', async () => {
    await agent
      .post('/api/v1/users')
      .send(notAdmin);

    await agent
      .post('/api/v1/users/session')
      .send(notAdmin);

    const res = await agent
      .post('/api/v1/ingredients')
      .send(mockIngredient);

    expect(res.body).toEqual({ 
      message: 'Must be admin to access an ingredient',
      status: 403,
    });
  });

  it('should only allow admin to UPDATE an ingredient', async () => {
    await agent
      .post('/api/v1/users')
      .send(admin);

    await agent
      .post('/api/v1/users/session')
      .send(admin);
    
    const expected = await Ingredient.getIngredientById(1);

    const res = await agent
      .patch(`/api/v1/ingredients/${expected.id}`)
      .send({ commonName: 'Great Test Ingredient Name' });

    expect(res.body).toEqual({ ...expected, commonName: 'Great Test Ingredient Name' });
  });

  it('should not allow user to UPDATE an ingredient', async () => {
    await agent
      .post('/api/v1/users')
      .send(notAdmin);

    await agent
      .post('/api/v1/users/session')
      .send(notAdmin);
    
    const expected = await Ingredient.getIngredientById(1);

    const res = await agent
      .patch(`/api/v1/ingredients/${expected.id}`)
      .send({ commonName: 'Great Test Ingredient Name' });

    expect(res.body).toEqual({ 
      message: 'Must be admin to access an ingredient',
      status: 403,
    });
  });

  it('should get a list of ingredient', async () => {
    const expected = await Ingredient.getAllIngredients();

    const res = await request(app)
      .get('/api/v1/ingredients');

    expect(res.body).toEqual(expected);
  });

  it('should get a single ingredient by ID', async () => {
    await agent
      .post('/api/v1/users')
      .send(admin);

    await agent
      .post('/api/v1/users/session')
      .send(admin);

    const expected = await Ingredient.getIngredientById(1);

    const res = await agent
      .get(`/api/v1/ingredients/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
