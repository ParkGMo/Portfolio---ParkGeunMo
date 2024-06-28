import {
  db,
  getDatas,
  addDatas,
  deleteDatas,
  updateDatas,
} from "../Javascript/DLU_firebase.js";
const loginBox = document.querySelector(".login-box");
const loginBtn = document.querySelector(".login-btn");

const aloginBox = document.querySelector(".alogin-box");
const bloginBox = document.querySelector(".blogin-box");
const returnBtn = document.getElementById("returnButton");

const plannerTitle = document.getElementById("planner-title");
// const titleSemiId = localStorage.getItem("semiID");
// console.log(localStorage.getItem("semiID"));
if (
  localStorage.getItem("semiID") === null &&
  localStorage.getItem("ID") === null
) {
  //
  // 비회원로그인
  document
    .querySelector(".addPlanner")
    .addEventListener("click", async function () {
      const nickname = document.getElementById("nicknameInfo").value;
      const userage = document.getElementById("ageInfo").value;
      const genderElements = document.getElementsByName("gender");
      let genderValue;

      for (const genderElement of genderElements) {
        if (genderElement.checked) {
          genderValue = genderElement.value;
          console.log(genderValue);
          break;
        }
      }
      const loginBox2 = document.getElementById("bloginBox2");
      const welcomeMessage = document.getElementById("welcomeMessage");
      const customerInfo = {
        userId: nickname,
        age: userage,
        gender: genderValue,
      };
      localStorage.setItem("semiID", nickname);
      const titleSemiId = localStorage.getItem("semiID");

      if (nickname) {
        const datas = await addDatas("semiCustomer", customerInfo, nickname);
        welcomeMessage.innerText = `${nickname}님 환영합니다.`;
        loginBox2.classList.remove("hidden");
        welcomeMessage.classList.remove("hidden");
        document.querySelector(".blogin-box").classList.add("hidden");
        document.getElementById("plannerBox").classList.remove("hiddenBox");
        returnBtn.classList.remove("hidden");
        loginBox.classList.add("hidden");
        plannerTitle.innerHTML = `${titleSemiId}'s planner`;
      } else {
        alert("닉네임을 입력해주세요.");
      }
    });

  // 회원로그인
  // loginBtn.addEventListener("click", (e) => {
  //   const ID = document.getElementById("id").value;
  //   const PW = document.getElementById("password").value;
  //   localStorage.setItem("ID", ID);
  //   async function getcutomerInfo() {
  //     const loginBox2 = document.getElementById("bloginBox2");
  //     const welcomeMessage = document.getElementById("welcomeMessage");
  //     const datas = await getDatas("customer");
  //     datas.forEach((doc) => {
  //       const info = doc.data();
  //       const LogInID = info.id;
  //       const LogInPW = info.password;
  //       const titleId = localStorage.getItem("ID");
  //       if (LogInID === ID && LogInPW === PW) {
  //         welcomeMessage.innerText = `${info.name}님 환영합니다.`;
  //         loginBox2.classList.remove("hidden");
  //         welcomeMessage.classList.remove("hidden");
  //         document.querySelector(".alogin-box").classList.add("hidden");
  //         document.getElementById("plannerBox").classList.remove("hiddenBox");
  //         returnBtn.classList.remove("hidden");
  //         loginBox.classList.add("hidden");
  //       } else {
  //         alert("아이디 또는 비밀번호가 틀렸습니다.");
  //         return false;
  //       }
  //       plannerTitle.innerHTML = `${titleId}'s planner`;
  //     });
  //   }
  //   getcutomerInfo();
  //   e.preventDefault();
  // });
  loginBtn.addEventListener("click", (e) => {
    const ID = document.getElementById("id").value;
    const PW = document.getElementById("password").value;
    localStorage.setItem("ID", ID);

    async function getcutomerInfo() {
      const loginBox2 = document.getElementById("bloginBox2");
      const welcomeMessage = document.getElementById("welcomeMessage");
      const datas = await getDatas("customer");

      let isAuthenticated = false; // Flag to track authentication status

      datas.forEach((doc) => {
        const info = doc.data();
        const LogInID = info.id;
        const LogInPW = info.password;
        const titleId = localStorage.getItem("ID");

        if (LogInID === ID && LogInPW === PW) {
          welcomeMessage.innerText = `${info.name}님 환영합니다.`;
          loginBox2.classList.remove("hidden");
          welcomeMessage.classList.remove("hidden");
          document.querySelector(".alogin-box").classList.add("hidden");
          document.getElementById("plannerBox").classList.remove("hiddenBox");
          returnBtn.classList.remove("hidden");
          loginBox.classList.add("hidden");
          plannerTitle.innerHTML = `${titleId}'s planner`;

          isAuthenticated = true; // Set flag to true if authentication is successful
          return;
        }
      });

      // If no matching ID and password are found, show alert
      if (!isAuthenticated) {
        alert("아이디 또는 비밀번호가 틀렸습니다.");
      }
    }

    getcutomerInfo();
    e.preventDefault();
  });

  // 로그아웃(회원/ 비회원)
  document
    .getElementById("returnButton")
    .addEventListener("click", async function () {
      const nickname = document.getElementById("nicknameInfo").value;
      loginBox.classList.remove("hidden");
      if (
        aloginBox.classList.contains("hiddenALogin") == true &&
        bloginBox.classList.contains("hiddenBLogin") !== true
      ) {
        const deleteresult = await deleteDatas("semiCustomer", nickname);
        localStorage.removeItem("semiID");
        document.querySelector(".blogin-box").classList.remove("hidden");
        document.getElementById("bloginBox2").classList.add("hidden");
        document.getElementById("welcomeMessage").classList.add("hidden");
        document.getElementById("plannerBox").classList.add("hiddenBox");
        this.classList.add("hidden");
      } else if (
        aloginBox.classList.contains("hiddenALogin") !== true ||
        bloginBox.classList.contains("hiddenBLogin") == true
      ) {
        // const deleteresult = await deleteDatas("customer", nickname);
        localStorage.removeItem("ID");
        document.querySelector(".alogin-box").classList.remove("hidden");
        document.getElementById("bloginBox2").classList.add("hidden");
        document.getElementById("welcomeMessage").classList.add("hidden");
        document.getElementById("plannerBox").classList.add("hiddenBox");
        this.classList.add("hidden");
      }
    });
  //
} else if (
  localStorage.getItem("semiID") !== null ||
  localStorage.getItem("ID") !== null
) {
  if (
    localStorage.getItem("semiID") === null &&
    localStorage.getItem("ID") !== null
  ) {
    loginBox.classList.add("hidden");
    const welcomeMessage = document.getElementById("welcomeMessage");
    document.getElementById("bloginBox2").classList.remove("hidden");
    welcomeMessage.innerText = `${localStorage.getItem("ID")}님 환영합니다.`;
  } else if (
    localStorage.getItem("semiID") !== null &&
    localStorage.getItem("ID") === null
  ) {
    loginBox.classList.add("hidden");
    const welcomeMessage = document.getElementById("welcomeMessage");
    document.getElementById("bloginBox2").classList.remove("hidden");
    welcomeMessage.innerText = `${localStorage.getItem(
      "semiID"
    )}님 환영합니다.`;
  }
}
