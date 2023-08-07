function navigator() {
  console.log({ location });
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

  location.hash;
}

function trendsPage() {
  console.log("Trends");
}
function searchPage() {
  console.log("Searching");
}
function movieDetailsPage() {
  console.log("MovieDetails");
}
function categoriesPage() {
  console.log("Categories");
}
function homePage() {
  console.log("Home");
  getTrendingMoviesPreview();
  getCategoriesPreview();
}

window.addEventListener("hashchange", navigator, false);
window.addEventListener("DOMContentLoaded", navigator, false);
