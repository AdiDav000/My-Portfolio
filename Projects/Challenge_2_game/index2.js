var pattern = []; 
var userPattern = [];
var level = 1;
var started = false;

$(document).on("keydown",function(){
    if(!started){
        $("body").removeClass("game-over");
        $('h1').text("Level - "+level);
        started=true;
        setTimeout(function(){
            nextSequence();
        }, 500);
    }
})

var current = 0;
$(".card").on("click",function(e){
    $('#'+e.target.id).addClass("pressed");
    setTimeout(function(){
        $('#'+e.target.id).removeClass("pressed");
    },100);
    if(started){
        userPattern.push(e.target.id);
        check();
    }
})
function nextSequence(){
    var r = Math.random()*4;
    r=Math.floor(r)+1;
    pattern.push(r);
    $('#'+r).addClass("pressed");
    setTimeout(function(){
        $('#'+r).removeClass("pressed");
    },100);
}

function check(){
    // var index = 0;
    console.log(userPattern);
    console.log(pattern);
    // while(index<userPattern.length){
    console.log(current);
        if(userPattern[current]==pattern[current]){
            current++;
            if(userPattern.length==pattern.length){
                level++;
                $('h1').text("Level - "+level);
                console.log("you won");
                userPattern.length=0;
                current = 0;
                setTimeout(function(){
                    nextSequence();
                }, 1000);
                // nextSequence();
            }
        }
        else{
            console.log("you lost");
            $("h1").text("Game Over. Press any key to start again");
            $("body").addClass("game-over");
            restartGame();
        }
        // index++;
    // }
}

function restartGame(){
    started = false;
    index=0;
    level=1;
    current = 0;
    userPattern.length=0;
    pattern.length=0;
}
