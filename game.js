var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function() {
  // if true
  if (!started) {
    // change the h1 title to the level number
    $("level-title").text("level " + level);
    nextSequence();
    started = true;
  }

});

$(".btn").click(function() {
  // stores the id of the button that got clicked
  var userChosenColour = $(this).attr("id");

  // adds the userChosenColour to the userClickedPattern array
  userClickedPattern.push(userChosenColour);

  //console.log(userClickedPattern);

  // plays sound
  playSound(userChosenColour);

  // creates a animated effect
  animatePress(userChosenColour);

  // checks if the answer is correct
  checkAnswer(userClickedPattern.length - 1)
});

function checkAnswer(currentLevel) {
  // if
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
  }

  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function nextSequence() {

  // resets the userClickedPattern for the next level
  userClickedPattern = [];
  // increases the level
  level++;

  $("#level-title").text("Level " + level);

  // random number generator
  var randomNumber = Math.floor(Math.random() * 4);

  // using the RNG generate a random colour
  var randomChosenColour = buttonColours[randomNumber];

  // add the random colour to the gamePattern array
  gamePattern.push(randomChosenColour);

  // create a flash animation for the random colour
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // plays sound
  playsound(randomChosenColour);
}

function playSound(name) {
  // play audio for the random number
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  // adds class pressed to the current colour
  $("#" + currentColour).addClass("pressed");

  // removes the pressed class after 100 milliseconds to create a animated effect
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  // resets all values
  level = 0;
  gamePattern = [];
  started = false;
}
