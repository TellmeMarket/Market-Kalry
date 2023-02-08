// product list menu 부분의 is-active 효과
const button = document.querySelectorAll(".menu-button");

for (let i = 0; i < button.length; i++) {
  button[i].addEventListener("click", function () {
    let count = 0;
    while (count < button.length) {
      button[count++].classList.remove("is-active");
    }
    this.classList.add("is-active");
  });
}

// 장바구니 담기 모달창 스크립트
const productList = document.querySelector(".product-list");
const cartModal = document.querySelector(".add-cart-shadow");
const closeModal = document.querySelector(".cart-button");

productList.addEventListener("click", (e) => {
  const cartBtn = e.target.closest("button");
  if (cartBtn.tagName === "BUTTON") {
    cartModal.style.display = "block";
  }
});

closeModal.addEventListener("click", (e) => {
  const cancelBtn = e.target.closest("button");
  if (cancelBtn.tagName === "BUTTON") {
    cartModal.style.display = "none";
  }
});
