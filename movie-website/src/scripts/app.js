// This file handles the dynamic behavior of the movie website, including fetching movie data and updating the DOM.

document.addEventListener('DOMContentLoaded', () => {
    const movieListElement = document.getElementById('movie-list');

    const fetchMovies = async () => {
        try {
            const response = await fetch('https://api.example.com/movies'); // Replace with actual API endpoint
            const movies = await response.json();
            renderMovies(movies);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const renderMovies = (movies) => {
        movieListElement.innerHTML = '';
        movies.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            movieItem.innerHTML = `
                <h3>${movie.title}</h3>
                <p>${movie.description}</p>
            `;
            movieListElement.appendChild(movieItem);
        });
    };

    fetchMovies();
});