import {
  db,
  getDatas,
  addDatas,
  deleteDatas,
  updateDatas,
  getUserPlans,
} from "./DLU_firebase.js";

const planListBox = document.getElementById("planListBox");
// const navPlannerBox = document.getElementById("nav-planner");

async function plannerTitleName() {
  const planSnapshot = await getUserPlans("plan", "2024-06-18", "asdqwe1");
  planSnapshot.forEach((doc) => {
    // console.log(doc.data());
  });
  const data = await getDatas("plan");
  data.forEach((doc) => {
    // console.log(doc.data());
    // const info = doc.data();
    // let { addr, age, email, gender, tel } = doc.data();
    planListBox.insertAdjacentHTML(
      "afterbegin",
      `<h4>${doc.data().userId}님의 Planner</h4>`
    );
    // navPlannerBox.insertAdjacentHTML(
    //   "afterbegin",
    //   `<div class="day1">${doc.data().date}</div>`
    // );
  });
}
// console.log(plannerTitleName());
plannerTitleName();

// const navPlanner = document.getElementById("nav-planner");

// async function plannerTitleDate() {
//   const data = await getDatas("date");
//   data.forEach((doc) => {
//     const info = doc.data();
//     // let { firstDay, firstMonth, firstYear, lastDay, lastMonth, lastYear } = doc.data();
//     navPlanner.insertAdjacentHTML(
//       "afterbegin",
//       `<div>${info.firstYear}. ${info.firstMonth}. ${info.firstDay}</div>`
//     );
//   });
// }
// plannerTitleDate();
// console.log(plannerTitleName());

const cancelBtn = document.querySelectorAll(`.bx-x`);
console.log(cancelBtn);

cancelBtn.forEach((e) => {
  console.log(e);
  e.addEventListener("click", (el) => {
    el.target.parentElement.remove();
  });
});

const changeSize = document.querySelector(".chageSize");
const plannerBoxTag = document.querySelector(".plannerBox");
const sizeBtn = document.querySelector(".changeSizeBtn");
const sizeDownBtn = document.querySelector(".bx-chevrons-down");

const calendarTag = document.querySelector(".calendar-planner");
console.log(sizeDownBtn);

sizeBtn.addEventListener("click", () => {
  const sizeUpBtn = document.querySelector(".bx-chevrons-up");
  sizeDownBtn.classList.toggle("bx-chevrons-down");
  sizeDownBtn.classList.toggle("bx-chevrons-up");
  if (sizeUpBtn == null) {
    plannerBoxTag.classList.add("small");

    calendarTag.classList.add("hidden");
  } else if (sizeUpBtn != null) {
    plannerBoxTag.classList.remove("small");
  }
});
// sizeBtn.addEventListener("click", () => {
//   plannerBoxTag.classList.remove("small");
//   sizeUpBtn.addEventListener("click", () => {});
// });
