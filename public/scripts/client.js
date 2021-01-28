
// Prevent XSS by escaping text - sterilizes str
const escape =  function(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Creates the element from the tweet object info retrieved from server
// Other info is fake generated by the server
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

// Attaches array of tweet objects onto DOM
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

// Toggles composeBox when writeNew button is clicked newTweetCon the new tweet element
const toggleComposeBox = function(newTweetCon, errBox) {
  const textarea = $('#new-tweet').find('textarea');
  textarea.val('');
  errBox.slideUp();

  if (newTweetCon.is(":visible")) {
    newTweetCon.slideUp();
  } else {
    newTweetCon.slideDown();
    textarea.focus();
  }
};

// Shows error msg element and put in error message
const displayError = function(errBox, msg) {
  const $error = `<span>${msg}</span>`;
  errBox.find('span').empty();
  errBox.append($error);
  errBox.slideDown();
};

// Ajax post request submitting tweet
const postNewTweet = function(content, textbox) {
  $.ajax({
    url: '/tweets/',
    type: 'post',
    data: content,
    contentType: 'application/x-www-form-urlencoded',
  })
    .done(function() {
      // Empty the text field and reset counter for prettiness
      // Clear existing tweets and reload including new one

      textbox.val("");
      textbox.parent().find('.counter').val(140);
      $('.tweet-container').empty();
      loadtweets();
    })
    .fail(err => console.log(err));
};

// Scrolls page to the top - functionality of back to Top button
const scrollToTop = function(newTweetCon) {
  if (newTweetCon.is(":hidden")) {
    newTweetCon.slideDown();
  }
  $(document).scrollTop(-($('nav').height()));
  $('#new-tweet').find('textarea').focus();
};

// Initialization and Event listeners below

$(document).ready(function() {
  // Make these easy to refer to
  const newTweetCon = $('.new-tweet-container');
  const toTopBtn = $('#toTopBtn');
  const errBox = $('.errorMsg');

  // Initialize state when page first loads
  loadtweets();
  $('.errorMsg').hide();
  newTweetCon.hide();
  toTopBtn.hide();

  // When writeNew button is clicked
  $('.writeNew').on('click', function() {
    toggleComposeBox(newTweetCon, errBox);
  });

  // When back to top button is clicked
  toTopBtn.on('click', function() {
    scrollToTop(newTweetCon);
  });

  // When scrolling show back to top button
  $(document).on('scroll', function() {
    if ($(this).scrollTop() > 400) {
      newTweetCon.slideUp();
      toTopBtn.show();
    } else {
      toTopBtn.hide();
    }
  });

  // Submit to post new tweet
  $("#new-tweet").on('submit', function(event) {
    event.preventDefault();
    
    if (errBox.is(":visible")) {
      errBox.hide();
    }

    const textbox = $(this).find('textarea');
    const tweetLength = textbox.val().length;
    const data = $(this).serialize();

    if (tweetLength <= 0) {
      displayError(errBox, "Tweet is empty");
      return;
    } else if (tweetLength > 140) {
      displayError(errBox, "Tweet is longer than 140 chars");
      return;
    } else {
      postNewTweet(data, textbox);
    }
  });

});
