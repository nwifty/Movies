const request = require('supertest');
const app = require('./app');

// Mock pg Pool and its query method
jest.mock('pg', () => {
  const mPool = {
    query: jest.fn()
  };
  return { Pool: jest.fn(() => mPool) };
});

const { Pool } = require('pg');
const mPool = new Pool();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Movies API', () => {
  // GET by show_id
  describe('GET /api/movies/:show_id', () => {
    it('should return movie by show_id', async () => {
      mPool.query.mockResolvedValueOnce({ rows: [{ show_id: '1', title: 'Inception' }] });
      const res = await request(app).get('/api/movies/1');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0].title).toBe('Inception');
    });
  });

  // POST new movie
  describe('POST /api/movies', () => {
    it('should create a new movie', async () => {
      const newMovie = {
        show_id: 'test123',
        title: 'Test Movie',
        director: 'Test Director',
        cast_members: 'Test Cast',
        country: 'Test Country',
        date_added: '2025-09-24',
        release_year: 2025,
        rating: 'PG',
        duration: '90 min',
        listed_in: 'Test Genre',
        description: 'Test Description'
      };
      mPool.query.mockResolvedValueOnce({ rows: [newMovie] });
      const res = await request(app)
        .post('/api/movies')
        .send(newMovie);
      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe('Test Movie');
    });
  });

  // PUT (not implemented in app.js, so this is a placeholder)
  describe('PUT /api/movies/:show_id', () => {
    it('should update a movie (not implemented)', async () => {
      const res = await request(app)
        .put('/api/movies/test123')
        .send({ title: 'Updated Title' });
      expect([404, 501]).toContain(res.statusCode); // 404 or 501 expected
    });
  });

  // DELETE (not implemented in app.js, so this is a placeholder)
  describe('DELETE /api/movies/:show_id', () => {
    it('should delete a movie (not implemented)', async () => {
      const res = await request(app)
        .delete('/api/movies/test123');
      expect([404, 501]).toContain(res.statusCode); // 404 or 501 expected
    });
  });
});