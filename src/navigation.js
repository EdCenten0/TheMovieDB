import {
  getTrendingMoviesPreview,
  getCategoriesPreview,
  getMoviesByCategory,
  getMoviesBySearch,
  getTrendingMovies,
  getMovieById,
  getPaginatedTrendingMovies,
  getPaginatedMoviesBySearch,
  getPaginatedMoviesByCategory,
  getLikedMovies,
} from "./main.js";

export let maxPage;
export let page = 1;
let infiniteScroll;
let currentLanguage;
const languagesTemplates = {
  es: {
    searchLabel: "Vengadores",
    trending: "Tendencias",
    trendingBtn: "Ver más",
    categories: "Categorias",
    favoriteMovies: "Peliculas Favoritas",
    similarMovies: "Peliculas Similares",
    footer: "Hecho con amor por @juandc",
  },
  en: {
    searchLabel: "Avengers",
    trending: "Trending",
    trendingBtn: "More",
    categories: "Categories",
    favoriteMovies: "Favorite Movies",
    similarMovies: "Similar Movies",
    footer: "Made with Love By @juandc",
  },
  de: {
    searchLabel: "Avengers",
    trending: "Trends",
    trendingBtn: "Mehr sehen",
    categories: "Kategorien",
    favoriteMovies: "Lieblingsfilme",
    similarMovies: "Ähnliche Filme",
    footer: "Mit Liebe gemacht von @juandc",
  },
  fr: {
    searchLabel: "Avengers",
    trending: "Les tendances",
    trendingBtn: "Voir plus",
    categories: "Catégories",
    favoriteMovies: "Films préférés",
    similarMovies: "Films similaires",
    footer: "Fait avec amour par @juandc",
  },
};

searchFormBtn.addEventListener("click", () => {
  location.hash = "#search=" + searchFormInput.value;
});

trendingBtn.addEventListener("click", () => {
  location.hash = "#trends";
});

arrowBtn.addEventListener("click", () => {
  history.back();
  // location.hash = '#home';
});

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);
window.addEventListener("hashchange", changeUiLanguage);
window.addEventListener("scroll", infiniteScroll, false);
selectLanguageBtn.addEventListener("click", () => {
  languagesBox.classList.toggle("inactive");
});

function navigator() {
  console.log({ location });

  if (infiniteScroll) {
    window.removeEventListener("scroll", infiniteScroll, { passive: false });
    infiniteScroll = undefined;
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

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  if (infiniteScroll) {
    window.addEventListener("scroll", infiniteScroll, { passive: false });
  }
}

function homePage() {
  console.log("Home!!");

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
  likedMoviesSection.classList.remove("inactive");
  selectLanguageContainer.classList.remove("inactive");

  getTrendingMoviesPreview();
  getCategoriesPreview();
  getLikedMovies();
  selectedLanguage();
}

function categoriesPage() {
  console.log("categories!!");

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
  likedMoviesSection.classList.add("inactive");
  selectLanguageContainer.classList.add("inactive");

  // ['#category', 'id-name']
  const [_, categoryData] = location.hash.split("=");
  const [categoryId, categoryName] = categoryData.split("-");

  headerCategoryTitle.innerHTML = categoryName;

  getMoviesByCategory(categoryId);

  infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}

function movieDetailsPage() {
  console.log("Movie!!");

  headerSection.classList.add("header-container--long");
  // headerSection.style.background = '';
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");
  likedMoviesSection.classList.add("inactive");
  selectLanguageContainer.classList.add("inactive");

  // ['#movie', '234567']
  const [_, movieId] = location.hash.split("=");
  getMovieById(movieId);
}

function searchPage() {
  console.log("Search!!");

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
  likedMoviesSection.classList.add("inactive");
  selectLanguageContainer.classList.add("inactive");

  // ['#search', 'platzi']
  const [_, query] = location.hash.split("=");
  getMoviesBySearch(query);

  infiniteScroll = getPaginatedMoviesBySearch(query);
}

function trendsPage() {
  console.log("TRENDS!!");

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
  likedMoviesSection.classList.add("inactive");
  selectLanguageContainer.classList.add("inactive");

  headerCategoryTitle.innerHTML = "Tendencias";

  getTrendingMovies();

  infiniteScroll = getPaginatedTrendingMovies;
}

//Languages

async function changeUiLanguage() {
  if (location.hash.startsWith("#trends")) {
    changeUiLanguageTrends(currentLanguage);
  } else if (location.hash.startsWith("#search=")) {
    console.log("Search if");
    changeUiLanguageSearch(currentLanguage);
  } else if (location.hash.startsWith("#movie=")) {
  } else if (location.hash.startsWith("#category=")) {
  } else {
    changeUiLanguageHome(currentLanguage);
  }
}

export function selectedLanguage() {
  const languageOptions = document.querySelectorAll(".language-option");
  languageOptions.forEach((option) => {
    option.addEventListener("click", () => {
      languagesBox.classList.add("inactive");
      let language = option.id;
      currentLanguage = language;
      changeUiLanguage();
    });
  });
}

function changeUiLanguageHome(language) {
  console.log("ChangeUI: " + language);
  try {
    searchFormInput.setAttribute(
      "placeholder",
      languagesTemplates[language].searchLabel
    );
    trendingTitle.innerHTML = languagesTemplates[language].trending;
    categoriesPreviewTitle.innerHTML = languagesTemplates[language].categories;
    trendingBtn.innerHTML = languagesTemplates[language].trendingBtn;
    favoritesMoviesTitle.innerHTML =
      languagesTemplates[language].favoriteMovies;
    footer.innerText = languagesTemplates[language].footer;
  } catch (err) {
    console.log("Error con el idioma: " + err);
  }

  console.log("Current language: " + currentLanguage);
}

function changeUiLanguageTrends(language) {
  headerCategoryTitle.innerHTML = languagesTemplates[language].trending;
  footer.innerText = languagesTemplates[language].footer;
}

function changeUiLanguageSearch(language) {
  searchFormInput.setAttribute(
    "placeholder",
    languagesTemplates[language].searchLabel
  );
  footer.innerText = languagesTemplates[language].footer;
}

// function change
