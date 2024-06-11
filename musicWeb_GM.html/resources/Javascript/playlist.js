const playBtn = document.querySelector(`#playBtn`);

playBtn.addEventListener(`click`, () => {
  playBtn.classList.toggle(`bx-play`);
  playBtn.classList.toggle(`bx-pause`);
});

const chageSizeBtn = document.getElementById("sizeBtn");
const playlistImgTag = document.getElementById(`playlist-img`);
chageSizeBtn.addEventListener(`click`, () => {
  playlistImgTag.classList.toggle(`hidden`);
  // playlistImgTag.classList.toggle(`smaller`);
});
