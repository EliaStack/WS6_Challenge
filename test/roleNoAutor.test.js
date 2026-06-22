jest.mock('../middleware/auth', () => {
  return (req, res, next) => {
    req.auth = {
      userId: '123',
      role: ['ROLE_USER']
    };

    next();
  };
});

it('refuse un utilisateur sans le rôle requis', async () => {
  const response = await request(app)
    .post('/api/projects')
    .send({
      name: 'Projet test'
    });

  expect(response.status).toBe(403);
});