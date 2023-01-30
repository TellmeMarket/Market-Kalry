const data = [
  {
    id: 1,
    src: "banner01.png",
    alt: "10월 20일에서 10월 27일까지 하는 멜론 9900원 행사링크 배너",
  },
  {
    id: 2,
    src: "banner02.png",
    alt: "10월 1일에서 10월 31일까지 하는 이달의 카드 혜택 알림링크 배너",
  },
  {
    id: 3,
    src: "banner03.png",
    alt: "10월 24일에서 10월 28일까지 하는 KAKRLY PUPLE WEEK 쿠폰 혜택 알림링크 배너",
  },
  {
    id: 4,
    src: "banner04.png",
    alt: "이 주의 특가 한눈에 보기 링크 배너",
  },
];

const swiper1 = new Swiper(".swiper-1", {
  autoplay: {
    speed: 500,
    disableOnInteraction: false,
  },
  loop: true,
  navigation: {
    nextEl: ".swiper1-button-next",
    prevEl: ".swiper1-button-prev",
  },
});
