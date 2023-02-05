// header sticky!
const $banner = document.querySelector(".top-banner");
const $nav = document.querySelector(".header-nav");

const headerSticky = ((_) => {
  return () => {
    let base = (localStorage.getItem("hide-banner") ? 0 : $banner.offsetHeight) + document.querySelector(".header-top").offsetHeight;
    console.log(base);
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

// AD popup
document.body.style.overflow = "hidden";
const $removeAdToday = document.querySelector(".today-ad-remove");
const $removeAd = document.querySelector(".ad-close");
const $popUp = document.querySelector(".popup-ad");

function setCookie(name, value, day) {
  // 이름, 값, 유효기간 지정할 날짜
  const date = new Date();
  date.setDate(date.getDate() + day);

  let myCookie = "";
  myCookie += name + "=" + value + ";";
  myCookie += "Expires=" + date.toUTCString(); //쿠키에서는 date가 UTC포멧으로 나와야함.

  document.cookie = myCookie;
  console.log(myCookie);
}

function getCookie(name) {
  const cookies = document.cookie.split(";");
  let visited = false;
  console.log(cookies);

  cookies.forEach((el) => {
    if (el.includes(name)) visited = true;
  });

  if (visited) {
    $popUp.classList.add("remove");
    document.body.style.overflow = "visible";
  } else {
    $popUp.classList.remove("remove");
  }
}

function clickCloseAD() {
  document.body.style.overflow = "visible";
  $popUp.classList.add("remove");
}

function clickRemoveAD() {
  document.body.style.overflow = "visible";
  setCookie("MarketKarly.com", "Main", 1);
  $popUp.classList.add("remove");
}

getCookie("MarketKarly.com");
$removeAd.addEventListener("click", clickCloseAD);
$removeAdToday.addEventListener("click", clickRemoveAD);

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
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  a11y: {
    prevSlideMessage: "메인 배너 이전으로 넘기기",
    nextSlideMessage: "메인 배너 다음으로 넘기기",
    // slideLabelMessage: "총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.",
  },
});
