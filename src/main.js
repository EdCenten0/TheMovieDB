import { API_KEY } from "./secrets.js";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});

// Utils
const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute("data-img");
      entry.target.setAttribute("src", url);
    }
  });
});

function createMovies(movies, container, lazyLoad = false) {
  container.innerHTML = "";

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");
    movieContainer.addEventListener("click", () => {
      location.hash = "movie=" + movie.id;
    });

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      lazyLoad ? "data-img" : "src",
      `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
    );

    movieImg.addEventListener("error", () => {
      movieImg.setAttribute(
        "src",
        "https://static.vecteezy.com/system/resources/thumbnails/003/678/259/small/triangle-caution-yellow-sign-icon-free-vector.jpg"
      );
    });

    if (lazyLoad) {
      lazyLoader.observe(movieImg);
    }

    movieContainer.appendChild(movieImg);

    container.appendChild(movieContainer);
  });
}

function createCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.setAttribute("id", `id${category.id}`);
    categoryTitle.addEventListener("click", () => {
      location.hash = "category=" + category.id + "-" + category.name;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

export async function getTrendingMoviesPreview() {
  const { data } = await api("trending/movie/day");

  trendingMoviesPreviewList.innerHTML = "";
  const movies = data.results;

  createMovies(movies, trendingMoviesPreviewList, true);
  console.log({ data, movies });
}

export async function getCategoriesPreview() {
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY
  );
  const data = await res.json();
  // categoriesPreviewList.innerHTML = "";
  const categories = data.genres;
  createCategories(categories, categoriesPreviewList);
}

export async function getMoviesByCategory(id) {
  const { data } = await api("discover/movie", {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;
  createMovies(movies, genericSection, true);
  console.log({ data, movies });
}

export async function getMoviesBySearch(query) {
  const { data } = await api("search/movie", {
    params: {
      query,
    },
  });
  const movies = data.results;
  createMovies(movies, genericSection);
  console.log({ data, movies });
}

export async function getTrendingMovies() {
  const { data } = await api("trending/movie/day");

  trendingMoviesPreviewList.innerHTML = "";
  const movies = data.results;

  createMovies(movies, genericSection);
  console.log({ data, movies });
}

export async function getMovieById(id) {
  const { data: movie } = await api("movie/" + id);

  const movieImgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  headerSection.style.background = `
  linear-gradient(
    180deg, 
    rgba(0, 0, 0, 0.35) 19.27%, 
    rgba(0, 0, 0, 0) 29.17%
    ),
  url(${movieImgUrl})`;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  createCategories(movie.genres, movieDetailCategoriesList);
  getRelatedMoviesId(id);
}

async function getRelatedMoviesId(id) {
  const { data: movie } = await api("movie/" + id + "/similar");
  const relatedMovies = movie.results;

  createMovies(relatedMovies, relatedMoviesContainer);
}
