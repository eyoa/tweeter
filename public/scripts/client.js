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



$(document).ready(function() {
  // renderTweets(data);
 
  const $newTweet = $("#new-tweet");

  $newTweet.on('submit', function(event) {
    console.log('submit event detected');
    event.preventDefault();
    console.log($(this).serialize());
    $.ajax({
      url: '/tweets/',
      type: 'post',
      data: $(this).serialize(),
      contentType: 'application/x-www-form-urlencoded'
    })
      .then(function(ar1, ar2, ar3) {
        console.log(`probably submitted`);
        console.log(`ar1 is ${ar1} ar2 is ${ar2} ar3 is ${ar3}`);
      });

  });

  



});
