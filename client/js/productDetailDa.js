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
/*                                  후기 작성 팝업창                                 */
/* -------------------------------------------------------------------------- */
//후기 작성하기 버튼, 팝업창 가져오기
const getReviewWriteBtn = document.querySelector(".detail-review-btn");
const getPopupReview = document.querySelector(".popup-back-review");
const getBody = document.querySelector("body");

//가져온 버튼을 클릭 시 후기 작성하는 팝업창 열기
function openPopupReview() {
  getPopupReview.style.display = "block";
  getBody.style.overflow = "hidden";
}

getReviewWriteBtn.addEventListener("click", openPopupReview);

//후기 작성하기 닫기, X 버튼 팝업창 닫기
const getReviewCloseBtn = document.querySelector(".review-btn-close");
const getReviewCancelBtn = document.querySelector(".review-btn-cancel");

//가져온 버튼을 클릭 시 팝업창 닫기
getReviewCloseBtn.addEventListener("click", closePopupReview);
getReviewCancelBtn.addEventListener("click", closePopupReview);

function closePopupReview() {
  getPopupReview.style.display = "none";
  getBody.style.overflow = "auto";
}

/* -------------------------------------------------------------------------- */
/*                                  문의 작성 팝업창                                 */
/* -------------------------------------------------------------------------- */
//문의 작성하기 버튼, 팝업창 가져오기
const getInquiryWriteBtn = document.querySelector(".detail-inquiry-btn");
const getPopupInquiry = document.querySelector(".popup-back-inquiry");

//가져온 버튼을 클릭 시 문의하는 팝업창 열기
getInquiryWriteBtn.addEventListener("click", openPopupInquiry);

function openPopupInquiry() {
  getPopupInquiry.style.display = "block";
  getBody.style.overflow = "hidden";
}

//문의 작성하기 닫기, X 버튼 팝업창 닫기
const getInquiryCloseBtn = document.querySelector(".inquiry-btn-close");
const getInquiryCancelBtn = document.querySelector(".inquiry-btn-cancel");

//가져온 버튼을 클릭시 팝업창 닫기
getInquiryCloseBtn.addEventListener("click", closePopupInquiry);
getInquiryCancelBtn.addEventListener("click", closePopupInquiry);

function closePopupInquiry() {
  getPopupInquiry.style.display = "none";
  getBody.style.overflow = "auto";
}

/* -------------------------------------------------------------------------- */
/*                               알림 아이콘 클릭 시 색 변경                              */
/* -------------------------------------------------------------------------- */
// const getLikeWrap = document.querySelector(".icons");
// const getLikeIcon = document.querySelector(".icon-heart");

// let cnt = 1;
// function setColor() {
//   if (cnt % 2 == 1) {
//     getLikeIcon.src = "../../assets/product-detail/heart-full.svg";
//   } else {
//     getLikeIcon.src = "../../assets/product-detail/heart.svg";
//   }
//   cnt++;
// }
// getLikeWrap.addEventListener("click", setColor);
