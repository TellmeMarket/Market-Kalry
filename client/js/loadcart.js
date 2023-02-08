import { loadStorage } from "../lib/utils/storage.js";

export const loadCart = () => {
  loadStorage("cart-product").then((data) => {
    let cartCnt = 0;
    if (data == null) {
      document.querySelectorAll(".search-icon-cart-add").forEach((el) => {
        el.classList.remove("active");
      });
    } else if (Object.prototype.toString.call(data).slice(8, -1).toLowerCase() === "object") {
      document.querySelectorAll(".search-icon-cart-add").forEach((el) => {
        el.classList.add("active");
      });
      cartCnt = 1;
    } else {
      cartCnt = data.length;
      document.querySelectorAll(".search-icon-cart-add").forEach((el) => {
        el.classList.add("active");
      });
    }
    document.querySelectorAll(".search-icon-cart-add").forEach((el) => {
      el.innerHTML = cartCnt;
    });
  });
};

loadCart();
