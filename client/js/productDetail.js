const $wrap = document.querySelector(".detail-page");
const id = window.location.href;
console.log(id.split("id=")[1]);
const goDetailpage = (id) => {
  // const getData = Object.entries(localStorage);
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const result = data.filter((el) => el.image.alt.split(" ")[0] === getData[0][0]);
      // let name = result[0].name;
      // let img = result[0].image.thumbnail;
      // let alt = result[0].image.alt;
      // let description = result[0].description;
      // let price = result[0].price;
      // let type = result[0].type;

      let template = /* HTML */ `
        <section class="product-information">
          <section class="product-thumbnail">
            <img src="./../../assets/${img}" alt=${alt} class="product-information__thumbnail-img" />
          </section>
          <section>
            <div class="product-title-wrap">
              <p class="delivery-company">샛별배송</p>
              <h3 class="product-title-name">${name}</h3>
              <h3 class="product-slogan">${description}</h3>
              <h3 class="product-price">${price}<span>원</span></h3>
              <p class="login-recommended">로그인 후, 적립 혜택이 제공됩니다.</p>
            </div>
            <div class="product-information-box" aria-describedby="제품상세정보">
              <div class="line">
                <p class="product-info-title">배송</p>
                <div>
                  <span class="product-info-detail">샛별배송</span>
                  <p class="product-info-detail-desc">23시 전 주문 시 내일 아침 7시 전 도착</p>
                  <p class="product-info-detail-desc">(대구 부산 울산 샛별배송 운영시간 별도 확인)</p>
                </div>
              </div>
              <div class="line">
                <p class="product-info-title">판매자</p>
                <p class="product-info-detail">칼리</p>
              </div>
              <div class="line">
                <p class="product-info-title">포장타입</p>
                <div>
                  <p class="product-info-detail">${type}(종이포장)</p>
                  <p class="product-info-detail-desc">택배배송은 에코 포장이 스티로폼으로 대체 됩니다.</p>
                </div>
              </div>
              <div class="line">
                <p class="product-info-title">판매단위</p>
                <p class="product-info-detail">1봉</p>
              </div>
              <div class="line">
                <p class="product-info-title">중량/용량</p>
                <p class="product-info-detail">123g*4봉</p>
              </div>
              <div class="line">
                <p class="product-info-title">원산지</p>
                <p class="product-info-detail">상세페이지 별도 표기</p>
              </div>
              <div class="line">
                <p class="product-info-title">알레르기 정보</p>
                <div class="allergy-info">
                  <p class="product-info-detail-desc">&#45;대두, 밀, 쇠고기 함유</p>
                  <p class="product-info-detail-desc">&#45;계란, 우유, 메밀, 땅콩, 고등어, 게, 돼지고기, 새우, 복숭아, 토마토, 아황산류, 호두, 잣, 닭고기, 오징어, 조개류(굴, 전복, 홍합 포함)를 사용한 제품과 같은 제조시설에서 제조</p>
                </div>
              </div>
              <div class="product-choice-wrap">
                <p class="product-info-title">상품선택</p>
                <div class="product-purchase-box">
                  <span>[풀무원]탱탱쫄면(4개입)</span>
                  <div class="product-quantity">
                    <button role="button" aria-label="수량감소">
                      <span>&#45;</span>
                    </button>
                    <input placeholder="0" class="quantity" maxlength="3" aria-label="제품수량" />
                    <button role="button" aria-label="수량추가">
                      <span> &#43;</span>
                    </button>
                  </div>
                  <span class="total-price">4,980원</span>
                </div>
              </div>
            </div>
            <div class="total-price-result">
              <p>총 상품금액:<span class="price">4,980</span>원</p>
              <div class="login-benefits">
                <div class="accumulate-label">적립</div>
                <span>로그인 후, 적립 혜택 제공</span>
              </div>
            </div>
            <!-- 알림,좋아요, 장바구니 버튼 -->
            <div class="icons-wrap">
              <button class="icons" role="button" aria-label="알림설정아이콘">
                <img src="../../assets/product-detail/Bell.svg" alt="알림아이콘" />
              </button>
              <button class="icons" role="button" aria-label="좋아요아이콘">
                <img src="../../assets/product-detail/Heart.svg" alt="좋아요아이콘" />
              </button>
              <button class="cart" role="button" aria-label="장바구니담기">장바구니 담기</button>
            </div>
          </section>
        </section>
      `;

      $wrap.insertAdjacentHTML("beforebegin", template);

      // setTimeout(() => {
      //   // 특정해서 삭제함
      //   localStorage.removeItem(alt.split(" ")[0]);
      // }, 3000);
    });
};
goDetailpage();
