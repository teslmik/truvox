'use strict';


const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
const productsItems = document.querySelector('.products-items');
const popups = document.querySelector('.popups');

const timeout = 300;

let unlock = true;



const getData = async function (url) {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Помилка за адресою ${url}, статус помилки ${response.status}!`);
  }

  return await response.json();

};

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
  
  if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
      el.style.transition = 'none';
    }
  }
  
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('_lock');


  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnlock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
          el.style.paddingRight = '0px';
          setTimeout(function () {
            el.style.transition = '';
          }, timeout);
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('_lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

// function popupLinkId() {
//   const popupLink = document.querySelectorAll('.popup-link');
//   popupLink.forEach((el, index) => {
//     el.setAttribute('data-index', index);
//     el.addEventListener('click', (e) => {
//       const index = parseInt(e.currentTarget.dataset.index);
//     });

//   });
// }

function sliderPopups() {
      //----------------------Slider Popups---------------------
  if (document.querySelector('.popup-slider__container')) {

    const mySwiper = new Swiper('.popup-slider__container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      spaceBetween: 100,

      slidesPerView: 1,

      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },

    });


    // ---------------------------Slider Nav-------------------------
    const sliderNavItems = document.querySelectorAll('.slider-nav__item');

    sliderNavItems.forEach((el, index) => {
      el.setAttribute('data-index', index);

      el.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.dataset.index);

        mySwiper.slideTo(index+1);
      });
    });

  }
}


function createCardProducts(products) {

  const { title, label_stock: labelStock, label_order: labelOrder, label_new: labelNew, image, action_list: actionList, product
        } = products;

  const card = `
    <article class="products-item popup-link" data-products="${product}">
      <div class="item-product__labels">
        <div class="actions-product__existence">${labelStock}<!-- в наявності <i class='fas fa-check'></i> --></div>
        <div class="actions-product__existence in-order">${labelOrder}<!-- під замовлення <i class='far fa-dot-circle'></i> --></div>
        ${labelNew}<!-- <div class='item-product__label'>Новинка</div> -->
      </div>
      <div class="item-product__image">
        <img src="/img/products/${image}" alt="${title}">
      </div>
      <div class="item-product__body">
        <div class="item-product__content">
          <h3 class="item-product__title">${title}</h3>
          <div class="item-product__price"></div>
        </div>
      </div>
      <aside class="item-product__actions actions-product">
        <div class="actions-product__body">
          <div class="actions-product__text">
            Основні характеристики:
            <ul class="actions-list">${actionList}</ul>
          </div>
        </div>
      </aside>
    </article>
  `;

  productsItems.insertAdjacentHTML('beforeend', card);
}

function createCardGoods(goods) {

  const { id, title, label_stock: labelStock, label_order: labelOrder, label_new: labelNew, swiperImage1, swiperImage2, swiperImage3, swiperImage4, description, specificationTable } = goods;

  const card = document.createElement('div');
  card.className = 'popup' + ` ${id}`;

  card.insertAdjacentHTML('beforeend', `
    
    <div class="popup-body">
      <div class="popup-content">
        <div class="popup-close close-popup"><i class="fas fa-times"></i></div>
        <div class="action-product__existance existance-product">${labelStock}</div>
        <div class="action-product__existance existance-product in-order">${labelOrder}</div>
        <div class="item-product__labels">${labelNew}</div>
        <div class="popup-title">
          <h3 class="item-product__title product-title__popup">${title}</h3>
        </div>
        <div class="popup-text">
          <div class="popup-slider__block">
            
            <div class="popup-slider__container swiper-container">
                <div class="popup-slider__wrapper swiper-wrapper">
                  <div class="popup-slider__slide swiper-slide">
                    <div class="popup-slide__img">
                      <img src="/img/products/${swiperImage1}" alt="">
                    </div>
                  </div>
                  <div class="popup-slider__slide swiper-slide">
                    <div class="popup-slide__img">
                      <img src="/img/products/${swiperImage2}" alt="">
                    </div>
                  </div>
                  <div class="popup-slider__slide swiper-slide">
                    <div class="popup-slide__img">
                      <img src="/img/products/${swiperImage3}" alt="">
                    </div>
                  </div>
                  <div class="popup-slider__slide swiper-slide">
                    <div class="popup-slide__img">
                      <img src="/img/products/${swiperImage4}" alt="">
                    </div>
                  </div>
                </div>
            </div>
            <div class="popup-slider__nav slider-nav">
              <div class="slider-nav__item"><img src="/img/products/${swiperImage1}" alt=""></div>
              <div class="slider-nav__item"><img src="/img/products/${swiperImage2}" alt=""></div>
              <div class="slider-nav__item"><img src="/img/products/${swiperImage3}" alt=""></div>
              <div class="slider-nav__item"><img src="/img/products/${swiperImage4}" alt=""></div>
            </div>
          </div>
            
          <div class="popup-text__main">
            <div class="popup-orders">
              <h2 class="order-title">Зробити замовлення</h2>
              <form class="modal-callback__form" id="form1" action="#">
                <div class="modal-form__body">
                  <div class="modal-form__phone">
                    <input type="text" id="user_name" name="user_name" placeholder="Ваше Имя" class="modal-input-name"/>
                    <input type="phone" id="phone" name="phone" placeholder="Тел.: +38 (___) ___-__-__" class="modal-phone-number phone" required/>
                  </div>
                  <button type="submit" class="modal-form__btn">
                    Відправити
                  </button>
                </div>
                <div class="modal-form__note">
                  Натискаючи кнопку "Відправити", ви даєте згоду на обробку ваших персональних данних
                </div>
              </form>
              <!-- <form id="form1" method="POST" name="form1" class="popup-orders__form" action="">
                <input type="text" class="popup-orders__name" placeholder="Ваше Ім'я">
                <input type="phone" class="popup-orders__phone" placeholder="Тел: +38(___) ___-__-__">
              
                <p class="conf">Натискаючи кнопку "Відправити", ви даєте згоду на обробку ваших персональних данних</p>
                <button id="submitButton" type="submit" class="form-popup__btn">Відправити</button>
              </form> -->
            </div>
            <div class="popup-text__specification">
              <span class="popup-text__description">${description}</span>
              <table class="specification-table">
                <caption><p class="specification-title">Характеристики:</p></caption>
                ${specificationTable}
              </table>
            </div>
          </div>  
        </div>
      </div>
    </div>
  `);

  popups.insertAdjacentElement('beforeend', card);
  sliderPopups();
  
  const popupLinks = document.querySelectorAll('.popup-link');
  const modal = document.querySelector(`.${id}`);
  const closePopup = document.querySelector('.close-popup');
  const popupActive = document.querySelector('.popup.open');

  if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      toggleModalOpen();
    }

    function toggleModalOpen() {
      modal.classList.add('open');
      bodyLock();
      modal.addEventListener('click', function (e) {
        if (!e.target.closest('.popup-content')) {
          popupClose(e.target.closest('.popup'));
        }
      });
    }

    function popupClose(popupActive, doUnlock = true) {
      popupActive = document.querySelector('.popup.open');
      if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
          bodyUnlock();
        }
      }
    }
    
    closePopup.addEventListener('click', popupClose);

  }

  const form = document.getElementById('form1');
  const modalSuccess = document.querySelector('.modal-success');

  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();
    let error = 0;
    let formData = new FormData(form);
    const popupActive = document.querySelector('.popup.open');
    
    if (error === 0) {
      let response = await fetch('telegram.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        popupClose(popupActive, false);
        popupOpen(modalSuccess);
        form.reset();
      } else {
        alert('Помилка');
      }
    } else {
      alert('Заповніть обов`язкові поля!');
    }
  }

}

function openGoods(event) {
  const target = event.target;

  const product = target.closest('.products-item');

  if (product) {
    popups.textContent = '';

    getData(`./json/${product.dataset.products}`).then(function (data) {
      data.forEach(createCardGoods);
    })
  };

}

function init() {
  getData('./json/products.json').then(function (data) {
    data.forEach(createCardProducts);
  });

  productsItems.addEventListener('click', openGoods);
  
}

init();