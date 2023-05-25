/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  console.log("Ready");
  const createTweetElement = function(tweet) {
    const user = tweet.user;
    const content = tweet.content;
    // const $article = $("<article>").addClass("tweet");
    // const $header = $("<header>");
    // const $avatar = $("<img>").addClass("avatar").attr("src", tweet.user.avatars);
    // const $username = $("<span>").addClass("username").text(tweet.user.name);
    // const $handle = $("<span>").addClass("handle").text(tweet.user.handle);
    // const $content = $("<div>").addClass("content").text(tweet.content.text);
    // const $footer = $("<footer>").text(new Date(tweet.created_at).toLocaleString());
  
    // $header.append($avatar, $username, $handle);
    // $article.append($header, $content, $footer);

    let $article =
    `
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
      <p>10 days ago</p>
      <div id="icons">
        <a href="#" class="like-icon"><i class="fa-solid fa-flag"></i></a>
        <a href="#" class="retweet-icon"><i class="fas fa-retweet"></i></a>
        <a href="#" class="comment-icon"><i class="fa-solid fa-heart"></i></a>
      </div>
    </div>
  </article>     
    `;
  
    return $article;
  };

  const renderTweets = function(tweets) {

    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);

    }
    
  };
  
  
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  
  const $tweet = renderTweets(data);
  console.log($tweet); // Displays the tweet element in the console
  $('#tweets-container').prepend($tweet); // Adds the tweet element to the page

});

