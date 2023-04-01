const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=`;

const moviesContainer = document.querySelector(".movies-container");
const searchForm = document.querySelector(".form");
const searchInput = document.querySelector(".input");
const searchButton = document.querySelector(".button");

fetchMovies(API_URL);

searchButton.addEventListener("click", () => {
  const query = searchInput.value;
  if (query) {
    const url = `${SEARCH_URL}${query}`;
    fetchMovies(url);
  }
});

async function fetchMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const movies = data.results;
    renderMovies(movies);
  } catch (error) {
    console.log(error);
  }
}

function renderMovies(movies) {
  moviesContainer.innerHTML = "";
  movies.forEach((movie) => {
    const { poster_path, title, overview, vote_average } = movie;
    const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
      <img src="${imageUrl}" alt="${title}">
      <div class="overlay">
        <h3>${title}</h3>
        <p>Rating: ${vote_average}</p>
        <p>${overview}</p>
      </div>
    `;
    moviesContainer.appendChild(movieElement);
  });
}
