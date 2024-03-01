// document.getElementsByClassName("h1").
function randomNumber(i){
    var arr=["./images/dice1.png", "./images/dice2.png","./images/dice3.png","./images/dice4.png","./images/dice5.png",
    "./images/dice6.png"];
    var n = Math.random() * 6;
    n = Math.floor(n);
    document.querySelector(".img"+i).setAttribute("src",arr[n]);
    return n;
}
function checkWinner(i, j){
    if (i>j){
        document.querySelector("h1").innerHTML="Winner is Player 1";
    }
    else if (i<j){
        document.querySelector("h1").innerHTML="Winner is Player 2";
    }
    else{
        document.querySelector("h1").innerHTML="It's a draw";
    }
}
var i = randomNumber(1);
var j = randomNumber(2);
checkWinner(i,j);