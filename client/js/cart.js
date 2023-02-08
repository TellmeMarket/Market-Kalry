const cartList = JSON.parse(localStorage.getItem("cart-product"));
const frozen = document.querySelector(".frozen");
const normal = document.querySelector("normal");
const refrigerated = document.querySelector(".refrigerated");
const product = document.querySelector(".food-cate");

const arrowIcon = document.querySelector(".arrow");
const foodWrap = document.querySelector(".food-wrap");
const upIcon = "http://localhost:5500/assets/icons/Icon/Direction=Up.svg";
const downIcon = "http://localhost:5500/assets/icons/Icon/Direction=Down.svg";

const activeArrowIcon = () => {
  const iconToggle = arrowIcon.classList.toggle("active");
  if (Object.prototype.toString.call(cartList).slice(8, -1).toLowerCase() === "object") {
    template =
      /* html */
      `
<div class="cart-add-product">
              <div class="cart-add-product-title">
                <img src="../../assets/icons/Icon/isChecked=false.svg" alt="체크아이콘" />
                <img class="cart-title-img" src="../.${cartList.cartImage}" alt="" />
                <span>${cartList.name}</span>
              </div>
              <div class="cart-quantity-wrap">
                <div class="cart-quantity">
                  <button role="button" aria-label="수량감소">
                    <span>&#45;</span>
                  </button>
                  <input placeholder="0" class="quantity" maxlength="3" aria-label="제품수량" />
                  <button role="button" aria-label="수량추가">
                    <span> &#43;</span>
                  </button>
                </div>
                <span class="cart-product-price">${cartList.price}</span>
                <img src="../../assets/cart/Vector.svg" alt="" />
              </div>
            </div>
`;
    if (iconToggle === true) {
      arrowIcon.src = upIcon;
      product.insertAdjacentHTML("beforeend", template);
      foodWrap.style.borderBottom = "0";
    } else {
      const close = document.querySelector(".cart-add-product");
      foodWrap.style.borderBottom = "1px solid black";
      arrowIcon.src = downIcon;
      close.remove();
    }
  } else {
    cartList.map((el) => {
      template =
        /* html */
        `
    <div class="cart-add-product">
                  <div class="cart-add-product-title">
                    <img src="../../assets/icons/Icon/isChecked=false.svg" alt="체크아이콘" />
                    <img src="../.${el.cartImage}" alt="" />
                    <span>${el.name}</span>
                  </div>
                  <div class="cart-quantity-wrap">
                    <div class="cart-quantity">
                      <button role="button" aria-label="수량감소">
                        <span>&#45;</span>
                      </button>
                      <input placeholder="0" class="quantity" maxlength="3" aria-label="제품수량" />
                      <button role="button" aria-label="수량추가">
                        <span> &#43;</span>
                      </button>
                    </div>
                    <span class="cart-product-price">${el.price}</span>
                    <img src="../../assets/cart/Vector.svg" alt="" />
                  </div>
                </div>
    `;

      if (iconToggle === true) {
        arrowIcon.src = upIcon;
        product.insertAdjacentHTML("beforeend", template);
        foodWrap.style.borderBottom = "0";
      } else {
        const close = document.querySelector(".cart-add-product");
        foodWrap.style.borderBottom = "1px solid black";
        arrowIcon.src = downIcon;
        close.remove();
      }
    });
  }
};

arrowIcon.addEventListener("click", activeArrowIcon);
