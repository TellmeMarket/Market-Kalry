import { getNode } from "/client/lib/index.js";

// header sticky!
const $nav = getNode(".header-nav");
const navHandler = (_) => {
  $nav.classList.toggle("active", pageYOffset >= 92);
  if ($nav.classList.contains("active")) [...$nav.children].forEach((el) => el.classList.add("active"));
  else [...$nav.children].forEach((el) => el.classList.remove("active"));
};
addEventListener("scroll", navHandler);

// hideBanner Part
const $bannder = getNode(".top-banner");
localStorage.getItem("hide-banner") ? ($bannder.style.display = "none") : $bannder.classList.add("active");

const bannerHide = (e) => {
  e.preventDefault();
  !localStorage.getItem("hide-banner") && e.target.closest(".close-button") && $bannder.classList.remove("active");
  localStorage.setItem("hide-banner", "hide");
};
addEventListener("scroll", navHandler);
$bannder.addEventListener("click", bannerHide);

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

// const cartIcon = getNode(".icon-cart");
// const cartShadow = getNode(".add-cart-shadow");

// function popUp() {
//   console.log("test");
//   cartIcon.classList.add("active");
// }

// cartIcon.addEventListener("click", popUp);
