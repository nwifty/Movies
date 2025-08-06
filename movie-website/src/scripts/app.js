// Sample movie data
const movies = [
    {
        title: "Inception",
        year: 2010,
        genre: "Sci-Fi",
        poster: "https://m.media-amazon.com/images/S/pv-target-images/e826ebbcc692b4d19059d24125cf23699067ab621c979612fd0ca11ab42a65cb._SX1080_FMjpg_.jpg",
        description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
        director: "Christopher Nolan"
    },
    {
        title: "The Shawshank Redemption",
        year: 1994,
        genre: "Drama",
        poster: "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/11/the-shawshank-redemption-poster.jpg",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        director: "Frank Darabont"
    },
    {
        title: "Interstellar",
        year: 2014,
        genre: "Adventure, Drama, Sci-Fi",
        poster: "https://www.hauweele.net/~gawen/blog/wp-content/uploads/2014/11/interstellar.jpg",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        director: "Christopher Nolan"
    }
];

// Render movie cards
function renderMovies(movieList) {
    const container = document.querySelector('.movies');
    container.innerHTML = '';
    movieList.forEach((movie, idx) => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <div class="movie-info">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-year">${movie.year}</div>
                <div class="movie-genre">${movie.genre}</div>
                <button class="details-btn" data-idx="${idx}">Details</button>
            </div>
        `;
        container.appendChild(card);
    });
    // Add event listeners for details buttons
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            showDetails(movieList[btn.dataset.idx]);
        });
    });
}

// Show movie details in a modal
function showDetails(movie) {
    let modal = document.getElementById('movie-details');
    let content = document.getElementById('modalContent');
    modal.style.display = 'block';
    content.innerHTML = `
        <span class="close-btn" style="float:right;cursor:pointer;font-size:1.5rem;">&times;</span>
        <h2>${movie.title} (${movie.year})</h2>
        <img src="${movie.poster}" alt="${movie.title}" style="width:200px;float:left;margin-right:20px;">
        <p><strong>Genre:</strong> ${movie.genre}</p>
        <p><strong>Director:</strong> ${movie.director}</p>
        <p>${movie.description}</p>
        <div style="clear:both;"></div>
    `;
    content.querySelector('.close-btn').onclick = () => {
        modal.style.display = 'none';
    };
    // Close modal when clicking outside content
    modal.onclick = (e) => {
        if (e.target === modal) modal.style.display = 'none';
    };
}

// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    renderMovies(movies);
    const searchInput = document.querySelector('.hero input');
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const filtered = movies.filter(m =>
            m.title.toLowerCase().includes(query) ||
            m.genre.toLowerCase().includes(query) ||
            m.director.toLowerCase().includes(query)
        );
        renderMovies(filtered);
    });
});