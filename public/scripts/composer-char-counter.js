$(document).ready(function() {

  const updateCharacterCount = function(selector) {
    let text = $(selector).val();
    let count = 140 - text.length;
    $('.counter').text(count);
    $('.counter').toggleClass('negative', count < 0);
  };

  $('.new-tweet textarea').on('input', function() {
    updateCharacterCount(this);
  });

  updateCharacterCount('.new-tweet textarea');

  // JavaScript code for scroll-to-top button functionality
  let scrollToTopBtn = $('#scroll-to-top');

  $(window).scroll(function() {
    scrollToTopBtn.toggle(window.pageYOffset > 100);
  });

  scrollToTopBtn.click(function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

});
