const indexListChart = document.querySelector(".index-list-chart");
const indexListArtist = document.querySelector(".index-list-artist");
const indexListGenre = document.querySelector(".index-list-genre");
const indexListMyBox = document.querySelector(".index-list-myBox");

// index와 content 연결
const indexChartSection = document.querySelector(".index-chart");
const indexArtistSection = document.querySelector(".index-artists");
const indexGenreSection = document.querySelector(".index-genre");
const indexMyBoxSection = document.querySelector(".index-myBox");
indexListChart.addEventListener("click", () => {
  indexChartSection.classList.toggle("hidden");
  indexArtistSection.classList.add("hidden");
  indexGenreSection.classList.add("hidden");
  indexMyBoxSection.classList.add("hidden");
});
indexListArtist.addEventListener("click", () => {
  indexChartSection.classList.add("hidden");
  indexArtistSection.classList.toggle("hidden");
  indexGenreSection.classList.add("hidden");
  indexMyBoxSection.classList.add("hidden");
});
indexListGenre.addEventListener("click", () => {
  indexChartSection.classList.add("hidden");
  indexArtistSection.classList.add("hidden");
  indexGenreSection.classList.toggle("hidden");
  indexMyBoxSection.classList.add("hidden");
});
indexListMyBox.addEventListener("click", () => {
  indexChartSection.classList.add("hidden");
  indexArtistSection.classList.add("hidden");
  indexGenreSection.classList.add("hidden");
  indexMyBoxSection.classList.toggle("hidden");
});
