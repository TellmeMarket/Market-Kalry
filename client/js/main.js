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
const $mainBanner = document.querySelector(".main-banner");
const $mainSwiperButton = document.querySelectorAll(".swiper1-button");

function visibleButton() {
  $mainSwiperButton.forEach((el) => {
    el.style.opacity = 1;
  });
}

function invisibleButton() {
  $mainSwiperButton.forEach((el) => {
    el.style.opacity = 0;
  });
}

$mainBanner.addEventListener("mouseover", visibleButton);
$mainBanner.addEventListener("mouseout", invisibleButton);

const mainSwiper = new Swiper(".swiper-1", {
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
  },
});

const $productSwiper1 = document.querySelector(".swiper2-wrapper");
const $productSwiper2 = document.querySelector(".swiper3-wrapper");

fetch(" http://localhost:3000/products")
  .then((res) => res.json())
  .then((data) => {
    let authors = data;

    authors.map((el) => {
      let id = el.id;
      let name = el.name;
      let saleRatio = el.saleRatio !== 0 ? el.saleRatio * 100 + "%" : "";
      let currentPrice = el.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원";
      let salePrice = el.salePrice !== 0 ? el.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원" : "";
      let img = el.image.thumbnail;
      let alt = el.image.alt;

      let template =
        /* html */
        ` <div class="product swiper-slide">
                   <div class="product-visual">
                     <a href="./components/product-detail/productDetail.html"?id=${id}>
                       <img class="product-img" src="./assets/${img}" alt=${alt} />
                     </a>
                     <button class="icon-cart" role="button" aria-label="해당상품 장바구니 담기"></button>
                   </div>
                   <div class="product-info">
                     <h4 class="product-info-name">${name}</h4>
                     <div class="product-info-price">
                       <span class="product-sale">${saleRatio}</span>
                       <span class="current-price">${saleRatio === "" ? currentPrice : "&nbsp;" + salePrice}</span>
                     </div>
                     <span class="original-price">${saleRatio === "" ? salePrice : currentPrice}</span>
                   </div>
                 </div>
                 `;
      $productSwiper1.insertAdjacentHTML("beforeend", template);
      $productSwiper2.insertAdjacentHTML("beforeend", template);
    });
  })
  .catch((err) => console.log(err));

// product swiper
const productSwiper = new Swiper(".swiper-2", {
  slidesPerView: 4,
  spaceBetween: 16,
  slidesPerGroup: 4,
  loopFillGroupWithBlank: true,

  navigation: {
    nextEl: ".swiper2-button-next",
    prevEl: ".swiper2-button-prev",
  },
  a11y: {
    prevSlideMessage: "이 상품 어때요? 상품배너 이전으로 넘기기",
    nextSlideMessage: "이 상품 어때요? 배너 다음으로 넘기기",
  },
  on: {
    reachBeginning: function () {
      console.log("시작");
    },
    reachEnd: function () {
      console.log("끝");
    },
  },
});

const productSwiper2 = new Swiper(".swiper-3", {
  slidesPerView: 4,
  spaceBetween: 16,
  slidesPerGroup: 4,
  loopFillGroupWithBlank: true,
  navigation: {
    nextEl: ".swiper3-button-next",
    prevEl: ".swiper3-button-prev",
  },
  a11y: {
    prevSlideMessage: "놓치면 후회할 가격 상품배너 이전으로 넘기기",
    nextSlideMessage: "놓치면 후회할 가격 상품배너 다음으로 넘기기",
  },
  on: {
    reachBeginning: function () {
      console.log("시작");
    },
    reachEnd: function () {
      console.log("끝");
    },
  },
});

// recent-product swiper
const $recentImage = document.querySelectorAll(".product-img-wrapper");
$recentImage.forEach((el) => {
  el.removeAttribute("style");
  el.style.height = 51;
});

const recentSwiper = new Swiper(".swiper-4", {
  direction: "vertical",
  navigation: {
    nextEl: ".swiper4-button-next",
    prevEl: ".swiper4-button-prev",
  },
  a11y: {
    prevSlideMessage: "놓치면 후회할 가격 상품배너 이전으로 넘기기",
    nextSlideMessage: "놓치면 후회할 가격 상품배너 다음으로 넘기기",
  },
});
