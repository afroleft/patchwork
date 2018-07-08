$(document).ready(function(){

  $('#toggle-overlay-menu').click(function() {
    $(this).toggleClass('active');
    $(this).children('.overlay-toggle__icon').toggleClass('active');
    $('#overlay-menu').toggleClass('open');
    $('html#totality').toggleClass('overlay-menu-open');
    $('body').toggleClass('overlay-menu-open');
    $('.view-container').toggleClass('overlay-menu-open');
  });

  var scroll = new SmoothScroll('a[href*="#"]');


  var options = {
    stringsElement: '#typed-strings',
    typeSpeed: 60,
    backSpeed: 20,
    startDelay: 2000,
    loop: true,
    smartBackspace: true
  }

  var typed = new Typed("#typed", options);

}); // end document ready
