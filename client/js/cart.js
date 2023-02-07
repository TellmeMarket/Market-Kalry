const arrowIcon = document.querySelector(".arrow");
const product = document.querySelector(".food-cate");
const foodWrap = document.querySelector(".food-wrap");
const defaultStyle = getComputedStyle(foodWrap).borderBottom;
const upIcon = "http://localhost:5500/assets/icons/Icon/Direction=Up.svg";
const downIcon = "http://localhost:5500/assets/icons/Icon/Direction=Down.svg";

console.log(defaultStyle);
const activeArrowIcon = () => {
  const iconToggle = arrowIcon.classList.toggle("active");

  template = /* html */ `
  <div class="cart-add-product">
                <div class="cart-add-product-title">
                  <img src="../../assets/icons/Icon/isChecked=false.svg" alt="체크아이콘" />
                  <img src="../../assets/tangtang/detail_view.jpg" alt="" />
                  <span>[풀무원] 탱탱쫄면 (4개입)</span>
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
                  <span>4,980원</span>
                  <img src="../../assets/header/top-banner-icon.svg" alt="" />
                </div>
              </div>
  `;
  if (iconToggle === true) {
    arrowIcon.src = upIcon;
    product.insertAdjacentHTML("beforeend", template);
  } else {
    const close = document.querySelector(".cart-add-product");
    arrowIcon.src = downIcon;
    close.remove();
  }
};

arrowIcon.addEventListener("click", activeArrowIcon);
