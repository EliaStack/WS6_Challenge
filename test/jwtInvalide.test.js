//Tester un JWT invalide
jwt.verify(token, process.env.SECRET)
const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

jwt.verify.mockImplementation(() => {
  throw new Error('Invalid token');
});

it('retourne 401 si le JWT est invalide', async () => {
  const response = await request(app)
    .get('/api/projects')
    .set('Authorization', 'Bearer fauxToken');

  expect(response.status).toBe(401);
});