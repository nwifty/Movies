const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { Client } = require('pg');


const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


// PostgreSQL client config
const client = new Client({
    user: 'movie_postgresql_user',
    host: 'dpg-d29g1pili9vc73fmen3g-a.singapore-postgres.render.com',
    database: 'movie_postgresql',
    password: '9FJzzWOCTW0w1TQPx0nQsOc5jyqfcSAs',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

client.connect()
    .then(() => console.log('✅ Connected to PostgreSQL'))
    .catch(err => console.error('❌ Connection error:', err.stack));

// Middleware
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, 'movie-website/src')));

// OMDb API key (replace with your own key)
const OMDB_API_KEY = '9d1f92fe';

// Helper function to fetch poster URL from OMDb API
async function getPosterUrl(title) {
    try {
        const url = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === "True" && data.Poster && data.Poster !== 'N/A') {
            return data.Poster;
        }
    } catch (err) {
        console.error('OMDb fetch error:', err.message);
    }
    return null; // fallback if no poster found or error
}

// --- API Routes ---

// 1. Get movie by show_id
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

// 2. Add a new movie
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
        const query = `
            INSERT INTO netflix_shows (
                show_id, title, director, cast_members, country, date_added,
                release_year, rating, duration, listed_in, description
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
            RETURNING *;
        `;
        const values = [
            show_id, title, director, cast_members, country, date_added,
            release_year, rating, duration, listed_in, description
        ];
        const result = await client.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Search by title with poster URL added
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

        // For each movie, fetch the poster URL from OMDb API
        const moviesWithPosters = await Promise.all(result.rows.map(async (movie) => {
            const poster = await getPosterUrl(movie.title);
            return {
                ...movie,
                poster
            };
        }));

        res.json(moviesWithPosters);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Fallback only for non-API, non-/netflix paths
app.get(/^\/(?!api|netflix).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'movie-website/src/index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});



