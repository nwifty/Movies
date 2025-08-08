const { Client } = require('pg');

// PostgreSQL connection
const client = new Client({
    user: 'movie_postgresql_user',
    host: 'dpg-d29g1pili9vc73fmen3g-a.singapore-postgres.render.com',
    database: 'movie_postgresql',
    password: '9FJzzWOCTW0w1TQPx0nQsOc5jyqfcSAs',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

async function addPosterColumn() {
    try {
        await client.connect();
        console.log('Connected to database ✅');

        const alterQuery = `
            ALTER TABLE netflix_shows
            ADD COLUMN IF NOT EXISTS poster_url TEXT;
        `;

        await client.query(alterQuery);
        console.log('✅ poster_url column added (if not already present)');

    } catch (err) {
        console.error('❌ Error adding column:', err.message);
    } finally {
        await client.end();
    }
}

addPosterColumn();