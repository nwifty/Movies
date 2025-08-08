const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { Client } = require('pg');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// DB Config
const client = new Client({
    user: 'movie_postgresql_user',
    host: 'dpg-d29g1pili9vc73fmen3g-a.singapore-postgres.render.com',
    database: 'movie_postgresql',
    password: '9FJzzWOCTW0w1TQPx0nQsOc5jyqfcSAs',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

// Auto-run on server startup: connect + add column
client.connect()
    .then(async () => {
        console.log('✅ Connected to PostgreSQL');

        await client.query(`
            ALTER TABLE netflix_shows
            ADD COLUMN IF NOT EXISTS poster_url TEXT;
        `);

        console.log('✅ poster_url column ensured in DB');
    })
    .catch(err => console.error('❌ Connection error:', err.stack));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'movie-website/src')));

// OMDb Helper Config
const OMDB_API_KEY = '9d1f92fe'; // Replace with your valid key

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getPosterUrl(title) {
    const searchUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`;

    try {
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();

        if (searchData.Response === "True" && searchData.Search.length > 0) {
            const firstMatch = searchData.Search[0];

            // Now fetch full movie details for poster
            const detailUrl = `https://www.omdbapi.com/?i=${firstMatch.imdbID}&apikey=${OMDB_API_KEY}`;
            const detailRes = await fetch(detailUrl);
            const detailData = await detailRes.json();

            if (detailData.Response === "True" && detailData.Poster && detailData.Poster !== 'N/A') {
                return detailData.Poster;
            }
        } else {
            console.log(`⚠️ No OMDb search match for "${title}"`);
        }
    } catch (err) {
        console.error(`❌ OMDb fetch error for "${title}":`, err.message);
    }

    return null;
}

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

// Search by title (auto-fetch poster + save to DB)
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

        const moviesWithPosters = [];

        for (const movie of result.rows) {
            let poster = movie.poster_url;

            if (!poster) {
                await sleep(1000); // throttle per OMDb rate limit
                poster = await getPosterUrl(movie.title);

                if (poster) {
                    await client.query(
                        'UPDATE netflix_shows SET poster_url = $1 WHERE show_id = $2',
                        [poster, movie.show_id]
                    );
                }
            }

            moviesWithPosters.push({
                ...movie,
                poster_url: poster
            });
        }

        res.json(moviesWithPosters);

    } catch (err) {
        console.error('❌ Error in search:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Fallback route
app.get(/^\/(?!api|netflix).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'movie-website/src/index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});




