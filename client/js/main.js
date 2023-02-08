import { loadStorage, saveStorage } from "../lib/utils/storage.js";

// AD popup
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
    data.map((el) => {
      let id = el.id;
      let name = el.name;
      let saleRatio = el.saleRatio !== 0 ? el.saleRatio * 100 + "%" : "";
      let currentPrice = el.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원";
      let salePrice = el.salePrice !== 0 ? el.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원" : "";
      let img = el.image.thumbnail;
      let alt = el.image.alt;
      let type = el.type;

      let productTemplate =
        /* html */
        ` <div class="product swiper-slide">
                   <div class="product-visual">
                     <a class="product-detail-link" href="./components/product-detail/productDetail.html?id=${id}">
                       <img class="product-img" src="./assets/${img}" alt=${alt} data-alt="${alt}" data-src="${img}" data-id="${id}"/>

                     </a>
                     <button class="icon-cart" role="button" aria-label="해당상품 장바구니 담기" data-name="${name}" data-price="${currentPrice}" data-saleprice="${salePrice}" data-image="./assets/${img}" data-type="${type}"></button>
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
      $productSwiper1.insertAdjacentHTML("beforeend", productTemplate);
      $productSwiper2.insertAdjacentHTML("beforeend", productTemplate);
    });

    function setLocalStorage(name, value) {
      let localItem = [];
      loadStorage(name)
        .then((data) => {
          if (data == null) {
            saveStorage(name, value);
          } else if (Object.prototype.toString.call(data).slice(8, -1).toLowerCase() === "object") {
            localItem = [data, value];
            saveStorage(name, localItem);
          } else {
            localItem = data;
            localItem.push(value);
            saveStorage(name, localItem);
          }
        })
        .catch((err) => console.log(err));
    }

    const $recentSwiper = document.querySelector(".swiper4-wrapper");
    (function loadRecentProduct() {
      loadStorage("recent-product")
        .then((data) => {
          if (data == null) {
          } else if (Object.prototype.toString.call(data).slice(8, -1).toLowerCase() === "object") {
            let recentTemplate = /*html*/ `
                    <div class="product-img-wrapper swiper-slide">
                      <a href="./components/product-detail/productDetail.html?id=${data.id}">
                      <img class="recent-product-img" src="./assets/${data.img}" alt=${data.alt}  /></a>
                    </div>
              `;
            $recentSwiper.insertAdjacentHTML("beforeend", recentTemplate);
            document.querySelector(".recent-product").style.display = "block";
          } else {
            for (let key in data) {
              const value = data[key];
              let recentTemplate = /*html*/ `
                    <div class="product-img-wrapper swiper-slide">
                      <a href="./components/product-detail/productDetail.html?id=${value.id}">
                      <img class="recent-product-img" src="./assets/${value.img}" alt=${value.alt}  /></a>
                    </div>
              `;
              $recentSwiper.insertAdjacentHTML("afterbegin", recentTemplate);
              document.querySelector(".recent-product").style.display = "block";
            }
          }
        })
        .catch((err) => console.log(err));
    })();

    // iconCart를 클릭하면 장바구니 창 뜨게 하기
    const $cartButton = document.querySelectorAll(".icon-cart");
    $cartButton.forEach((el) => {
      el.addEventListener("click", (e) => {
        let cartName = e.target.dataset.name;
        let cartPrice = e.target.dataset.price;
        let cartSalePrice = e.target.dataset.saleprice;
        let cartCurrentPrice = cartSalePrice === "" ? cartPrice : cartSalePrice;
        let cartImage = e.target.dataset.image;
        let cartType = e.target.dataset.type;

        let cartTemplate = /* html */ `
        <div class="add-cart-shadow active">
        <div class="add-cart active">
          <div class="cart-product-info">
            <span class="cart-product-name">${cartName}</span>
            <div class="cart-product-cnt">
              <span class="cart-product-price">${cartCurrentPrice}</span>
              <div class="cart-product-total">
                <button class="minus-product remove" role="button" aria-label="장바구니 수량 빼기"></button>
                <div class="product-total-count">1</div>
                <button class="plus-product" role="button" aria-label="장바구니 수량 담기"></button>
              </div>
            </div>
          </div>
          <div class="cart-price-info">
            <div class="product-total-price">
              <span class="product-sum">합계</span>
              <span class="cart-final-price">${cartCurrentPrice}</span>
            </div>
            <div class="point-info">
              <div class="accumulate">적립</div>
              <span class="accumulation-info">구매 시 5원 적립</span>
            </div>
          </div>
          <div class="cart-button">
            <button class="cart-cancel">취소</button>
            <button class="cart-add">장바구니 담기</button>
          </div>
        </div>
      </div>
        `;
        document.querySelector("main").insertAdjacentHTML("beforeend", cartTemplate);
        document.body.style.overflow = "hidden";

        // 취소 버튼을 누르면 다시 사라지게 하기 (.cart-cancel)
        const $cartCancel = document.querySelector(".cart-cancel");
        function close() {
          document.querySelector(".add-cart-shadow").remove();
          document.body.style.overflow = "visible";
        }
        $cartCancel.addEventListener("click", close);

        // 장바구니 담기 버튼 (.cart-add) 누르면 다시 사라지게 하고, 장바구니아이콘에 숫자 올라가게 하기
        // .search-icon-cart-add.active
        // .search-icon2-cart-add.active

        // .minus-product & .plus-product 누르면 숫자 바뀌게
        const $plusBtn = document.querySelector(".plus-product");
        const $minusBtn = document.querySelector(".minus-product");
        const $totalCount = document.querySelector(".product-total-count");
        const $productSum = document.querySelector(".cart-final-price");

        let regex = /[^0-9]/g; // 숫자가 아닌 문자열을 선택하는 정규식
        let result = cartCurrentPrice.replace(regex, ""); // 원래 문자열에서 숫자가 아닌 모든 문자열을 빈 문자로 변경

        let num = 1;
        let productSum = (num * Number(result)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원";
        $plusBtn.addEventListener("click", function () {
          num++;
          $totalCount.innerHTML = num;
          productSum = (num * Number(result)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원";
          $productSum.innerHTML = productSum;
          $minusBtn.classList.add("remove");
        });

        $minusBtn.addEventListener("click", function () {
          num--;
          if (num <= 1) {
            $minusBtn.classList.add("remove");
            num = 1;
          }
          $totalCount.innerHTML = num;
          productSum = (num * Number(result)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원";
          $productSum.innerHTML = productSum;
        });
        // .bubble.remove
        const $bubble = document.querySelector(".search-icon-bubble");
        const $bubble2 = document.querySelector(".search-icon2-bubble");
        const $content = document.querySelector(".fixed-bubble");
        const $content2 = document.querySelector(".sticky-bubble");

        // 장바구니 버튼 누르면 bubble 2초 보이기
        const $cartAddBtn = document.querySelector(".cart-add");
        $cartAddBtn.addEventListener("click", function () {
          let template =
            /* html*/
            `
          <div class="content-wrap">
          <div class="pic"><img src="${cartImage}" alt="탱탱쫄면" /></div>
          <div class="text-wrap">
            <p class="title">${cartName}</p>
            <p>장바구니에 상품을 담았습니다.</p>
          </div>
          </div>
          `;

          if (document.querySelector(".header-nav").classList.contains("active")) {
            $content2.insertAdjacentHTML("beforeend", template);
            $bubble2.classList.add("remove");

            setTimeout(() => {
              document.querySelector(".content-wrap").remove();
              $bubble2.classList.remove("remove");
            }, 2000);
          } else {
            $content.insertAdjacentHTML("beforeend", template);
            $bubble.classList.add("remove");

            setTimeout(() => {
              document.querySelector(".content-wrap").remove();
              $bubble.classList.remove("remove");
            }, 2000);
          }

          const cartStorage = { name: cartName, price: cartPrice, salePrice: cartSalePrice, productSum: productSum, cartImage: cartImage };
          setLocalStorage("cart-product", cartStorage);
          loadStorage("cart-product")
            .then((data) => {
              let cartCnt = 0;
              if (data == null) {
                cartCnt = 1;
              } else if (Object.prototype.toString.call(data).slice(8, -1).toLowerCase() === "object") {
                cartCnt = 2;
              } else {
                cartCnt = data.length + 1;
              }
              document.querySelectorAll(".search-icon-cart-add").forEach((el) => {
                el.classList.add("active");
                el.innerHTML = cartCnt;
              });
            })
            .catch((err) => console.log(err));
          close();
        });
      });
    });

    const $clickProduct = document.querySelectorAll(".product-detail-link");
    $clickProduct.forEach((el) => {
      el.addEventListener("click", (e) => {
        let productAlt = e.target.dataset.alt;
        let productSrc = e.target.dataset.src;
        let productId = e.target.dataset.id;

        const recentSotrage = { id: productId, img: productSrc, alt: productAlt };
        setLocalStorage("recent-product", recentSotrage);
      });
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
});

// recent-product swiper
const recentSwiper = new Swiper(".swiper-4", {
  direction: "vertical",
  slidesPerView: 2.5,
  spaceBetween: 4,
  navigation: {
    nextEl: ".swiper4-button-next",
    prevEl: ".swiper4-button-prev",
  },
  a11y: {
    prevSlideMessage: "최근 본 상품배너 이전으로 넘기기",
    nextSlideMessage: "최근 본 상품배너 다음으로 넘기기",
  },
});
