// ------------------------Modal-------------------------
const popupLinks = document.querySelectorAll('.button-popup');
const modalSuccess = document.querySelector('.modal-success');

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

(function () {
  //?????????????????? ??????????????????
  if (!Element.prototype.closest) {
    //??????????????????
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
  //?????????????????? ??????????????????
  if (!Element.prototype.matches) {
    //???????????????????? ????????????????
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();

// ------------------???????????? ?? ?????????????????? ??????????

$(document).ready(function () {
  $("#form").submit(function () {
    // ???????????????? ???? ?????????????? ?????????????????????? ??????????. ?????????????? html5 ??? required ???? ???????????????? (???? ???????????????????????????? Safari)
    if (document.form.phone.value == "") {
      valid = false;
      return valid;
    }
    $.ajax({
      type: "POST",
      url: "./php/telegram.php",
      data: $(this).serialize(),
    }).done(function () {
      $(".popup").removeClass("open");
      $(".modal-success").addClass("open");
      $(this).find("input").val("");
      $("#form").trigger("reset");
    });
    return false;
  });
});

// ?????????????? ?????????? ??????????????????

modalSuccess.addEventListener('click', function (e) {
  if (!e.target.closest('.popup-content')) {
    popupClose(e.target.closest('.popup'));
  }
});



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
