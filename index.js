var level = 0;
var startToggle = true;
$("body").keypress(function() {
  if (startToggle == true) {
    nextSequence();
  }
});
var buttonColors = ["red", "blue", "green", "yellow"];
for (var i = 0; i < 4; i++) {
  $("." + buttonColors[i]).click(handler);
}
var gamePattern = [];
var userClickedPattern = [];

function nextSequence(){
  startToggle = false;
  userClickedPattern = [];
  level++;
  $("h1").text("Level-"+level);
  var random_no = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[random_no];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  $("." + randomChosenColour).addClass("pressed");
  setTimeout(function() {
    $("." + randomChosenColour).removeClass("pressed");
  }, 100);
}

function handler() {
  $(this).addClass("pressed");
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  setTimeout(function() {
    $("#" + userChosenColour).removeClass("pressed");
  }, 100);

  checkAnswer(userClickedPattern.length - 1);

}
function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
    $("h1").text("Game Over, Press Any Key to Restart");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
            $("body").removeClass("game-over");
    },200);
    startOver();
  }else{
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
          nextSequence();
      }, 1000);
    }
  }
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver(){
  startToggle=true;
  level=0;
  gamePattern = [];
}
