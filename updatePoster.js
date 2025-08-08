const { Client } = require('pg');

async function updatePoster() {
  const client = new Client({
    user: 'movie_postgresql_user',
    host: 'dpg-d29g1pili9vc73fmen3g-a.singapore-postgres.render.com',
    database: 'movie_postgresql',
    password: '9FJzzWOCTW0w1TQPx0nQsOc5jyqfcSAs',
    port: 5432,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();

    const posterUrl = "https://m.media-amazon.com/images/M/MV5BNTBiYWJlMjQtOTIyMy00NTY4LWFhOWItOWZhNzc3NGMyMjc2XkEyXkFqcGc@._V1_SX300.jpg";
    const showId = 's8808';

    const updateQuery = `
      UPDATE netflix_shows
      SET poster_url = $1
      WHERE show_id = $2
      RETURNING *;
    `;

    const res = await client.query(updateQuery, [posterUrl, showId]);

    if (res.rowCount === 0) {
      console.log('No movie found with show_id:', showId);
    } else {
      console.log('Updated movie:', res.rows[0]);
    }

  } catch (err) {
    console.error('Error updating poster URL:', err);
  } finally {
    await client.end();
  }
}

updatePoster();
