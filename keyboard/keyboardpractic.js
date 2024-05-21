const inputTag = document.querySelector("#my-input");
const keyTag = document.querySelector("#key");
const codeTag = document.querySelector("#code");
const keypress = document.querySelector("#keypress");
const keydown = document.querySelector("#keydown");
const keyup = document.querySelector("#keyup");
inputTag.focus();

function keypressEvent(e) {
  //   console.log(`key : ${e.key}, code : ${e.code}`);
  keypress.classList.add("on");
  setTimeout(function () {
    keypress.classList.remove("on");
  }, 300);
}
function keydownEvent(e) {
  //   console.log(`key : ${e.key}, code : ${e.code}`);
  const el = document.querySelector(`#${e.code}`);
  codeTag.innerHTML = `key : ${e.code}`;
  keyTag.innerHTML = `code : ${e.key}`;
  colorArr = [];
  for (let i = 0; i < 3; i++) {
    colorArr.push(parseInt(Math.random() * 256));
  }
  el.style.setProperty("--font-color", `rgb(${colorArr})`);
  el.classList.add("btnon");
  keydown.classList.add("on");
  setTimeout(function () {
    keydown.classList.remove("on");
  }, 300);
}
function keyupEvent(e) {
  //   console.log(`key : ${e.key}, code : ${e.code}`);
  const el = document.querySelector(`#${e.code}`);
  el.classList.remove("btnon");
  keyup.classList.add("on");
  setTimeout(function () {
    keyup.classList.remove("on");
  }, 300);
}

inputTag.addEventListener("keypress", keypressEvent);
inputTag.addEventListener("keydown", keydownEvent);
inputTag.addEventListener("keyup", keyupEvent);
