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

  //----------------------Slider Main---------------------
if (document.querySelector('.slider-container')){
  new Swiper('.slider-container', {
    direction: 'horizontal',
    loop: true,

    navigation: {
      nextEl: '.slider .swiper-button-next',
      prevEl: '.slider .swiper-button-prev',
    },

    slidesPerView: 1,

    autoplay: {
      delay: 5000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    }

  });
}

  //----------------------Slider Feedback---------------------
if (document.querySelector('.feedback-slider__container')) {

  new Swiper('.feedback-slider__container', {
    direction: 'horizontal',
    loop: true,

    navigation: {
      nextEl: '.feedback .swiper-button-next',
      prevEl: '.feedback .swiper-button-prev',
    },

    spaceBetween: 50,

    autoplay: {
      delay: 5000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    }

  });
}



// --------------------Scroll smooth--------------------
const menuLinks = document.querySelectorAll('.menu-link[data-goto]');
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight;
      
      if (iconMenu.classList.contains('_active')) {
        document.body.classList.remove('_lock');
        iconMenu.classList.remove('_active');
        menuBody.classList.remove('_active');
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    }
  }
}

// ---------------click burger----------------------
const iconMenu = document.querySelector('.menu-icon');
const menuBody = document.querySelector('.menu');
if (iconMenu) {
  iconMenu.addEventListener('click', function (e) {
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  });
}



