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

$bubble.classList.add("remove");
$bubble2.classList.add("remove");

// 장바구니 버튼 누르면 bubble 2초 보이기
$cartAddBtn.addEventListener("click", function () {
  $bubble.classList.remove("remove");
  $bubble2.classList.remove("remove");

  setTimeout(() => {
    $bubble.classList.add("remove");
    $bubble2.classList.add("remove");
  }, 3500);
});
