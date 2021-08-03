//Menu Scrolled
let scrollTop = pageYOffset;
const toggleClass = document.querySelector('.header');

window.addEventListener("scroll", function () {
  if (pageYOffset > scrollTop) {
    toggleClass.classList.add("page-scrolled");
  } else {
    toggleClass.classList.remove("page-scrolled");
  }
  scrollTop = 0;
});
  //-------------------------------------------------------Menu Scrolled End--------------------

const swiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});