


# Movie Wikipedia

Movie Wikipedia is a full-stack web application for browsing, searching, and viewing details about movies and TV shows. It features a modern, responsive UI and a RESTful backend API. The project uses Node.js, Express, PostgreSQL, and vanilla JS/HTML/CSS for the frontend, with Docker support for easy deployment and Playwright for end-to-end testing.

## Group Members
- Lin Hao Weng
- Muhammad Syazwan Bin Mohamad Seman
- Magtira Jan Gabriel Luistro
- Joshua Man Kwan Ting
- Neale Tham Geng Chen

## Project Structure
```
Movies/
├── backend/           # Node.js + Express backend
├── db/                # Database files (PostgreSQL, SQL scripts)
├── frontend/          # Frontend (HTML, CSS, JS)
├── tests/             # Playwright end-to-end tests
├── docker-compose.yml # Docker Compose setup
├── package.json       # Project scripts and dependencies
└── ...
```



## Features


## Features
- Browse featured and top-rated movies
- Search for movies by title, genre, or director
- View detailed information in a modal
- Responsive, modern metallic-glass UI
- RESTful API for movie data (Node.js + PostgreSQL)
- Automated end-to-end testing with Playwright



## Getting Started

### Prerequisites
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (for running tests locally)

### Running the App Locally
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd Movies
    ```
2. Start all services (frontend, backend, db) using Docker Compose:
    ```bash
    docker-compose up --build
    ```
3. Access the frontend at [http://localhost:8080](http://localhost:8080)

### Running End-to-End Tests
1. Install dependencies:
    ```bash
    npm install
    ```
2. Run the automated test (this will start Docker Compose, wait for the site, and run Playwright):
    ```bash
    npm run test:e2e
    ```

## Continuous Integration (CI)
- GitHub Actions is configured to automatically build the app and run Playwright tests on every push or pull request to `main`.
- See `.github/workflows/playwright.yml` for details.


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


### End-to-End (E2E) Tests
- Playwright tests are in the `tests/` directory.
- To run all E2E tests (with Docker Compose auto-start):
    ```bash
    npm run test:e2e
    ```


## Docker

Docker Compose sets up backend, frontend, and PostgreSQL database. See `docker-compose.yml` for details.


## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)
