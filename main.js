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

// 홈화면 스크롤 다운시 => 네비게이션바가 transparent 에서 dark로 + padding이 0으로
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
const navbarResponsiveMenuSelector = document.querySelector(
  ".navbar__responsiveMenuSelector"
);
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
    navbarResponsiveMenuSelector.classList.add("fit");
  } else {
    navbar.classList.remove("navbar--dark");
    navbarResponsiveMenuSelector.classList.remove("fit");
  }
});

// 반응형웹일때 메뉴표시바를 켜고 끄기
navbarResponsiveMenuSelector.addEventListener("click", () => {
  menuBtnContainer.classList.toggle("on");
});

function scrollInto(object) {
  const scrollTo = document.querySelector(object);
  scrollTo.scrollIntoView({
    behavior: "smooth",
  });
  // 반응형웹에서 메뉴표시바에서 메뉴선택시 표시바 안보이기
  menuBtnContainer.classList.remove("on");
}
