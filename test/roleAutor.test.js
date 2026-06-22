jest.mock('../middleware/auth', () => {
  return (req, res, next) => {
    req.auth = {
      userId: '123',
      role: ['ROLE_MANAGER']
    };

    next();
  };
});

it('autorise un manager', async () => {
  const response = await request(app)
    .post('/api/projects')
    .send({
      name: 'Projet test'
    });

  expect(response.status).not.toBe(403);
});
