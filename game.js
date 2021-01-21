var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern= [];
var started = false;
var level = 0;


//for responding from the keyboard in the start of the game
$(document).keypress(function() {
  if (!started) {// !started = true cause started= false

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//to get the mouse response 
$(".btn").click(function(){
		//2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  	var userChosenColour = $(this).attr("id");

	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);

	checkAnswer(userClickedPattern.length - 1);
});


//to get the current level of user
function checkAnswer(currentLevel){

	if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
		if(userClickedPattern.length === gamePattern.length){
			setTimeout(function(){
				nextSequence();
			}, 1000);
		}
	}else{
		playSound("wrong");
		$("body").addClass("game-over");
		$("#level-title").text("Game Over, Press Any Key to Restart");
		setTimeout(function () {
        $("body").removeClass("game-over");
      	}, 200);

		startOver();
	}


}

//generating a randomNumber to get random colour
function nextSequence(){

	userClickedPattern=[];

	level++;

	$("#level-title").text("Level " + level);

	var randomNumber =Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColour);
}


//adding class preesed for the css effect after pressing the button
function animatePress(currentColour){

	$("#"+ currentColour).addClass("pressed");

	setTimeout(function(){
		$("#" + currentColour).removeClass("pressed");
	}, 100);

}


//for sound in the background
function playSound(name){

	var audio = new Audio("sounds/" + name +".mp3");
	audio.play();
}


//for restarting the game
function startOver(){

  level =0;
  started= false;
  gamePattern = [];

}