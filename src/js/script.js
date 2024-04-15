// jQuery

$(document).ready(function () {
  // **********  Slick carousel

  $('.carousel__inner').slick({
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="./icons/left.svg"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="./icons/right.svg"></button>',
    responsive: [
      {
        breakpoint: 991,
        settings: {
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  });

  // **********  Tabs

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
      .addClass('catalog__tab_active')
      .siblings()
      .removeClass('catalog__tab_active')
      .closest('div.wrapper')
      .find('div.catalog__content')
      .removeClass('catalog__content_active')
      .eq($(this).index())
      .addClass('catalog__content_active');
  });

  // **********  Rotate item to describe and back

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });
  }

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  // **********  Progress line on the top of the document

  $(function () {
    $('body').prognroll({
      height: 5,
      color: '#c70101',
    });
  });

  // **********  Modal windows

  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn();
  });

  $('.modalwin__close').on('click', function () {
    $('.overlay, #consultation, #order, #thanks').fadeOut();
  });

  $(document).keydown(function (event) {
    if (event.keyCode == 27) {
      $('.overlay, #consultation, #order, #thanks').fadeOut();
    }
  });

  $('.overlay').on('click', function (event) {
    if ($(event.target).is('.overlay')) {
      $('.overlay, #consultation, #order, #thanks').fadeOut();
    }
  });

  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modalwin__descr').text($('.catalog-item__sub').eq(i).text());
      $('.overlay, #order').fadeIn();
    });
  });

  // **********  Forms validation

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: 'required',
        phone: 'required',
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: 'Please enter your name',
        phone: 'Please enter your phone number',
        email: {
          required: 'We need your email to contact you',
          email: 'Your email must look like name@domain.com',
        },
      },
    });
  }

  validateForms('#consultation .back-form');
  validateForms('#order .back-form');
  validateForms('#consultation-form');

  // **********  Mask for form inputs
  $('input[name=phone]').mask('+1 (999) 999-999');

  // **********  Form request sending

  const forms = document.querySelectorAll('form');

  forms.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();

      const request = new XMLHttpRequest();
      const url = '/mailer/smart.php';
      request.open('POST', url, true);

      request.setRequestHeader('Content-Type', 'application/json');
      request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
          const jsonData = JSON.parse(request.response);
        }
      };

      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');
      setTimeout(() => {
        $('.overlay, #thanks').fadeOut('slow');
      }, 2000);

			 // document.querySelector('.overlay').fadeOut();
      // document.querySelector('.overlay').style.display = 'none';
      // document.querySelector('.overlay, #thanks').fadeIn('slow');

      const name = formElement.querySelector('input[name="name"]').value;
      const phone = formElement.querySelector('input[name="phone"]').value;
      const email = formElement.querySelector('input[name="email"]').value;

      const data = JSON.stringify({name: name, phone: phone, email: email});

      request.send(data);

      formElement.querySelector('input[name="name"]').value = '';
      formElement.querySelector('input[name="phone"]').value = '';
      formElement.querySelector('input[name="email"]').value = '';

      new WOW().init();
    });
  });

  // $('form').submit(function (e) {
  //   e.preventDefault();

  //   if (!$(this).valid()) {
  //     return;
  //   }

  //   $.ajax({
  //     type: 'POST',
  //     url: 'mailer/smart.php',
  //     data: $(this).serialize(),
  //   }).done(function () {
  //     $(this).find('input').val('');
  //     $('#consultation, #order').fadeOut();
  //     $('.overlay, #thanks').fadeIn('slow');

  //     $('form').trigger('reset');
  //   });
  //   return false;
  // });

  new WOW().init();

  // **********  JS
  const arrowOnTop = document.querySelector('.on-top');
  window.addEventListener('scroll', () => {
    document.documentElement.scrollTop > 300
      ? (arrowOnTop.style.visibility = 'visible')
      : (arrowOnTop.style.visibility = 'hidden');
  });

  arrowOnTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}); // the end document.ready
