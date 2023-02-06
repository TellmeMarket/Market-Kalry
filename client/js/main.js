import { headerFunc } from "./header.js";

// main-banner swiper
const swiper1 = new Swiper(".swiper-1", {
  autoplay: {
    // 자동재생
    speed: 500,
    disableOnInteraction: false,
  },
  loop: true,
  navigation: {
    // 페이지 버튼
    nextEl: ".swiper1-button-next",
    prevEl: ".swiper1-button-prev",
  },
  pagination: {
    // 페이지 넘버
    el: ".swiper-pagination",
    type: "fraction",
  },
  a11y: {
    prevSlideMessage: "메인 배너 이전으로 넘기기",
    nextSlideMessage: "메인 배너 다음으로 넘기기",
    // slideLabelMessage: "총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.",
  },
});

const $swiper = document.querySelector(".test");

fetch("http://localhost:3000/products")
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
      let id = el.id;

      let template =
        /* html */
        ` <div class="product swiper-slide">
                   <div class="product-visual">
                     <a href="./components/product-detail/productDetail.html?id=${id}">
                       <img class="product-img" src="./assets/${img}" alt=${alt} />
                     </a>
                     <button class="icon-cart" role="button" aria-label="해당상품 장바구니 담기"></button>
                   </div>
                   <div class="product-info">
                     <h4 class="product-info-name">${name}</h4>
                     <div class="product-info-price">
                       <span class="product-sale">${saleRatio}</span>
                       <span class="current-price">&nbsp;${currentPrice}&nbsp;원</span>
                     </div>
                     <span class="original-price">${currentPrice}</span>
                   </div>
                 </div>
                 `;

      $swiper.insertAdjacentHTML("beforeend", template);
    });
  })
  .catch((err) => console.log(err));

const $visual = document.querySelectorAll(".product-visual");

$visual.forEach((el) =>
  el.addEventListener("click", (e) => {
    const id = e.target.getAttribute("alt").split(" ")[0];
    localStorage.setItem(id, id);
    goDetailpage(id);
  })
);

headerFunc();
