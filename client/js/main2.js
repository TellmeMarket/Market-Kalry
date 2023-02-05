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
