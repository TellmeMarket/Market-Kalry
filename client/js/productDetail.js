const $wrap = document.querySelector(".detail-page");
const $detail = document.querySelector(".detail-lnb");
const bid = window.location.href.split("id=")[1];
const goDetailpage = () => {
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((data) => {
      const result = data.filter((el) => el.id === bid)[0];
      let name = result.name;
      let img = result.image.thumbnail;
      let alt = result.image.alt;
      let description = result.description;
      let price = result.price;
      let type = result.type;
      let view = result.image.view;
      let detailInfo = result.image.info;

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
                  <span>${name}</span>
                  <div class="product-quantity">
                    <button role="button" aria-label="수량감소">
                      <span>&#45;</span>
                    </button>
                    <input placeholder="0" class="quantity" maxlength="3" aria-label="제품수량" />
                    <button role="button" aria-label="수량추가">
                      <span> &#43;</span>
                    </button>
                  </div>
                  <span class="total-price">${price}원</span>
                </div>
              </div>
            </div>
            <div class="total-price-result">
              <p>총 상품금액:<span class="price">${price}</span>원</p>
              <div class="login-benefits">
                <div class="accumulate-label">적립</div>
                <span>로그인 후, 적립 혜택 제공</span>
              </div>
            </div>
            <div class="icons-wrap">
              <button class="icons" role="button" aria-label="좋아요아이콘">
                <img src="../../assets/product-detail/Heart.svg" alt="좋아요아이콘" />
              </button>
              <button class="icons" role="button" aria-label="알림설정아이콘">
                <img src="../../assets/product-detail/Bell.svg" alt="알림아이콘" />
              </button>
              <button class="cart" role="button" aria-label="장바구니담기">장바구니 담기</button>
            </div>
          </section>
        </section>
      `;
      let template2 = /* html */ `
      <section class="detail-info" id="detail-info" role="tabpanel" aria-labelledby="lnb-info">
          <img src="./../../assets/${view}" class="detail-product-img" alt="${alt}" tabindex="0" />
          <div>
            <p class="product-name-modifier" tabindex="0" aria-label="상품 수식어">${description}</p>
            <h4 class="product-name" tabindex="0" aria-label="상품 이름">${name}</h4>
            <h5 class="product-desc" tabindex="0" aria-label="상품 설명">
              쫄면의 진가는 매콤새콤한 양념과 탱탱한 면발에서 찾을 수 있지요. 풀무원은 이 맛을 더 부담 없이 즐길 수 있도록 튀기지 않고 만든 탱탱쫄면을 선보입니다. 밀가루와 감자 전분을 적절히 배합해 탄력이 좋고, 입에 넣었을 때는 찰지게 씹히죠.
              고추장을 넣어 숙성한 비빔장은 자연스럽고 깊은 맛을 냅니다. 간단하게 조리해 마지막 한 가닥까지 탱탱한 식감을 즐겨보세요. 취향에 따라 다양한 고명을 올려 드셔도 좋아요.
            </h5>
          </div>
        </section>
        <section class="detail-check-point">
          <h4 class="check-title" tabindex="0" aria-label="칼리의 체크 포인트">Karly's Check Point</h4>
          <img src="./../../assets/product-detail/checkImage.png" class="check-point-img" alt="마켓컬리의 체크 포인트 이미지" tabindex="0" />
        </section>
        <div class="detail-info2" id="detail-info2" role="tabpanel" aria-labelledby="lnb-info2">
          <img src="./../../assets/${detailInfo}" class="detail-product-img2" alt="제품의 크기와 영양성분 이미지" tabindex="0" />
        </div>
        <section class="detail-why-karly">
          <h4 class="why-karly-title" tabindex="0" aria-label="칼리에서 구매해야하는 이유">WHY KARLY</h4>
          <div class="why-karly-list">
            <dl>
              <dt class="why-karly-item-title" tabindex="0">깐깐한 상품위원회</dt>
              <dd class="why-karly-txt" tabindex="0">나와 내 가족이 먹고 쓸 상품을 고르는 마음으로 매주 상품을 직접 먹어보고, 경험해보고 성분, 맛, 안정성 등 다각도의 기준을 통과한 상품만을 판매합니다.</dd>
            </dl>
            <dl>
              <dt class="why-karly-item-title" tabindex="0">차별화된 Kurly Only 상품</dt>
              <dd class="why-karly-txt" tabindex="0">전국 각지와 해외의 훌륭한 생산자가 믿고 선택하는 파트너, 컬리. 3천여 개가 넘는 컬리 단독 브랜드, 스펙의 Kurly Only 상품을 믿고 만나보세요.</dd>
            </dl>
            <dl>
              <dt class="why-karly-item-title" tabindex="0">신선한 풀콜드체인 배송</dt>
              <dd class="why-karly-txt" tabindex="0">온라인 업계 최초로 산지에서 문 앞까지 상온, 냉장, 냉동 상품을 분리 포장 후 최적의 온도를 유지하는 냉장 배송 시스템, 풀콜드체인으로 상품을 신선하게 전해드립니다.</dd>
            </dl>
            <dl>
              <dt class="why-karly-item-title" tabindex="0">고객, 생산자를 위한 최선의 가격</dt>
              <dd class="why-karly-txt" tabindex="0">매주 대형 마트와 주요 온라인 마트의 가격 변동 상황을 확인해 신선식품은 품질을 타협하지 않는 선에서 최선의 가격으로, 가공식품은 언제나 합리적인 가격으로 정기 조정합니다.</dd>
            </dl>
            <dl>
              <dt class="why-karly-item-title" tabindex="0">환경을 생각하는 지속 가능한 유통</dt>
              <dd class="why-karly-txt" tabindex="0">친환경 포장재부터 생산자가 상품에만 집중할 수 있는 직매입 유통구조까지, 지속 가능한 유통을 고민하며 컬리를 있게 하는 모든 환경(생산자, 커뮤니티, 직원)이 더 나아질 수 있도록 노력합니다.</dd>
            </dl>
          </div>
        </section>
      `;

      $wrap.insertAdjacentHTML("beforebegin", template);
      $detail.insertAdjacentHTML("afterend", template2);
    });
};
goDetailpage();
