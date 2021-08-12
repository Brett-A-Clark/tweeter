$(document).ready(function() {

  const createTweetElement = function(tweetData) {
    const time = timeago.format(tweet.created_at);
    const $avatars = $(`<img src="${tweet.user.avatars}">`);
    const $name = $("<h6>").text(`${tweet.user.name}`);
    const handle = $(`<h6 style="margin-left: auto; padding: 2px">`).text(`${tweet.user.handle}`);
    const $header = $("<header>").addClass("tweet-header");
    $header.append($avatars, $name, $handle);

    const $body = $("<body>").addClass("tweet-body").text(`${tweet.content.text}`);

    const $time = $("<h6>").text(`${time}`);
    const $icon = $(`<h6><i class="fas fa-flag"></i><i class="fas fa-retweet" style="margin: 0.2em"></i><i class="fas fa-heart">`).addClass('icons');
    const $footer = $('<footer>').addClass('tweet-footer');
    $footer.append($time, $icon);

    const $article = $('<article>').addClass('tweet-container');
    $article.append($header, $body, $footer);

    return $article;
  };
    
  const renderTweets = function(tweets) {
    $("#tweet-container").empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweet-container").prepend($tweet);
    }
  };

  const loadTweets = function() {
    $.ajax("/tweets", { method: "GET" })
    .then(function (tweetContainer) {
      renderTweets(tweetContainer);
    })
  }
  loadTweets();


  $(".new-tweet form").submit(function(event) {
    event.preventDefault();
    const $form = $(this);
    const newTweetTextStr = $form.children('textarea').val();

    if (!newTweetTextStr) {
      alert("All tweets must contain at least one character. Your tweet currently does not.");
    } else if (newTweetTextStr.length > 140) {
      alert("We do not accept tweets longer than 140 characters. Your tweet is currently too long.");
    } else {

      const tweet = $form.serialize();
      $.ajax({ url: "/tweets/", method: 'POST', data: tweet })
      .then (function (postRequestReturnValue) {
        return $.ajax('/tweets', { method: 'GET' })
      })
      .then (function (getRequestReturnValue) {
        const latestTweet = [getRequestReturnValue[getRequestReturnValue.length - 1]];
        renderTweets(latestTweet);
      })
    }
  })
});