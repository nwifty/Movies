const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { Client } = require('pg');

// DB Config
const client = new Client({
    user: 'movie_postgresql_user',
    host: 'dpg-d29g1pili9vc73fmen3g-a.singapore-postgres.render.com',
    database: 'movie_postgresql',
    password: '9FJzzWOCTW0w1TQPx0nQsOc5jyqfcSAs',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

// Connect to PostgreSQL
client.connect()
    .then(() => console.log('✅ Connected to PostgreSQL'))
    .catch(err => console.error('❌ Connection error:', err.stack));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'movie-website/src')));

// ROUTES

// Get movie by show_id
app.get('/api/movies/:show_id', async (req, res) => {
    try {
        const result = await client.query(
            'SELECT * FROM netflix_shows WHERE show_id = $1',
            [req.params.show_id]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new movie
app.post('/api/movies', async (req, res) => {
    const {
        show_id,
        title,
        director,
        cast_members,
        country,
        date_added,
        release_year,
        rating,
        duration,
        listed_in,
        description
    } = req.body;

    try {
        const result = await client.query(`
            INSERT INTO netflix_shows (
                show_id, title, director, cast_members, country, date_added,
                release_year, rating, duration, listed_in, description
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
            RETURNING *;
        `, [
            show_id, title, director, cast_members, country, date_added,
            release_year, rating, duration, listed_in, description
        ]);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Search by title (simple search, no poster handling)
app.get('/netflix/:title', async (req, res) => {
    const searchTerm = `%${req.params.title}%`;

    try {
        const result = await client.query(
            'SELECT * FROM netflix_shows WHERE title ILIKE $1',
            [searchTerm]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No matching titles found' });
        }

        res.json(result.rows);

    } catch (err) {
        console.error('❌ Error in search:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Fallback route for frontend routing
app.get(/^\/(?!api|netflix).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'movie-website/src/index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});




