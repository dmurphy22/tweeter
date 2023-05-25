$(document).ready(() => {
  console.log("Ready");

  $('form').submit(function(event) {
    event.preventDefault();

    const $form = $(this);
    const formData = $form.serialize();
    const tweetContent = $form.find('textarea[name="text"]').val().trim();

    clearMessage();

    if (tweetContent === '') {
      showResult("Tweet content cannot be empty", true);
    } else if (tweetContent.length > 140) {
      showResult("Tweet content exceeds the maximum character limit of 140", true);
    } else {
      $.ajax({
        url: '/tweets',
        type: 'POST',
        data: formData,
        success: function(response) {
          console.log(response);
          showResult("You have tweeted!");
          loadTweets((tweets) => {
            $('#tweets-container').find('article').remove();
            const $tweet = renderTweets(tweets);
            $('#tweets-container').prepend($tweet);
          });
        },
        error: function(xhr, status, error) {
          console.log(error);
        }
      });
    }
  });

  const showResult = function(message, err = false) {
    const $errorMessage = err ? $('<p class="negative">').addClass('tweet-message').text(message) : $('<p>').addClass('tweet-message').text(message);
    $('form').append($errorMessage);
  };

  const clearMessage = function() {
    $('form').find('.tweet-message').remove();
  };

  const createTweetElement = function(tweet) {
    const user = tweet.user;
    const content = tweet.content;

    let $article = `
    <article class="tweet">
      <div id="header">
        <img src="${user.avatars}" alt="Profile Picture">
        <div class="user-info">
          <h5>${user.name}</h5>
          <span>${user.handle}</span>
        </div>
      </div>
      <div class="tweets-content">
        <p>${content.text}</p>
      </div>
      <div id="footer">
        <time class="timeago" datetime="${tweet.created_at}"></time>
        <div id="icons">
          <a href="#" class="like-icon"><i class="fa-solid fa-flag"></i></a>
          <a href="#" class="retweet-icon"><i class="fas fa-retweet"></i></a>
          <a href="#" class="comment-icon"><i class="fa-solid fa-heart"></i></a>
        </div>
      </div>
    </article>`;

    return $article;
  };

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }

    $('time.timeago').each(function() {
      $(this).text(timeago.format($(this).attr('datetime')));
    });
  };

  const loadTweets = function(callback) {
    $.ajax({
      url: '/tweets',
      type: 'GET',
      success: function(response) {
        console.log(response);
        callback(response);
      },
      error: function(xhr, status, error) {
        console.log(error);
      }
    });
  };

  loadTweets((tweets) => {
    const $tweet = renderTweets(tweets);
    $('#tweets-container').prepend($tweet);
  });
});
