
let gamePattern;
gamePattern = [];

let userClickedPattern;
userClickedPattern = [];

let started = false;

let buttonColors = ["red", "blue", "green", "yellow"];

let level;
level = 0;

$(document).keypress(function(){
    if (!started) {
        $("level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function(){
    let userChosenColor;
    userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length - 1);
});



function nextSequence(){
    
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor((Math.random() * (3 + 1)));
    randomChosenColor = buttonColors[randomNumber]; 
    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}




function playSound (color){
    let colorAudio;
    colorAudio = new Audio("sounds/" + color + ".mp3");
    colorAudio.play();    
}

// $(document).on("click", playSound(randomChosenColor));



function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}



function checkAnswer(currentLevel){

    // console.log(userClickedPattern[currentLevel])
    // console.log(gamePattern[currentLevel])

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){        
                
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        } 
               
    } else {

        let wrongAudio;
        wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);   

        $("#level-title").text("Game Over, Press Any Key to Restart");

        $(document).keydown(function(){
            startOver();
        });        
    }
}

function startOver (){
    level = 0;
    gamePattern = [];
    started = false;
}




