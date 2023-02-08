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

productList.addEventListener('click', e => {
  const cartBtn = e.target.closest('button');
  if(cartBtn.tagName === 'BUTTON'){
    cartModal.style.display = 'block'
  };
})

closeModal.addEventListener("click", (e) => {
  const cancelBtn = e.target.closest("button");
  if (cancelBtn.tagName === "BUTTON") {
    cartModal.style.display = "none";
  }
})

// .minus-product & .plus-product 누르면 숫자 바뀌게
const plusBtn = document.querySelector(".plus-product");
const minusBtn = document.querySelector(".minus-product");
const totalCount = document.querySelector(".product-total-count");

let num = 1;

plusBtn.addEventListener("click", function () {
  num++;
  totalCount.innerHTML = num;
});

minusBtn.addEventListener("click", function () {
  num--;
  if (num < 1) {
    minusBtn.classList.add("remove");
    num = 1;
  }
  totalCount.innerHTML = num;
});

fetch("http://localhost:3000/products")
.then((res)=> res.json())
.then((data)=> {
  data.map((el)=>{
    let name = el.name;
    let description = el.description;
    let badge = el.badge;
    let price = el.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let saleRatio = el.saleRatio;
    let salePrice = el.salePrice !== 0 ? el.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원" : "";
    let thumbnail = el.image.thumbnail;
    let alt = el.image.alt;
    
    // 리스트 부분에 데이터 받아와서 뿌려주기
    let priceTemplate = 
      /* html */
      `
      <div class="product">
        <div class="visual">
          <a href="#" class="product-image"><img src="../../assets/${thumbnail}" alt="${alt}" /></a>
          <button  class="add-cart-button"><img src="../../assets/icons/Icon/Cart.svg" alt="장바구니에 담기" /></button>
        </div>
        <div class="info">
          <p class="delivery">샛별배송</p>
          <h4>${name}</h4>
          <p class="price">${price}원</p>
          <p class="described">${description}</p>
        </div>
      </div>
      `;
      let priceTemplateBadge = 
      /* html */
      `
      <div class="product">
        <div class="visual">
          <a href="#" class="product-image"><img src="../../assets/${thumbnail}" alt="${alt}" /></a>
          <button  class="add-cart-button"><img src="../../assets/icons/Icon/Cart.svg" alt="장바구니에 담기" /></button>
        </div>
        <div class="info">
          <p class="delivery">샛별배송</p>
          <h4>${name}</h4>
          <p class="price">${price}원</p>
          <p class="described">${description}</p>
          <span class="badge">${badge}</span>
        </div>
      </div>
      `;
    let saleTemplate = 
      /* html */
      `
      <div class="product">
        <div class="visual">
          <a href="#" class="product-image"><img src="../../assets/${thumbnail}" alt="${alt}" /></a>
          <button class="add-cart-button"><img src="../../assets/icons/Icon/Cart.svg" alt="장바구니에 담기" /></button>
        </div>
        <div class="info">
          <p class="delivery">샛별배송</p>
          <h4>${name}</h4>
          <p class="price"><span class="sale">${saleRatio*100}%</span>${salePrice}</p>
          <del class="pre-price">${price}원</del>
          <p class="described">${description}</p>
        </div>
      </div>
      `;
      let saleTemplateBadge = 
      /* html */
      `
      <div class="product">
        <div class="visual">
          <a href="#" class="product-image"><img src="../../assets/${thumbnail}" alt="${alt}" /></a>
          <button class="add-cart-button"><img src="../../assets/icons/Icon/Cart.svg" alt="장바구니에 담기" /></button>
        </div>
        <div class="info">
          <p class="delivery">샛별배송</p>
          <h4>${name}</h4>
          <p class="price"><span class="sale">${saleRatio*100}%</span>${salePrice}</p>
          <del class="pre-price">${price}원</del>
          <p class="described">${description}</p>
          <span class="badge">${badge}</span>
        </div>
      </div>
      `;
      if(saleRatio === 0){
        if(badge == false){
        productList.insertAdjacentHTML('beforeend', priceTemplate);
        } else {
          productList.insertAdjacentHTML('beforeend', priceTemplateBadge);
        }
      } else {
        if(badge == false){
        productList.insertAdjacentHTML('beforeend', saleTemplate);
        } else {
          productList.insertAdjacentHTML('beforeend', saleTemplateBadge);
        }
      }
    }) 
});
