const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Recipe = require('../lib/models/Recipe');
const UserService = require('../lib/services/UserService');

let agent;

describe('TeaLab-back-end recipe route', () => {
  beforeEach(() => {
    agent = request.agent(app);
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  const mockUser = {
    email: 'user1@tealab.com',
    password: '123456',
    username: 'user1',
  };

  const mockRecipe = {
    id: '100',
    name: 'Super Amazing Tea',
    userId: '2',
    notes: 'some notes',
  };

  // GET ALL TEA RECIPES
  it('should allow signed in user to get a list of tea recipe', async () => {
    const user = await UserService.create(mockUser);
    await agent.post('/api/v1/users/session').send(mockUser);
    const res = await agent.get('/api/v1/recipes');
    const expected = [
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
    ];

    expect(res.body).toEqual(expected);
  });

  // CREATE A TEA RECIPE
  it('should allow signed in user to CREATE a tea recipe', async () => {
    await UserService.create(mockUser);
    await agent.post('/api/v1/users/session').send(mockUser);
    const res = await agent.post('/api/v1/recipes').send(mockRecipe);

    console.log('NEW RECIPE', res.body);
    expect(res.body).toEqual({
      id: expect.any(String),
      createdAt: expect.any(String),
      ...mockRecipe,
    });
  });

  // EDIT A TEA RECIPE BY RECIPE ID
  it('should allow signed in user to UPDATE a tea recipe', async () => {
    await UserService.create(mockUser);
    await agent.post('/api/v1/users/session').send(mockUser);
    const expected = await Recipe.getRecipeById(1);
    console.log('RECIPE', expected);
    const res = await agent.patch(`/api/v1/recipes/${expected.id}`).send({
      name: 'Jasmine Honey Green Tea',
      notes: 'It took my allergies away!',
    });
    expect(res.body).toEqual({
      ...expected,
      name: 'Jasmine Honey Green Tea',
      userId: expect.any(String),
      notes: 'It took my allergies away!',
      createdAt: expect.any(String),
    });
  });

  // DELETE A TEA RECIPE BY RECIPE ID
  it.skip('should allow signed in user to delete a tea recipe', async () => {
    await UserService.create(mockUser);
    await agent.post('/api/v1/users/session').send(mockUser);
    await agent.post('/api/v1/recipes').send(mockRecipe);
    const res = await agent.delete(`/api/v1/recipes/${mockRecipe.id}`);
    expect(res.body).toEqual({
      message: 'You have successfully deleted a tea recipe',
    });
  });
});
