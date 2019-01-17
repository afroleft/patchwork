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

  if(location.pathname == "/"){

    var options = {
      stringsElement: '#typed-strings',
      typeSpeed: 60,
      backSpeed: 20,
      startDelay: 2000,
      loop: true,
      smartBackspace: true
    }

    var typed = new Typed("#typed", options);

  }

  // BMJ announcement Board
  var current = new Date();
  var goLive  = new Date("November 1, 2018 17:19:00");

  if(current.getTime()>goLive.getTime()){
     $('#announcement-bmj').addClass('fadeInUp');
  }

  // Homepage Video

  if ($('.embeded-video-section').length > 0) {
    $('.embed-container-play').on('click', function(){
        $(this).fadeOut();
        $('.embed-container-poster').fadeOut();
        $(this).parent().append('<iframe src="https://www.youtube.com/embed/' + $(this).attr('data-youtube-id') + '?rel=0&amp;modestbranding=1&amp;autoplay=1" frameborder="0" allowfullscreen></iframe>');
    });
  }

}); // end document ready
