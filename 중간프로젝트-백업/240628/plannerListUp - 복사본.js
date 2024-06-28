let nameChild;
let addrChild;
let idChild;
const resturantBoxes = document.querySelector(".resturantBoxes");
const cafeBoxes = document.querySelector(".cafeBoxes");
const hotPlaceBoxes = document.querySelector(".hotPlaceBoxes"); // hotPlaceBoxes 변수 추가
const resturantBoxes1 = document.querySelector(".resturantBoxes1");
const cafeBoxes1 = document.querySelector(".cafeBoxes1");
const hotPlaceBoxes1 = document.querySelector(".hotPlaceBoxes1");
const Mainbox = document.querySelectorAll(".Mainbox");

// planner title
const plannertitle = document.getElementById("planner-title");
const plannertitle1 = document.getElementById("planner-title1");
const localId = localStorage.getItem("ID");
const localSemiId = localStorage.getItem("semiID");
if (localId !== null && localSemiId == null) {
  plannertitle.innerHTML = `${localId} planner`;
  plannertitle1.innerHTML = `${localId} planner`;
} else if (localSemiId !== null && localId == null) {
  plannertitle.innerHTML = `${localSemiId} planner`;
  plannertitle.innerHTML = `${localSemiId} planner`;
}
// 플래너 박스
Mainbox.forEach(function (el) {
  el.addEventListener("click", function (e) {
    // console.log(localId);
    // console.log(localSemiId);
    if (localId !== null || localSemiId !== null) {
    } else {
      alert("로그인이 필요합니다.");
      location.href = "../../박근모 - 메인/HTML/mainPage.html";
      return false;
    }
    const box = e.target.closest(".box");
    if (box) {
      nameChild = box.firstElementChild.nextElementSibling.nextElementSibling;

      addrChild =
        box.firstElementChild.nextElementSibling.nextElementSibling
          .nextElementSibling;
      idChild = box.lastElementChild;
    }
    const day1 = document.querySelector(".day1");
    const day1inner = day1.innerHTML;
    const nameText = nameChild.innerHTML;
    const addrText = addrChild.innerHTML.substring(18, 22);
    const IdText = idChild.innerHTML.substring(14, 22);

    // key 값에 따라 localStorage에 저장 및 각 상자에 추가
    if (IdText.includes("store")) {
      localStorage.setItem(`${IdText}`, `${nameText},${addrText}`);
      let username = localStorage.getItem(`${IdText}`);

      let exists = Array.from(resturantBoxes.querySelectorAll("span")).some(
        (span) => span.textContent === username
      );

      // resturantBoxes에 추가
      if (!exists) {
        resturantBoxes.insertAdjacentHTML(
          "beforeend",
          `
          <div>
          <span>${username}</span>
          </div>
          `
        );
      }
    }
    if (IdText.includes("cafe")) {
      localStorage.setItem(`${IdText}`, `${nameText},${addrText}`);
      let username = localStorage.getItem(`${IdText}`);

      let exists = Array.from(cafeBoxes.querySelectorAll("span")).some(
        (span) => span.textContent === username
      );

      // cafeBoxes에 추가
      if (!exists) {
        cafeBoxes.insertAdjacentHTML(
          "beforeend",
          `
          <div>
          <span>${username}</span>
          </div>
          `
        );
      }
    } else if (IdText.includes("hotplace")) {
      localStorage.setItem(`${IdText}`, `${nameText},${addrText}`);
      let username = localStorage.getItem(`${IdText}`);

      let exists = Array.from(hotPlaceBoxes.querySelectorAll("span")).some(
        (span) => span.textContent === username
      );

      // hotPlaceBoxes에 추가
      if (!exists) {
        hotPlaceBoxes.insertAdjacentHTML(
          "beforeend",
          `
          <div>
          <span>${username}</span>
          </div>
          `
        );
      }
    }
  });

  // 페이지 로드 시 기존에 저장된 데이터 확인 및 각 상자에 추가
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    if (key.includes("store")) {
      let exists = Array.from(resturantBoxes.querySelectorAll("span")).some(
        (span) => span.textContent === value
      );

      // resturantBoxes에 추가
      if (!exists) {
        resturantBoxes.insertAdjacentHTML(
          "beforeend",
          `
          <div>
          <span>${value}</span>
          </div>
          `
        );
      }
    }
    if (key.includes("cafe")) {
      let exists = Array.from(cafeBoxes.querySelectorAll("span")).some(
        (span) => span.textContent === value
      );

      // cafeBoxes에 추가
      if (!exists) {
        cafeBoxes.insertAdjacentHTML(
          "beforeend",
          `
          <div>
          <span>${value}</span>
          </div>
          `
        );
      }
    } else if (key.includes("hotplace")) {
      let exists = Array.from(hotPlaceBoxes.querySelectorAll("span")).some(
        (span) => span.textContent === value
      );

      // hotPlaceBoxes에 추가
      if (!exists) {
        hotPlaceBoxes.insertAdjacentHTML(
          "beforeend",
          `
          <div>
          <span>${value}</span>
          </div>
          `
        );
      }
    }
  }
  // resturantBoxes 클릭 이벤트 핸들러 함수
  resturantBoxes.addEventListener("click", function (e) {
    handleBoxClick(e, resturantBoxes);
  });

  // cafeBoxes 클릭 이벤트 핸들러 함수
  cafeBoxes.addEventListener("click", function (e) {
    handleBoxClick(e, cafeBoxes);
  });

  // hotPlaceBoxes 클릭 이벤트 핸들러 함수
  hotPlaceBoxes.addEventListener("click", function (e) {
    handleBoxClick(e, hotPlaceBoxes);
  });

  // 클릭 이벤트 핸들러 함수 정의
  function handleBoxClick(e, box) {
    if (e.target.tagName === "SPAN") {
      const span = e.target;
      const username = span.textContent;

      // span의 부모 요소를 찾아서 삭제
      if (span.parentElement) {
        span.parentElement.remove();
      }

      // localStorage에서 해당 데이터 삭제
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        if (value === username) {
          localStorage.removeItem(key);
          break; // 삭제 후 반복문 종료
        }
      }
    }
  }
});

// 공유박스
Mainbox.forEach(function (el) {
  el.addEventListener("click", function (e) {
    const userId = localStorage.getItem("ID");
    if (userId === null) {
      alert("로그인이 필요합니다.");
      location.href = "../../박근모 - 메인/HTML/mainPage.html";
      return false;
    } else if (userId !== null) {
    }
    const box = e.target.closest(".box");
    if (box) {
      nameChild = box.firstElementChild.nextElementSibling.nextElementSibling;

      addrChild =
        box.firstElementChild.nextElementSibling.nextElementSibling
          .nextElementSibling;
      idChild = box.lastElementChild;
    }
    const day1 = document.querySelector(".day1");
    const day1inner = day1.innerHTML;
    const nameText = nameChild.innerHTML;
    const addrText = addrChild.innerHTML.substring(18, 22);
    const IdText = idChild.innerHTML.substring(14, 22);

    // key 값에 따라 localStorage에 저장 및 각 상자에 추가
    if (IdText.includes("store")) {
      localStorage.setItem(`${IdText}`, `${nameText},${addrText}`);
      let username = localStorage.getItem(`${IdText}`);

      let exists = Array.from(resturantBoxes1.querySelectorAll("span")).some(
        (span) => span.textContent === username
      );

      // resturantBoxes에 추가
      if (!exists) {
        resturantBoxes1.insertAdjacentHTML(
          "beforeend",
          `
          <div>
          <span>${username}</span>
          </div>
          `
        );
      }
    }
    if (IdText.includes("cafe")) {
      localStorage.setItem(`${IdText}`, `${nameText},${addrText}`);
      let username = localStorage.getItem(`${IdText}`);

      let exists = Array.from(cafeBoxes1.querySelectorAll("span")).some(
        (span) => span.textContent === username
      );

      // cafeBoxes에 추가
      if (!exists) {
        cafeBoxes1.insertAdjacentHTML(
          "beforeend",
          `
          <div>
          <span>${username}</span>
          </div>
          `
        );
      }
    } else if (IdText.includes("hotplace")) {
      localStorage.setItem(`${IdText}`, `${nameText},${addrText}`);
      let username = localStorage.getItem(`${IdText}`);

      let exists = Array.from(hotPlaceBoxes1.querySelectorAll("span")).some(
        (span) => span.textContent === username
      );

      // hotPlaceBoxes에 추가
      if (!exists) {
        hotPlaceBoxes1.insertAdjacentHTML(
          "beforeend",
          `
          <div>
          <span>${username}</span>
          </div>
          `
        );
      }
    }
  });

  // 페이지 로드 시 기존에 저장된 데이터 확인 및 각 상자에 추가
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    if (key.includes("store")) {
      let exists = Array.from(resturantBoxes1.querySelectorAll("span")).some(
        (span) => span.textContent === value
      );

      // resturantBoxes에 추가
      if (!exists) {
        resturantBoxes1.insertAdjacentHTML(
          "beforeend",
          `
          <div>
          <span>${value}</span>
          </div>
          `
        );
      }
    }
    if (key.includes("cafe")) {
      let exists = Array.from(cafeBoxes1.querySelectorAll("span")).some(
        (span) => span.textContent === value
      );

      // cafeBoxes에 추가
      if (!exists) {
        cafeBoxes1.insertAdjacentHTML(
          "beforeend",
          `
          <div>
          <span>${value}</span>
          </div>
          `
        );
      }
    } else if (key.includes("hotplace")) {
      let exists = Array.from(hotPlaceBoxes1.querySelectorAll("span")).some(
        (span) => span.textContent === value
      );

      // hotPlaceBoxes에 추가
      if (!exists) {
        hotPlaceBoxes1.insertAdjacentHTML(
          "beforeend",
          `
          <div>
          <span>${value}</span>
          </div>
          `
        );
      }
    }
  }
  // resturantBoxes 클릭 이벤트 핸들러 함수
  resturantBoxes1.addEventListener("click", function (e) {
    handleBoxClick(e, resturantBoxes1);
  });

  // cafeBoxes 클릭 이벤트 핸들러 함수
  cafeBoxes1.addEventListener("click", function (e) {
    handleBoxClick(e, cafeBoxes1);
  });

  // hotPlaceBoxes 클릭 이벤트 핸들러 함수
  hotPlaceBoxes1.addEventListener("click", function (e) {
    handleBoxClick(e, hotPlaceBoxes1);
  });

  // 클릭 이벤트 핸들러 함수 정의
  function handleBoxClick(e, box) {
    if (e.target.tagName === "SPAN") {
      const span = e.target;
      const username = span.textContent;

      // span의 부모 요소를 찾아서 삭제
      if (span.parentElement) {
        span.parentElement.remove();
      }

      // localStorage에서 해당 데이터 삭제
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        if (value === username) {
          localStorage.removeItem(key);
          break; // 삭제 후 반복문 종료
        }
      }
    }
  }
});
