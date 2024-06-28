// const Mainbox1 = document.querySelector(".Main-box1");
Mainbox1.addEventListener("click", async function (e) {
  const box = e.target.closest(".box");
  if (box) {
    let nameChild =
      box.firstElementChild.nextElementSibling.nextElementSibling
        .nextElementSibling;
    let addrChild =
      box.firstElementChild.nextElementSibling.nextElementSibling
        .nextElementSibling.nextElementSibling;
  }
  console.log(nameChild, addrChild);

  const day1 = document.querySelector(".day1");
  const day1inner = day1.innerHTML;
  const nameText = nameChild.innerHTML;
  const addrText = addrChild.innerHTML.substring(18, 22);
});
