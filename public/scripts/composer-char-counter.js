$(document).ready(function() {

  const $text = $("#tweet-text");
  $text.on("input", function() {
    const characterLimit = 140;
    const value = $("#tweet-text").val().length;
    $(".counter").val(characterLimit - value);

    if (characterLimit - value >= 0) {
      $("output").removeClass("CounterRed");
    } else if (characterLimit - value < 0) {
      $("output").addClass("CounterRed");
    }
  });
});

