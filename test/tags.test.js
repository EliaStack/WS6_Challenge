//Règle métier
it('ne doit pas créer deux tags identiques', async () => {

  await request(app)
    .post('/api/tags')
    .send({ name: 'Urgent' });

  const response = await request(app)
    .post('/api/tags')
    .send({ name: 'Urgent' });

  expect(response.status).toBe(400);
});