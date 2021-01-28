/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// prevent XSS by escaping text
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// the tweet object info into tweet form (html)
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
      <p class="content">${escape(tweetData.content.text)}</p>
    <footer>
      <span>${timeAgo}</span>
      <span class="icons"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></span>
    </footer>
  </article>

  `);
  return $tweet;
};

// attaches array of tweet objects onto DOM
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('.tweets-container').append($tweet);
  }
};

// Ajax gets the objects from server
const loadtweets = function() {
  $.ajax({
    url: '/tweets/',
    type: 'get'
  })
    .done(function(response) {
      renderTweets(response);
    })
    .fail(err => console.log(err));

};



$(document).ready(function() {
  // make these easy to refer to
  const newTweetCon = $('.new-tweet-container');
  const errMsg = $('.errorMsg');
  const toTopBtn = $('#toTopBtn');
  
  // Initialize state when page first loads
  loadtweets();
  errMsg.hide();
  newTweetCon.hide();
  toTopBtn.hide();

  // when nav button is clicked
  $('.writeNew').children('.fas').on('click', function() {
    if (newTweetCon.is(":visible")) {
      newTweetCon.slideUp();
    } else {
      newTweetCon.slideDown();
      $('#new-tweet').find('textarea').focus();
    }
  });

  //when back to top button is clicked
  toTopBtn.on('click', function() {
    if (newTweetCon.is(":hidden")) {
      newTweetCon.slideDown();
    }
    $(document).scrollTop(-($('nav').height()));
    $('#new-tweet').find('textarea').focus();
  });


  // When scrolling show back to top button
  $(document).on('scroll', function(event) {
    if ($(this).scrollTop() > 400) {
      newTweetCon.slideUp();
      toTopBtn.show();
    } else {
      toTopBtn.hide();
    }
  });

  // submit to post new tweet
  const $newTweet = $("#new-tweet");

  $newTweet.on('submit', function(event) {
    if (errMsg.is(":visible")) {
      errMsg.hide();
    }

    event.preventDefault();
    const textbox = $(this).find('textarea');
    const tweetLength = textbox.val().length;

    if (tweetLength <= 0) {
      const $error = `<span> Tweet is empty </span>`;
      errMsg.find('span').empty();
      errMsg.append($error);
      errMsg.slideDown();
      return;
    } else if (tweetLength > 140) {
      const $error = `<span> Tweet is longer than 140 chrs </span>`;
      errMsg.find('span').empty();
      errMsg.append($error);
      errMsg.slideDown();
      return;
    } else {
      $.ajax({
        url: '/tweets/',
        type: 'post',
        data: $(this).serialize(),
        contentType: 'application/x-www-form-urlencoded',
      })
        .done(function() {
          // empty the text field and reset counter for prettiness
          // clear existing tweets and reload including new one
          // kinda not efficient but it works.
          textbox.val("");
          textbox.parent().find('.counter').val(140);
          $('.tweet-container').empty();
          loadtweets();
        })
        .fail(err => console.log(err));
    }
  });


});
