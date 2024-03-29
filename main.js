'use strict';
// 바디 스크롤아웃
ScrollOut();

// 타이핑 효과
const homeTyping = document.querySelector('.typeIt');
document.addEventListener('DOMContentLoaded', () => {
  new TypeIt(homeTyping).pause(1000).go();
});

// 네비게이션바에서 메뉴 선택시 해당 컨텐츠로 이동
const menuBtnContainer = document.querySelector('.navbar__menuBtns');
menuBtnContainer.addEventListener('click', e => {
  const target = e.target;
  const link = target.dataset.link;
  if (link === null) {
    return;
  }
  scrollInto(link);
});

// 홈화면 스크롤 다운시 => 네비게이션바가 transparent 에서 dark로 + padding이 0으로
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
const navbarResponsiveMenuSelector = document.querySelector(
  '.navbar__responsiveMenuSelector'
);

document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
    navbarResponsiveMenuSelector.classList.add('fit');
  } else {
    navbar.classList.remove('navbar--dark');
    navbarResponsiveMenuSelector.classList.remove('fit');
  }
});

// 반응형웹일때 메뉴표시바를 켜고 끄기
navbarResponsiveMenuSelector.addEventListener('click', () => {
  menuBtnContainer.classList.toggle('on');
});

// 보는 화면에 해당하는 메뉴에 보더라인 추가
const sectionIds = ['#home', '#about', '#works'];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

const observerCallback = (entries, obsever) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

function selectNavItems(selected) {
  selectedNavItem.classList.remove('mark');
  selectedNavItem = selected;
  selectedNavItem.classList.add('mark');
}

window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    window.scrollY + window.innerHeight ===
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItems(navItems[selectedNavIndex]);
});
const observerObtion = {
  root: null,
  rootMargin: '0px',
  threshold: 0.4,
};

const observer = new IntersectionObserver(observerCallback, observerObtion);
sections.forEach(section => observer.observe(section));

// 스크롤업 버튼 보이기
const arrowUpBtn = document.querySelector('.arrowUpBtn');
const mainHome = document.querySelector('#home');
const mainHomeHeight = mainHome.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > mainHomeHeight / 2) {
    arrowUpBtn.classList.add('display');
  } else {
    arrowUpBtn.classList.remove('display');
  }
});

// 스크롤업 버튼 맨위로가기 기능
arrowUpBtn.addEventListener('click', () => {
  scrollInto('#home');
});

function scrollInto(object) {
  const scrollTo = document.querySelector(object);
  scrollTo.scrollIntoView({
    behavior: 'smooth',
  });
  // 반응형웹에서 메뉴표시바에서 메뉴선택시 표시바 off
  menuBtnContainer.classList.remove('on');
  // 메뉴클릭시 보는화면 메뉴 보더라인 추가
  selectNavItems(navItems[sectionIds.indexOf(object)]);
}

// works 컨텐츠 메뉴 클릭시 액티브효과 && 분류기능
const worksBtnCategory = document.querySelector('.works__buttonCategory');
const PjContainer = document.querySelector('.works__smProjects');
const projects = document.querySelectorAll('.works__smProject');
const pjs = document.querySelectorAll('.works__project');

// 분류기능
worksBtnCategory.addEventListener('click', e => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }
  // 개별메뉴
  pjs.forEach(pj => {
    PjContainer.classList.add('animate');
    if (filter === pj.dataset.type) {
      pj.classList.add('visible');
    } else {
      pj.classList.remove('visible');
    }
    setTimeout(() => {
      PjContainer.classList.remove('animate');
    }, 300);
  });
  // all메뉴
  projects.forEach(project => {
    PjContainer.classList.add('animate');
    if (filter === '*') {
      project.classList.remove('invisible');
    } else {
      project.classList.add('invisible');
    }
    setTimeout(() => {
      PjContainer.classList.remove('animate');
    }, 300);
  });

  // 액티브효과
  const worksActive = document.querySelector('.active');
  worksActive.classList.remove('active');
  const target =
    e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('active');
});

// 워크메뉴 썸네일 클릭시 해당 메뉴로 이동
const worksBtns = document.querySelectorAll('.works__menuBtn');
projects.forEach(project => {
  project.addEventListener('click', () => {
    worksBtns.forEach(btn => {
      if (project.dataset.type === btn.dataset.filter) {
        const worksActive = document.querySelector('.active');
        worksActive.classList.remove('active');
        btn.classList.add('active');
      }
    });

    pjs.forEach(pj => {
      PjContainer.classList.add('animate');
      if (project.dataset.type === pj.dataset.type) {
        console.log(project.dataset.type);
        pj.classList.add('visible');
      } else {
        pj.classList.remove('visible');
      }
      setTimeout(() => {
        PjContainer.classList.remove('animate');
      }, 300);
    });

    for (let project of projects) {
      project.classList.add('invisible');
    }
  });
});
