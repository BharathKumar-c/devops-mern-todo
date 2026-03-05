const request = require('supertest');
const {server, app} = require('../index');
const mongoose = require('mongoose');

describe('Task API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  it('should return 200 status code', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
  });
  it('should return object and tasks data', async () => {
    const response = await request(app).get('/api/tasks');
    expect(typeof response.body).toBe('object');
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('tasks');
  });
});
