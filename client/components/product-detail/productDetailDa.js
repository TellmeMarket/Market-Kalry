/* -------------------------------------------------------------------------- */
/*                      상품 메뉴 클릭 시 클릭 이벤트 발생 및 CSS 추가, 삭제                     */
/* -------------------------------------------------------------------------- */
//서브메뉴 아이템 토글 시 스타일 변경
//서브메뉴 아이템 요소리스트 가져오기
const getSubmenuItem = document.querySelectorAll(".lnb-item");

//가져온 아이템을 토글 시 스타일 추가/제거
getSubmenuItem.forEach((target) =>
  target.addEventListener("click", function clickSubmenuItem(e) {
    e.target.classList.toggle("lnb-item-selected");
  })
);

/* -------------------------------------------------------------------------- */
/*                         클릭 시 팝업창 열림(후기 작성하기, 문의하기)                         */
/* -------------------------------------------------------------------------- */
//후기 작성하기
//후기 작성하기 버튼, 팝업창 가져오기
const getReviewWriteBtn = document.querySelector(".detail-review-btn");
console.log(getReviewWriteBtn);
const getPopupReview = document.querySelector(".popup-review");
console.log(getPopupReview);

//가져온 버튼을 클릭 시 후기 작성하는 팝업창 열기
// display: none -> display: block;
getReviewWriteBtn.addEventListener("click", openPopupReview);

function openPopupReview() {
  getPopupReview.style.display = "block";
}

//문의하기
//문의 작성하기 버튼, 팝업창 가져오기
const getInquiryWriteBtn = document.querySelector(".detail-inquiry-btn");
console.log(getInquiryWriteBtn);
const getPopupInquiry = document.querySelector(".popup-inquiry");
console.log(getPopupInquiry);

//가져온 버튼을 클릭 시 문의하는 팝업창 열기
// display: none -> display: block;
getInquiryWriteBtn.addEventListener("click", openPopupInquiry);

function openPopupInquiry() {
  getPopupInquiry.style.display = "block";
}
