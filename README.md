# Moviepedia Project

A modern movie encyclopedia web application for browsing, searching, and viewing details about movies and TV shows. The project includes a frontend built with HTML, CSS, and JavaScript, and a backend using Node.js, Express, and PostgreSQL.

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

- Browse featured and top-rated movies
- Search movies by title
- View detailed information of each movie
- Responsive, modern metallic-glass UI
- Backend API for movie data (Node.js + PostgreSQL)

## Getting Started

### 1. Clone the repository

```sh
git clone <repository-url>
cd Movies
```

### 1B. Using Docker (OPTIONAL)
```sh
# If using Docker, continue with this step and skip the rest. Else, skip this step.
docker-compose up --build
```

### 2. Install backend dependencies

```sh
npm install
```

### 3. Install frontend dependencies

```sh
cd movie-website
npm install
```

### 4. Run the backend server

```sh
node ../database.js
```

The backend will be available at `http://localhost:3000`.

### 5. Start the frontend (development)

```sh
npm start
```

This uses `live-server` to serve the frontend at `http://127.0.0.1:8080` (or similar).

### 6. Open the website

Visit `http://localhost:3000` or open `movie-website/src/index.html` in your browser.

## API Endpoints

- `GET /api/movies/:show_id` — Fetch movie by ID
- `POST /api/movies` — Add a new movie

See [`database.js`](database.js) for implementation details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT
