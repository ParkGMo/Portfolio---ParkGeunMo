import {
  db,
  getDatas,
  addDatas,
  deleteDatas,
  updateDatas,
} from "./DLU_firebase.js";
const currentMonthYear = document.getElementById("currentMonthYear-planner");
const daysContainer = document.getElementById("days-planner");
const navPlannerBox = document.getElementById("nav-planner");
const day1Tag = document.querySelector(".day1");
const calendarTag = document.querySelector(".calendar-planner");
let currentDatePlan = new Date();

function renderCalendar() {
  const year = currentDatePlan.getFullYear();
  const month = currentDatePlan.getMonth();
  const day = currentDatePlan.getDate();
  const week = currentDatePlan.getDay();
  const weekArr = ["일", "월", "화", "수", "목", "금", "토"];
  // const weekArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  currentMonthYear.innerText = `${year}년 ${month + 1}월`;
  day1Tag.innerHTML = `${year}.${month + 1}.${day} (${weekArr[week]})`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  daysContainer.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    daysContainer.appendChild(emptyCell);
  }

  for (let i = 1; i <= lastDate; i++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("dayItem");
    dayCell.innerText = i;
    dayCell.addEventListener("click", (e) => {
      const selected = document.querySelector(".days-planner .selected");
      if (selected) {
        selected.classList.remove("selected");
      }
      dayCell.classList.add("selected");
      const selectedDiv = document.querySelector(".selected");
      let selectedDate = new Date(
        `${year}/${month + 1}/${selectedDiv.innerHTML}`
      );
      const selectedWeek = selectedDate.getDay();
      day1Tag.innerHTML = `${year}.${month + 1}.${selectedDiv.innerHTML} (${
        weekArr[selectedWeek]
      })`;
    });
    const dayTag = document.querySelectorAll(".dayItem");
    dayTag.forEach((e) => {
      e.addEventListener("click", () => {
        calendarTag.classList.add("hidden");
      });
    });
    daysContainer.appendChild(dayCell);
  }
}

day1Tag.addEventListener("click", () => {
  calendarTag.classList.toggle("hidden");
});
document.getElementById("prevMonth-planner").addEventListener("click", () => {
  currentDatePlan.setMonth(currentDatePlan.getMonth() - 1);
  renderCalendar();
});

document.getElementById("nextMonth-planner").addEventListener("click", () => {
  currentDatePlan.setMonth(currentDatePlan.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
