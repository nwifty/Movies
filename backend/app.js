const express = require('express');
const app = express();
const port = 3000;
const { Pool } = require('pg');

// DB Config
let pool
if (!process.env.DATABASE_URL) {
    pool = new Pool({
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || '127.0.0.1', 
        database: process.env.DB_DATABASE || 'tdp',
        password: process.env.DB_PASSWORD || 'postgres',
        port: process.env.DB_PORT || 5432,
        ssl: process.env.DB_SSL === 'true' ? true : false,
    });
} else {
    // For production environments like Vercel
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}

// Middleware
app.use(express.json());
// log all req
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`); 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
// ROUTES
app.get('/api/movies/:show_id', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM netflix_shows WHERE show_id = $1',
            [req.params.show_id]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

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
        const result = await pool.query(`
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

app.get('/netflix/:title', async (req, res) => {
    const searchTerm = `%${req.params.title}%`;

    try {
        const result = await pool.query(
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

// Start server
app.listen(port, () => {
    console.log(`🚀 API server running at http://localhost:${port}`);
});
