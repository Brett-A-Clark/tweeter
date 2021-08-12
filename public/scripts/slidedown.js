$(document).ready(function() {
  
  const $tweetButton = $("#tweet-button");
  $tweetButton.on("click", () => {
    if ($(".counter").val() < 0) { 
      $(".slideDown").slideDown("slow");
      setTimeout(() => { 
        $(".slideDown").slideUp("slow");
      }, 5000);
    }
  });
});  