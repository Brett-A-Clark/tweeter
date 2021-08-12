$(document).ready(function() {

// Fake data taken from initial-tweets.json
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
]

const createTweetElement = function(tweet) {
  const $tweet = $("<article>").addClass("tweet");
  const daysAgo = daysSinceTweet(tweetObj ["created_at"])

  const innerHTML = `
        <header>
            <span>${tweet.user.name}</span>
            <span class="handle">${tweet.user.handle}</span>
        </header>
        <span${tweet.content.text}</span>
        <footer>
          <span>${daysAgo} days ago</span>
          <span class="interactOptions">PIN RETWEET HEART</span>
        </footer>      
        `;
  $tweet.append(innerHTML);      
  return $tweet;
};

const daysSinceTweet = function(epochOfTweet) {
  const currentDate = new Date();
  const currentTime = currentDate.getTime();
  const millisecondsInDay = 86400000;
  const timeDifference = currentTime - epochOfTweet;
  const dayDifference = timeDifference/millisecondsInDay;
  return Math.floor(dayDifference);
}

const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $("section.tweet-container").append($tweet);
  }
};

renderTweets(data);

$(".new-tweet form").submit(function(event) {
  event.preventDefault();
  const $form = $(this);
  const tweet = $form.serialize();
  $.ajax({url: "/tweets/", method: "POST", data: tweet});
});

});