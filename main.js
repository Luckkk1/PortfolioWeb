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

// 홈화면 스크롤 다운시 네비게이션바가 transparent 에서 dark클래스 추가
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

function scrollInto(object) {
  const scrollTo = document.querySelector(object);
  scrollTo.scrollIntoView({
    behavior: "smooth",
  });
}
