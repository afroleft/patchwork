$(document).ready(function(){

  $('#toggle-overlay-menu').click(function() {
    $(this).children('.overlay-toggle__icon').toggleClass('active');
    $('#overlay-menu').toggleClass('open');
    $('html#totality').toggleClass('overlay-menu-open');
    $('body').toggleClass('overlay-menu-open');
    $('.view-container').toggleClass('overlay-menu-open');
  });

}); // end document ready
