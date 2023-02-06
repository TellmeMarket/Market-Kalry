import { headerFunc } from "./header.js";

headerFunc();

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
  let cookieChecked = false;
  console.log(cookies);

  cookies.forEach((el) => {
    if (el.includes(name)) cookieChecked = true;
  });

  if (cookieChecked) {
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

const $swiper = document.querySelector(".swiper2-wrapper");

fetch(" http://localhost:3000/products")
  .then((res) => res.json())
  .then((data) => {
    let authors = data;

    authors.map((el) => {
      let name = el.name;
      let saleRatio = el.saleRatio !== 0 ? el.saleRatio * 100 + "%" : "";
      let currentPrice = el.price;
      let salePrice = el.salePrice;
      let img = el.image.thumbnail;
      let alt = el.image.alt;

      let template =
        /* html */
        ` <div class="product swiper-slide">
                   <div class="product-visual">
                     <a href="">
                       <img class="product-img" src="./assets/${img}" alt=${alt} />
                     </a>
                     <button class="icon-cart" role="button" aria-label="해당상품 장바구니 담기"></button>
                   </div>
                   <div class="product-info">
                     <h4 class="product-info-name">${name}</h4>
                     <div class="product-info-price">
                       <span class="product-sale">${saleRatio}</span>
                       <span class="current-price">&nbsp;${currentPrice === salePrice ? currentPrice : salePrice}&nbsp;원</span>
                     </div>
                     <span class="original-price">${currentPrice}</span>
                   </div>
                 </div>
                 `;

      $swiper.insertAdjacentHTML("beforeend", template);
    });
  })
  .catch((err) => console.log(err));
