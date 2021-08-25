// ------------------------Modal-------------------------
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 700;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
        bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup-content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}
function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnlock();
    }
    
  }
}

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
            // el.style.transition = '';
          }, timeout);
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('_lock');
  });

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

(function () {
  //проверяем поддержку
  if (!Element.prototype.closest) {
    //руализуем
    Element.prototype.closest = function (css) {
      var node = this;
      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentsElement;
      }
      return null;
    };
  }
})();
(function () {
  //проверяем поддержку
  if (!Element.prototype.matches) {
    //определяем свойство
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();

// ------------------Работа с отправкай формы

$(document).ready(function () {
  $("#form").submit(function () {
    // проверка на пустоту заполненных полей. Атрибут html5 — required не подходит (не поддерживается Safari)
    if (document.form.phone.value == "") {
      valid = false;
      return valid;
    }
    $.ajax({
      type: "POST",
      url: "./php/telegram.php",
      data: $(this).serialize(),
    }).done(function () {
      $(".modal").removeClass("open");
      $(".modal-success").addClass("open");
      $(this).find("input").val("");
      $("#form").trigger("reset");
    });
    return false;
  });
});

// Закрыть попап «спасибо»

$(document).mouseup(function (e) {
  // по клику вне попапа
  var popup = $(".modal__body");
  if (e.target != popup[0] && popup.has(e.target).length === 0) {
    $(".modal-success").removeClass("open");
    $("body").removeClass("_lock");
    $("body").removeAttr("style");
  }
});

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

      mySwiper.slideTo(index);
    });
  });

}

// ----------------------Masks-------------------
window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.popup-orders__phone'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+38 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)
    
    

  });

});
