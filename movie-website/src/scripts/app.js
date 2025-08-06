// Sample movie data
const movies = [
    {
        title: "Inception",
        year: 2010,
        rating: 8.8,
        genre: "Sci-Fi",
        poster: "https://64.media.tumblr.com/tumblr_mbgpa7nxxm1rgvhcro1_1280.jpg",
        description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
        director: "Christopher Nolan"
    },
    {
        title: "The Shawshank Redemption",
        year: 1994,
        rating: 9.3,
        genre: "Drama",
        poster: "https://i.pinimg.com/736x/f5/2f/65/f52f652fb6aa030d95cd875eeb334f81.jpg",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        director: "Frank Darabont"
    },
    {
        title: "Interstellar",
        year: 2014,
        rating: 8.6,
        genre: "Adventure, Drama, Sci-Fi",
        poster: "https://i.ebayimg.com/images/g/toMAAOSwxvxW7d-~/s-l1200.jpg",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        director: "Christopher Nolan"
    }
];

    // Example top rated movies data
    const topRatedMovies = [
        {
            title: "The Shawshank Redemption",
            year: 1994,
            rating: 9.3,
            genre: "Drama",
            poster: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg",
            description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            director: "Frank Darabont"
        },
        {
            title: "The Godfather",
            year: 1972,
            rating: 9.2,
            genre: "Crime, Drama",
            poster: "https://m.media-amazon.com/images/I/41+eK8zBwQL._AC_.jpg",
            description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
            director: "Francis Ford Coppola"
        },
        {
            title: "The Dark Knight",
            year: 2008,
            rating: 9.0,
            genre: "Action, Crime, Drama",
            poster: "https://assets.gqindia.com/photos/5cdc19cd54004319c73c4e01/16:9/w_2560%2Cc_limit/Batman-movie.jpg",
            description: "When the menace known as the Joker emerges, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            director: "Christopher Nolan"
        },
        {
            title: "12 Angry Men",
            year: 1957,
            rating: 9.0,
            genre: "Drama",
            poster: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2013/11/04/14/12angrymnen.jpg",
            description: "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
            director: "Sidney Lumet"
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


    function renderTopRatedTable(movieList) {
        const tbody = document.querySelector('#topRatedTable tbody');
        tbody.innerHTML = '';
        movieList.forEach((movie, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${movie.poster}" alt="${movie.title}"></td>
                <td><span class="movie-title-link" data-idx="${idx}">${movie.title}</span></td>
                <td>${movie.year}</td>
                <td>${movie.genre}</td>
                <td>${movie.director}</td>
                <td>⭐ ${movie.rating}</td>
            `;
            tbody.appendChild(tr);
        });
        // Add click event for details modal
        document.querySelectorAll('.movie-title-link').forEach(link => {
            link.addEventListener('click', (e) => {
                showDetails(movieList[link.dataset.idx]);
            });
        });
    }

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
            <p><strong>Rating:</strong> ⭐ ${movie.rating}</p>
            <p>${movie.description}</p>
            <div style="clear:both;"></div>
        `;
        content.querySelector('.close-btn').onclick = () => {
            modal.style.display = 'none';
        };
        modal.onclick = (e) => {
            if (e.target === modal) modal.style.display = 'none';
        };
    }

    document.addEventListener('DOMContentLoaded', () => {
        renderTopRatedTable(topRatedMovies);
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const filtered = topRatedMovies.filter(m =>
                m.title.toLowerCase().includes(query) ||
                m.genre.toLowerCase().includes(query) ||
                m.director.toLowerCase().includes(query)
            );
            renderTopRatedTable(filtered);
        });
    });
