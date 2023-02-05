import { getNode } from "/client/lib/index.js";

// header sticky!
const $banner = document.querySelector(".top-banner");
const $nav = document.querySelector(".header-nav");

const headerSticky = ((_) => {
  return () => {
    let base = (localStorage.getItem("hide-banner") ? 0 : $banner.offsetHeight) + document.querySelector(".header-top").offsetHeight;
    $nav.classList.toggle("active", (pageYOffset || scrollY) >= base);
    if ($nav.classList.contains("active")) [...$nav.children].forEach((el) => el.classList.add("active"));
    else [...$nav.children].forEach((el) => el.classList.remove("active"));
  };
})();
headerSticky();

// hideBanner Part
localStorage.getItem("hide-banner") ? ($banner.style.display = "none") : $banner.classList.add("active");

const bannerHide = (e) => {
  e.preventDefault();
  !localStorage.getItem("hide-banner") && e.target.closest(".close-button") && $banner.classList.remove("active");
  localStorage.setItem("hide-banner", "hide");
};

// eventList
addEventListener("scroll", headerSticky);
$banner.addEventListener("click", bannerHide);

// main-banner swiper
const swiper1 = new Swiper(".swiper-1", {
  autoplay: {
    speed: 500,
    disableOnInteraction: false,
  },
  loop: true,
  navigation: {
    nextEl: ".swiper1-button-next",
    prevEl: ".swiper1-button-prev",
  },
  a11y: {
    prevSlideMessage: "메인 배너 이전으로 넘기기",
    nextSlideMessage: "메인 배너 다음으로 넘기기",
    // slideLabelMessage: "총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.",
  },
});
