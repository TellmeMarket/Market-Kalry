import { getNode } from "/client/lib/index.js";

// iconCart를 클릭하면 .add-cart-shadow 와 .add-cart가 뜨게 하기
const $iconCarts = document.querySelectorAll(".icon-cart");

$iconCarts.forEach((el) => el.addEventListener("click", click));

function click() {
  document.querySelector(".add-cart-shadow").classList.add("active");
  document.querySelector(".add-cart").classList.add("active");
  document.body.style.overflow = "hidden";
}

// 취소 버튼을 누르면 다시 사라지게 하기 (.cart-cancel)
const $cartCancel = document.querySelector(".cart-cancel");

$cartCancel.addEventListener("click", close);

function close() {
  document.querySelector(".add-cart-shadow").classList.remove("active");
  document.querySelector(".add-cart").classList.remove("active");
  document.body.style.overflow = "visible";
}

// 장바구니 담기 버튼 (.cart-add) 누르면 다시 사라지게 하고, 장바구니아이콘에 숫자 올라가게 하기
// .search-icon-cart-add.active
// .search-icon2-cart-add.active

const $cartAddBtn = document.querySelector(".cart-add");
$cartAddBtn.addEventListener("click", function () {
  close();
  document.querySelector(".search-icon-cart-add").classList.add("active");
  document.querySelector(".search-icon2-cart-add").classList.add("active");
});

// .bubble.remove
const $bubble = document.querySelector(".search-icon-bubble");
const $bubble2 = document.querySelector(".search-icon2-bubble");

// 장바구니 버튼 누르면 bubble 2초 보이기
$cartAddBtn.addEventListener("click", function () {
  $bubble.classList.add("remove");
  $bubble2.classList.add("remove");
  // ease-in-out 으로 나타나게 하고 싶습니다.

  setTimeout(() => {
    $bubble.classList.remove("remove");
    $bubble2.classList.remove("remove");
  }, 3500);
});

// .minus-product & .plus-product 누르면 숫자 바뀌게
const $plusBtn = document.querySelector(".plus-product");
const $minusBtn = document.querySelector(".minus-product");

const $totalCount = document.querySelector(".product-total-count");

let num = 1;

$plusBtn.addEventListener("click", function () {
  num++;
  console.log(num);
  $totalCount.innerHTML = num;
  console.log($totalCount);
});
$minusBtn.addEventListener("click", function () {
  num--;
  if (num <= 1) {
    num = 1;
  }
  $totalCount.innerHTML = num;
});

// 금액 합계에도 반영하기
// num이 1보다 크면 - 배경이미지 검정색으로 바꾸기 if (num > 1) {
//   $minusBtn.style.backgroundImage = "url(../assets/disabled=false.svg)";
// }
