
# Moviepedia Project

Moviepedia is a full-stack web application for browsing, searching, and viewing details about movies and TV shows. It features a modern, responsive UI and a RESTful backend API. The project uses Node.js, Express, PostgreSQL, and vanilla JS/HTML/CSS for the frontend, with Docker support for easy deployment.

## Group Members
- Lin Hao Weng
- Muhammad Syazwan Bin Mohamad Seman
- Magtira Jan Gabriel Luistro
- Joshua Man Kwan Ting
- Neale Tham Geng Chen
  
## Project Structure

```
.
├── .gitignore
├── README.md                  # Project documentation
├── docker-compose.yml
├── backend/
| └── app.js
| └── package.json           # Backend npm configuration
| └── Dockerfile
|
├── db/
| └── netflix.sql 
|
└── frontend/
    ├── package.json           # Frontend npm configuration
    └── src/
        ├── index.html         # Home page
        ├── featured.html      # Featured movies page
        ├── top-rated.html     # Top rated movies page
        ├── about.html         # About page
        ├── styles/
        │   └── main.css       # Main stylesheet
        ├── scripts/
        │   └── app.js         # Main JavaScript logic
        └── components/
            └── MovieList.js   # (React) Movie list component
```


## Features

### Frontend
- Browse featured and top-rated movies
- Search movies by title, genre, or director
- View detailed information in a modal
- Responsive, modern metallic-glass UI
- Pages: Home, Featured, Top Rated, About

### Backend
- RESTful API for movie data
- PostgreSQL database integration
- Endpoints for searching, fetching by ID, and adding movies

### Database
- PostgreSQL table: `netflix_shows` (see `db/netflix.sql`)


## Getting Started

### 1. Clone the repository
```sh
git clone <repository-url>
cd Movies
```

### 2. Using Docker (recommended)
```sh
docker-compose up --build
```
This will start the backend (port 3000), frontend (port 8080), and PostgreSQL database (port 5432).

### 3. Manual setup (without Docker)

#### Backend
```sh
cd backend
npm install
node app.js
```
Backend runs at `http://localhost:3000`.

#### Frontend
```sh
cd frontend
npm install
npm start
```
Frontend runs at `http://localhost:8080`.

#### Database
Import the schema from `db/netflix.sql` into your PostgreSQL instance.

### 4. Open the website
Visit `http://localhost:8080` for the frontend UI, or `http://localhost:3000` for the backend API.


## API Endpoints

- `GET /api/movies/:show_id` — Fetch movie by ID
- `POST /api/movies` — Add a new movie
- `GET /netflix/:title` — Search movies by title (partial match)

See [`backend/app.js`](backend/app.js) for implementation details.


## Database Schema

The main table is `netflix_shows`:
```sql
CREATE TABLE public.netflix_shows (
    show_id text NOT NULL,
    type text,
    title text,
    director text,
    cast_members text,
    country text,
    date_added date,
    release_year integer,
    rating text,
    duration text,
    listed_in text,
    description text
);
```
See `db/netflix.sql` for full schema and sample data.


## Testing

### Backend
- Automated tests with Jest and Supertest (`backend/app.test.js`).
- Run tests:
    ```sh
    cd backend
    npm test
    ```

### Frontend
- No automated tests yet. Placeholder script in `frontend/package.json`.

## Docker

Docker Compose sets up backend, frontend, and PostgreSQL database. See `docker-compose.yml` for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT
