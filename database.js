const express = require('express');
const app = express();
const port = 3000;

const { Client } = require('pg');

    const client = new Client({
        user: 'movie_postgresql_user',
        host: 'dpg-d29g1pili9vc73fmen3g-a.singapore-postgres.render.com',
        database: 'movie_postgresql',
        password: '9FJzzWOCTW0w1TQPx0nQsOc5jyqfcSAs',
        port: 5432, // Default PostgreSQL port
        ssl: {
        rejectUnauthorized: false
        }
    });

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));
    
app.use(express.static('src'));

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

app.use(express.json()); // Add this to parse JSON bodies

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
                show_id, title, director, cast_members, country, date_added, release_year, rating, duration, listed_in, description
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
            RETURNING *;
        `;
        const values = [
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
        ];
        const result = await client.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


