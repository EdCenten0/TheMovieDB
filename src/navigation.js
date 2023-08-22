import {
  getTrendingMoviesPreview,
  getCategoriesPreview,
  getMoviesByCategory,
  getMoviesBySearch,
  getTrendingMovies,
  getMovieById,
  getPaginatedTrendingMovies,
} from "./main.js";

export let page = 1;
let infiniteScroll;

function navigator() {
  console.log({ location });

  if (infiniteScroll) {
    window.removeEventListener("scroll", infinteScroll);
    infinteScroll = undefined;
  }
  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage();
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage();
  } else {
    homePage();
  }

  if (infiniteScroll) {
    window.addEventListener("scroll", infiniteScroll, { passive: false });
  }
}

function trendsPage() {
  console.log("Trends");
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  headerCategoryTitle.innerHTML = "Tendencias";
  getTrendingMovies();

  // Makes dynamic function call
  infiniteScroll = getPaginatedTrendingMovies;
}
function searchPage() {
  console.log("Searching");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  let [search, query] = location.hash.split("=");
  getMoviesBySearch(query);
}
function movieDetailsPage() {
  console.log("MovieDetails");

  headerSection.classList.add("header-container--long");
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");

  let [_, movieId] = location.hash.split("=");

  getMovieById(movieId);
}
function categoriesPage() {
  console.log("Categories");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  let [_, categoryData] = location.hash.split("=");
  let [categoryId, categoryName] = categoryData.split("-");

  let decodedName = decodeURI(categoryName);

  headerCategoryTitle.innerHTML = decodedName;

  getMoviesByCategory(categoryId);
}
function homePage() {
  console.log("Home");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.add("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.remove("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");
  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  getTrendingMoviesPreview();
  getCategoriesPreview();
}

searchFormBtn.addEventListener("click", () => {
  location.hash = "#search=" + searchFormInput.value;
});
trendingBtn.addEventListener("click", () => {
  location.hash = "#trends";
});
arrowBtn.addEventListener("click", () => {
  history.back();
  location.hash = "#home";
});

window.addEventListener("hashchange", navigator, false);
window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("click", infiniteScroll);
