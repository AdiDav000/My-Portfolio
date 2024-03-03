for (var i=0;i<document.querySelectorAll(".drum").length;i++){
    document.querySelectorAll(".drum")[i].addEventListener("click", function (){
        var instrument = this.innerHTML;
        playSound(instrument);
        playAnimation(instrument);
     });
}
document.addEventListener("keydown", function(e){playSound(e.key); playAnimation(e.key);});
function playSound(key){
    if(key === "w"){
        var w=new Audio("./sounds/crash.mp3");
        w.play();
    }
    if(key === "a"){
        var a=new Audio("./sounds/kick-bass.mp3");
        a.play();
    }
    if(key === "s"){
        var s=new Audio("./sounds/snare.mp3");
        s.play();
    }
    if(key === "d"){
        var d=new Audio("./sounds/tom-1.mp3");
        d.play();
    }
    if(key === "j"){
        var j =new Audio("./sounds/tom-2.mp3");
        j.play();
    }
    if(key === "k"){
        var k=new Audio("./sounds/tom-3.mp3");
        k.play();
    }
    if(key === "l"){
        var l=new Audio("./sounds/tom-4.mp3");
        l.play();
    } 
 }

 function playAnimation(key){
    document.querySelector("."+key).classList.add("pressed");
    setTimeout(function() {
        document.querySelector("."+key).classList.remove("pressed");
    }, 100);
 }