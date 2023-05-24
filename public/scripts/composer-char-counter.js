$(document).ready(function() {

  const updateCharacterCount = function(selector) {
    let text = $(selector).val();
    let count = 140 - text.length;
    $('.counter').text(count);

    if (count < 0) {
      $('.counter').addClass('negative');
    } else {
      $('.counter').removeClass('negative');
    }
  };

  $('.new-tweet textarea').on('input', function() {
    updateCharacterCount(this);
  });

  updateCharacterCount('.new-tweet textarea');
});

