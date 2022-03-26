"use strict";

// 네비게이션바에서 메뉴 선택시 해당 컨텐츠로 이동
const menuBtnContainer = document.querySelector(".navbar__menuBtns");

menuBtnContainer.addEventListener("click", (e) => {
  const target = e.target;
  const link = target.dataset.link;
  if (link === null) {
    return;
  }
  scrollInto(link);
});

function scrollInto(object) {
  const scrollTo = document.querySelector(object);
  scrollTo.scrollIntoView({
    behavior: "smooth",
  });
}
