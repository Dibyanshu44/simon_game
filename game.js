var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("h1").text("level "+level);
//    record();
}
$(".btn").click(function(event){
        var userChosenColor=$(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        check(userClickedPattern.length-1);
    });
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    },100);
}
var started=false;
function start(){
    if(!started){
        level=0;
        gamePattern=[];
        userClickedPattern=[];
        setTimeout(function(){
            $("h1").text("Starting in...3");
        },1000);
        setTimeout(function(){
            $("h1").text("Starting in...2");
        },2000);
        setTimeout(function(){
            $("h1").text("Starting in...1");
        },3000);
        setTimeout(nextSequence,4000);
        started=true;
    }
}
var level=0;
function check(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            userClickedPattern=[];
            setTimeout(nextSequence, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
            started=false;
        }, 200);
        
    }
}
$(document).keydown(start);
$(document).click(start);

