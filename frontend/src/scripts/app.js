// set base url for fetch requests to port 3000
const BASE_URL = 'http://localhost:3000';

// Render movie cards
function renderMovies(movieList) {
    const container = document.querySelector('.movies');
    container.innerHTML = '';
    if (!movieList.length) {
        container.innerHTML = '<p>No movies found.</p>';
        return;
    }

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

    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showDetails(movieList[btn.dataset.idx]);
        });
    });
}

// Show movie details in modal
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
    content.querySelector('.close-btn').onclick = () => modal.style.display = 'none';
    modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
}

// Render top-rated movie table
function renderTopRatedTable(movieList) {
    const tbody = document.querySelector('#topRatedTable tbody');
    tbody.innerHTML = '';
    if (!movieList.length) {
        tbody.innerHTML = '<tr><td colspan="6">No movies found.</td></tr>';
        return;
    }

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

    document.querySelectorAll('.movie-title-link').forEach(link => {
        link.addEventListener('click', () => {
            showDetails(movieList[link.dataset.idx]);
        });
    });
}

// 🔎 Search and fetch from backend
async function searchAndRender(query, renderFunction) {
    if (!query.trim()) {
        renderFunction([]); // Clear results if input is empty
        return;
    }

    try {
        const response = await fetch(BASE_URL + `/netflix/${encodeURIComponent(query)}`);
        const data = await response.json();

        if (Array.isArray(data)) {
            const formatted = data.map(movie => ({
                title: movie.title,
                year: movie.release_year,
                genre: movie.listed_in || movie.genre || 'Unknown',
                director: movie.director || 'Unknown',
                description: movie.description || 'No description available.',
                rating: movie.rating || 'NR',
                poster: movie.poster || 'https://via.placeholder.com/200x300?text=No+Image'
            }));
            renderFunction(formatted);
        } else {
            renderFunction([]);
        }
    } catch (err) {
        console.error('Search error:', err);
        renderFunction([]);
    }
}

// 🚀 Initialize app
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.hero input');
    const isTopRatedPage = !!document.querySelector('#topRatedTable');

    if (isTopRatedPage) {
        // Top Rated Page
        searchInput.addEventListener('input', () => {
            const query = searchInput.value;
            searchAndRender(query, renderTopRatedTable);
        });
    } else {
        // Home or Featured Page
        searchInput.addEventListener('input', () => {
            const query = searchInput.value;
            searchAndRender(query, renderMovies);
        });
    }
});
