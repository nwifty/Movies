import React from 'react';

const MovieList = ({ movies }) => {
    return (
        <div className="movie-list">
            {movies.map(movie => (
                <div key={movie.id} className="movie-item">
                    <h3>{movie.title}</h3>
                    <p>{movie.description}</p>
                </div>
            ))}
        </div>
    );
};

export default MovieList;