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
    const $errorMessage = err ? $('<p>').addClass('tweet-message').addClass('err').text(message) : $('<p>').addClass('tweet-message').addClass('pos').text(message);
    $('#feedback').append($errorMessage);
  };

  const clearMessage = function() {
    $('form').find('.tweet-message').remove();
  };

  const escape = function(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    const user = tweet.user;
    const content = tweet.content;

    const $article = $(`
      <article class="tweet">
        <div id="header">
          <img src="${escape(user.avatars)}" alt="Profile Picture">
          <div class="user-info">
            <h5>${escape(user.name)}</h5>
            <span>${escape(user.handle)}</span>
          </div>
        </div>
        <div class="tweets-content">
          <p>${escape(content.text)}</p>
        </div>
        <div id="footer">
          <time class="timeago" datetime="${escape(tweet.created_at)}"></time>
          <div id="icons">
            <a href="#" class="like-icon"><i class="fa-solid fa-flag"></i></a>
            <a href="#" class="retweet-icon"><i class="fas fa-retweet"></i></a>
            <a href="#" class="comment-icon"><i class="fa-solid fa-heart"></i></a>
          </div>
        </div>
      </article>
    `);

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
