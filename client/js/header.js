// header sticky!

export const headerFunc = () => {
  const $banner = document.querySelector(".top-banner");
  const $nav = document.querySelector(".header-nav");

  const headerSticky = ((_) => {
    return () => {
      let base = (localStorage.getItem("hide-banner") ? 0 : $banner.offsetHeight) + document.querySelector(".header-top").offsetHeight;
      $nav.classList.toggle("active", (pageYOffset || scrollY) >= base);
      if ($nav.classList.contains("active")) [...$nav.children].forEach((el) => el.classList.add("active"));
      else [...$nav.children].forEach((el) => el.classList.remove("active"));
    };
  })();
  headerSticky();

  // hideBanner Part
  localStorage.getItem("hide-banner") ? ($banner.style.display = "none") : $banner.classList.add("active");

  const bannerHide = (e) => {
    e.preventDefault();
    !localStorage.getItem("hide-banner") && e.target.closest(".close-button") && $banner.classList.remove("active");
    localStorage.setItem("hide-banner", "hide");
  };

  // eventList
  addEventListener("scroll", headerSticky);
  $banner.addEventListener("click", bannerHide);
};
headerFunc();
