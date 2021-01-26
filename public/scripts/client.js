/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetData) {
  const timeAgo = moment(tweetData.created_at).fromNow();

  const $tweet = $(`
    <article class="tweet">
    <header>
      <div>
        <img class="avatar" src= ${tweetData.user.avatars}>
        <h3 class="name">${tweetData.user.name}</h3>
      </div>
      <span class="alias">${tweetData.user.handle}</span>
    </header>
      <p class="content">${tweetData.content.text}</p>
    <footer>
      <span>${timeAgo}</span>
      <span><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></span>
    </footer>
  </article>

  `);
  return $tweet;
};


const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('.tweets-container').append($tweet);
  }
};

const loadtweets = function() {
  $.ajax('/tweets/', {method: 'GET'})
    .then(function(response) {
      renderTweets(response);
    });
};

$(document).ready(function() {
  loadtweets();

  const $newTweet = $("#new-tweet");

  $newTweet.on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      url: '/tweets/',
      type: 'post',
      data: $(this).serialize(),
      contentType: 'application/x-www-form-urlencoded'
    })
      .then(function(ar1, ar2, ar3) {
        console.log('sent to the server success');
      });

  });

  



});
