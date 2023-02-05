//상품 메뉴 클릭 시 클릭 이벤트 발생 및 CSS 추가, 삭제
//서브메뉴 아이템 토글 시 스타일 변경

//서브메뉴 아이템 요소리스트 가져옴
let getSubmenuItem = document.querySelectorAll(".lnb-item");
console.log(getSubmenuItem);

//가져온 아이템을 토글 시 스타일 추가/제거
getSubmenuItem.forEach((target) =>
  target.addEventListener("click", function clickSubmenuItem(e) {
    e.target.classList.toggle("lnb-item-selected");
    console.log(e.target);
  })
);
