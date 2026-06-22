//Tester un accès refusé (401)
jest.mock('../middleware/auth', () => {
  return (req, res, next) => {
    return res.status(401).json({
      message: 'Non authentifié'
    });
  };
});

it('doit refuser un utilisateur non connecté', async () => {
  const response = await request(app)
    .get('/api/projects');

  expect(response.status).toBe(401);
});
