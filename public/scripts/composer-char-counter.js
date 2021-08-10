$(document).ready(function() {

  $('.new-tweet textarea').on('input', function() {
    const newTweetLength = $(this).val().length;
    const counterRed = $(this).siblings('.counter');
    const tweetLimit = 140;

    if (newTweetLength > tweetLimit) {
      counterRed.addClass('tweetTooLong');
    } else if (newTweetLength <= tweetLimit) {
      counterRed.removeClass('tweetTooLong');
    }
    counterRed.text(tweetLimit - newTweetLength);
  });
});

