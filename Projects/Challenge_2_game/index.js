var pattern = []; 
var userPattern = [];
var level = 1;
var started = true;
if(started == true){
    $(document).on("keydown",function(){
        $('h1').text("Level - "+level);
        nextSequence();
        started=false;
    })
}

function nextSequence(){
    var i = 0;
    while(i<level){
        var r = Math.random()*4;
        r=Math.floor(r)+1;
        pattern.push(r);
        $('#'+r).addClass("pressed");
        setTimeout(function(){
            $('#'+r).removeClass("pressed");
        },100);
        i++;
    }
}
// function check(){
//     var i=0;
//     $(".card").on("click",function(event){
//         $('#'+event.target.id).addClass("pressed");
//         // while(i<buttons.length){
//             if(event.target.id==buttons[i]){
//                 level+=1;
//                 $('h1').text("Level - "+level);
//                 setTimeout(playGame(),2000);
//                 i++;
//             }
//             else{
//                 $("body").css("background-color","red");
//                 $("h1").text("Game Over");
//                 // gameover=true;
//             }
//         // }
//         setTimeout(function(){
//             $('#'+event.target.id).removeClass("pressed");
//         },100);
//         // console.log(buttons);
//     })
// }

// function checkPress(id){
//     if(id==buttons[key]){
//         level+=1;
//         // playGame();
//         setTimeout(playGame(),2000);
//     }
//     else{
//         $("body").css("background-color","red");
//         $("h1").text("Game Over");
//         gameover=true;
//     }
    
// }
