$(document).ready(function() {
  console.log("document is ready");

  $("#tweet-text").autoResize();

  $("#tweet-text").on("input", function() {
    let charsLeft = 140 - ($(this).val().length);
    const countEle = $(this).parent().children().children(".counter");
    countEle.val(charsLeft);
    
    if (charsLeft < 0) {
      countEle.css("color", "red");
    } else {
      countEle.css("color", "black");
    }
  });

});
