// 로고 시작
import {
  db,
  getDatas,
  addDatas,
  deleteDatas,
  updateDatas,
  addFieldToArrayInDocument,
} from "./DLU_firebase.js";
// const jmtTag = document.querySelector(".h-Tag1Span");
// const cafeTag = document.querySelector(".h-Tag2Span");
// const placeTag = document.querySelector(".h-Tag3Span");
// const epliogueTag = document.querySelector(".h-Tag4Span");

// 예시로 함수 호출
// addstoreInfo();

const Logo = document.querySelector(".Logo");
Logo.addEventListener("click", function () {
  location.href = "#";
});
// 로고 끝

// 메인 사진 시작
function chgMainImg() {
  const mainImgArr = [
    "../title/1.jpg",
    "../title/2.jpg",
    "../title/3.jpg",
    "../title/4.jpg",
    "../title/5.jpg",
  ];
  let mainImgIndex = 0;
  const mainImgEl = document.getElementById("backImg");

  setInterval(() => {
    mainImgEl.classList.add("mainImgfadeOut");

    setTimeout(() => {
      mainImgIndex = (mainImgIndex + 1) % mainImgArr.length;
      mainImgEl.src = mainImgArr[mainImgIndex];
      mainImgEl.classList.remove("mainImgfadeOut");
    }, 2000);
  }, 3500);
}
window.onload = chgMainImg;
// 메인 사진 끝

const text = "가장 Hot한 맛집들!";
const middleH1 = document.getElementById("middleH1");

let index = 0;

function displayNextCharacter() {
  if (index < text.length) {
    middleH1.innerText += text[index];
    index++;
  } else {
    index = 0;
    middleH1.innerText = ""; // 기존 텍스트를 지우고 다시 시작
  }
  setTimeout(displayNextCharacter, 300); // 0.5초 간격으로 다음 문자 출력
}

displayNextCharacter();

const datas = await getDatas("store");
let infolist;
let infoinput;
datas.forEach((doc, idx) => {
  const info = doc.data();
  infolist = info.members;
  infoinput = info.input;
});

let infolistArr = infolist.map(function (el) {
  return `${el.name},${el.point}`;
});
let infolistArrsort = infolistArr.sort(function (a, b) {
  let pointA = a.split(",")[1];
  let pointB = b.split(",")[1];
  return pointA - pointB;
});
const sidebarA = document.querySelectorAll(".sidebar-sub");
const infolistSliceArr = infolistArrsort.slice(70, 80);
sidebarA.forEach(function (el, idx) {
  if (idx < infolistSliceArr.length) {
    let infolistEnd = infolistSliceArr[idx].split(",")[0];
    el.insertAdjacentHTML(
      "afterbegin",
      `<a href="#" class="sidebarA"><span class="sideinnerN">${
        idx + 1
      }. </span>  <span class="sideinnerT">${infolistEnd}</span></a>`
    );
  }
});
let infolistArr1 = infolist.map(function (el) {
  return el;
});
let infolistArrsort1 = infolistArr1.sort(function (a, b) {
  let pointC = a.point;
  let pointD = b.point;
  return pointC - pointD;
});
const infolistSliceArr1 = infolistArrsort1.slice(70, 80);
console.log(infolistSliceArr1);
const Mainbox1 = document.querySelector(".Main-box1");
infolistSliceArr1.forEach(function (el, idx) {
  Mainbox1.insertAdjacentHTML(
    "beforeend",
    `
  <div class="box">
  <h1 class="box-h3"><span>#</span>Top${idx + 1}</h1>
            <img
              class="box-img"
              src="../Photo/${el.src}"
            />
            <div class="box-point"><span>평점:</span> ${el.point}</div>
            <div class="box-name">${el.name}</div>
            <div class="box-tag"><span>addr:</span> ${el.addr}</div>
            <div class="box-tag"><span>On.</span>${el.time}</div>
            <div class="box-tag"><span>N. </span>${el.number}</div>
            <div class="box-tag"><span>#</span>${el.category}</div>
          </div>

       `
  );
});

const Searches = document.querySelector(".Search");
const headerInput = document.querySelector(".header-Input");
const result = document.querySelector(".result");
function inputArr(e) {
  console.log(this);
  result.innerHTML = "";
  let inputValue = headerInput.value;
  inputValue = inputValue.replaceAll(" ", "&nbsp;");
  // let changeMessage = inputValue.replaceAll(' ',"&nbsp;")
  if (inputValue === "") return;
  infolist.forEach(function (el, idx) {
    if (
      el.addr.includes(inputValue) ||
      el.category.includes(inputValue) ||
      el.name.includes(inputValue) ||
      el.number.includes(inputValue) ||
      el.point.includes(inputValue) ||
      (el.time.includes(inputValue) && e.code == "Enter")
    ) {
      result.insertAdjacentHTML(
        "beforeend",
        `
                     <div class="box">
                          <img
                            class="box-img"
                            src="../Photo/${idx + 1}.jpg"
                          />
                          <div class="box-point"><span>평점:</span>
                          ${el.point}</div>
                          <div class="box-name">${el.name}</div>
                          <div class="box-tag"><span>addr:</span>${
                            el.addr
                          }</div>
                          <div class="box-tag"><span>On.</span>${el.time}</div>
                          <div class="box-tag"><span>N.</span>${el.number}</div>
                          <div class="box-tag"><span>#</span>${
                            el.category
                          }</div>
                        </div>
                   `
      );
    }
  });

  headerInput.value = "";
}
Searches.addEventListener("click", inputArr);
headerInput.addEventListener("keypress", inputArr);

result.addEventListener("click", (e) => {
  const box = e.target.closest(".box");
  console.log(box);
});
// if (box) {
//   const idx = box.getAttribute("data-idx");
//   const selectedItem = infolist[idx];
// }
let updateTarget;
let nameChild;
let addrChild;
const resturantBoxes = document.querySelector(".resturantBoxes");

const datasPlan = await getDatas("plan");
let planlist;
let memberInfoArr;
datasPlan.forEach((doc, idx) => {
  const info = doc.data();
  memberInfoArr = info.memberInfo;

  planlist = info;
});

Mainbox1.addEventListener("click", async function (e) {
  // if (updateTarget) {
  //   alert("회원정보 수정중에는 저장할 수 없습니다.");
  //   return false;
  // }
  // 중복을 제거하는 함수

  // 중복 확인 함수

  const box = e.target.closest(".box");
  if (box) {
    nameChild =
      box.firstElementChild.nextElementSibling.nextElementSibling
        .nextElementSibling;
    addrChild =
      box.firstElementChild.nextElementSibling.nextElementSibling
        .nextElementSibling.nextElementSibling;
  }
  const day1 = document.querySelector(".day1");
  const day1inner = day1.innerHTML;
  const nameText = nameChild.innerHTML;
  const addrText = addrChild.innerHTML.substring(18, 22);
  const memberInfo = {
    resturant: [nameText, addrText],
  };

  const newmemberInfoArr = [];
  newmemberInfoArr.push(memberInfo);
  console.log(newmemberInfoArr);

  memberInfoArr.forEach((el) => {});
  // let planArr = planlist.planArr || [];
  // console.log(planArr);
  // planArr.push(memberInfo);
  // const result = await addDatas("plan", { memberInfo }, "planArr");
  // let lastValue = planArr[planArr.length - 1];

  // if (planArr.includes(memberInfo)) {
  // } else {
  //   // deletefield("planArr", memberInfo);
  //   const newmemberInfo = { rt: [nameText, addrText], ...memberInfo };
  //   updateDatas("plan", "planArr", { newmemberInfo });
  // }
});
// Remove the 'capital' field from the document

// } else {
//   const newmemberInfo = { rt: [nameText, addrText], ...memberInfo };
//   updateDatas("plan", "planArr", { newmemberInfo });
// }

// const shareBtn = document.querySelector(".shareBtn");
// async function shareBtnclick() {
//   const result1 = await deleteDatas("plan", "planArr");
// }
// shareBtn.addEventListener("click", shareBtnclick);
// Firestore 문서에 배열 필드 생성 및 객체 추가하기

// Firestore 문서에 배열 필드 생성 및 객체 추가하기

// 새로운 멤버 정보를 추가

// planArr를 데이터베이스에 저장

// function removeDuplicates(array) {
//   return array.filter((item, index) => array.indexOf(item) === index);
// }
// removeDuplicates(planArr);
// function removeDuplicates(array) {
//   return [...new Set(array)];
// }

// console.log(planArr);

// console.log(planArr);
// function removeDuplicates(array) {
//   return array.filter((item, index) => array.indexOf(item) === index);
// }

// const uniqueArray = removeDuplicates(planArr);
// console.log(uniqueArray);

// const resul = await updateDatas("plan", { planArr }, updateInfoObj);

// 레스토랑 배열에 추가 및 중복 제거
// const resturantArr = [];
//   function pluslistFood(a) {
//     const newEntry = a;
//     resturantArr.push(newEntry);
//     const uniqueArr = [...new Set(resturantArr.map(JSON.stringify))].map(
//       JSON.parse
//     );
//     console.log(uniqueArr);
//   }
//   pluslistFood(memberInfo);

// 함수를 호출하여 데이터를 저장합니다.
// saveDataToFirestore();

// e.preventDefault();
// const Mainboxes1 = Mainbox1.firstElementChild;
// const box = e.target.closest(".box");
// if (box) {
//   nameChild =
//     box.firstElementChild.nextElementSibling.nextElementSibling
//       .nextElementSibling;
//   addrChild =
//     box.firstElementChild.nextElementSibling.nextElementSibling
//       .nextElementSibling.nextElementSibling;

//   resturantBoxes.insertAdjacentHTML(
//     "beforeend",
//     `<div>✔ ${nameText} : ${addrText}</div>`
//   );
// }

// resturantBoxes.("nameChild, addrChild");

// if (box) {
//   const idx = box.getAttribute("data-idx");
//   const selectedItem = infolistSliceArr1[idx];
// }

// Mainboxes1.addEventListener("click", function () {
//   location.href = "https://www.instagram.com/Chiangmai_bangkok/";
// });
// const Mainboxes2 = Mainboxes1.nextElementSibling;
// Mainboxes2.addEventListener("click", function () {
//   location.href = "https://www.instagram.com/Chiangmai_bangkok/";
//   alert("2");
// });
// const Mainboxes3 = Mainboxes2.nextElementSibling;
// Mainboxes3.addEventListener("click", function () {
//   location.href = "https://www.instagram.com/Chiangmai_bangkok/";
//   alert("3");
// });
// const Mainboxes4 = Mainboxes3.nextElementSibling;
// Mainboxes4.addEventListener("click", function () {
//   location.href = "https://www.instagram.com/Chiangmai_bangkok/";
//   alert("4");
// });
// const Mainboxes5 = Mainboxes4.nextElementSibling;
// Mainboxes5.addEventListener("click", function () {
//   location.href = "https://www.instagram.com/Chiangmai_bangkok/";
//   alert("5");
// });
// const Mainboxes6 = Mainboxes5.nextElementSibling;
// Mainboxes6.addEventListener("click", function () {
//   location.href = "https://www.instagram.com/Chiangmai_bangkok/";
//   alert("6");
// });
// const Mainboxes7 = Mainboxes6.nextElementSibling;
// Mainboxes7.addEventListener("click", function () {
//   location.href = "https://www.instagram.com/Chiangmai_bangkok/";
//   alert("7");
// });
// const Mainboxes8 = Mainboxes7.nextElementSibling;
// Mainboxes8.addEventListener("click", function () {
//   location.href = "https://www.instagram.com/Chiangmai_bangkok/";
//   alert("8");
// });
// const Mainboxes9 = Mainboxes8.nextElementSibling;
// Mainboxes9.addEventListener("click", function () {
//   location.href = "https://www.instagram.com/Chiangmai_bangkok/";
//   alert("9");
// });
// const Mainboxes10 = Mainboxes9.nextElementSibling;
// Mainboxes10.addEventListener("click", function () {
//   location.href = "https://www.instagram.com/Chiangmai_bangkok/";
//   alert("10");
// });

// 맛집별 사이트 접속 종료
// 메인 상단 사이트 접속 시작
// const backinner1 = document.querySelector(".backinner1");
// backinner1.lastElementChild.addEventListener("click", function () {
//   alert("1");
// });
// const backinner2 = document.querySelector(".backinner2");
// backinner2.lastElementChild.addEventListener("click", function () {
//   alert("2");
// });
// const backinner3 = document.querySelector(".backinner3");
// backinner3.lastElementChild.addEventListener("click", function () {
//   alert("3");
// });
// const backinner4 = document.querySelector(".backinner4");
// backinner4.lastElementChild.addEventListener("click", function () {
//   alert("4");
// });

// 메인 상단 사이트 접속 종료
// Top 버튼
const Top = document.querySelector(".TopLoop");
Top.addEventListener("click", function () {
  location.href = "#header-H1";
});
//
const headerH1 = document.querySelector("#header-H1");
headerH1.addEventListener("click", function () {
  location.reload();
});
// clear(초기화) 버튼
const clear = document.querySelector(".clear");
clear.addEventListener("click", function () {
  location.reload();
});

const Promise = document.querySelector("Promise-but");
let child;
function openPopup() {
  child = window.open(
    "../240510/2_numberguess.html",
    "_blank",
    "width=1000,height=500, left=500, top=0,"
  );
  // location=no ==> 주소입력창 없어짐
  // resizable=no ==> 팝업창의 크기를 조절할 수 없음
  // toolbar=no ==> 도구모음이 없어짐
}
const body = document.querySelector("body");
const MainH1 = document.querySelector(".MainH1");
const bodyHeight = body.getBoundingClientRect();
const MainH1Height = MainH1.getBoundingClientRect();
function updateScrollPosition() {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  // console.log("Scroll Position: " + scrollPosition);

  if (scrollPosition > 1000) {
    MainH1.style.transform = "translateY(-100px)";
    MainH1.style.transition = "0.5s linear";
  }
}

window.addEventListener("scroll", updateScrollPosition);

// body.addEventListener('wheel', function(){
