// product list menu 부분의 is-active 효과
const button = document.querySelectorAll('.menu-button');

for (let i = 0; i < button.length; i++) {
  button[i].addEventListener("click", function() {
    let count = 0;
    while(count<button.length){
      button[count++].classList.remove('is-active');
    }
    this.classList.add("is-active");
  });
}