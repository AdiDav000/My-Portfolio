import express from "express";
import pg from "pg";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const db = new pg.Client({
    user:"postgres",
    password:"AdiDav000",
    host:"localhost",
    database:"world",
    port:5432
});
db.connect();
var data = [];
db.query("SELECT * FROM CAPITALS", (err,res)=>{
    if(err){
        console.log(err.message);
    }else{
        data = res.rows;
        console.log(data);
    }
    db.end();
})

var totalCount = 0;
var currentQuestion;
app.get("/",async(req,res)=>{
    totalCount = 0;
    await nextQuestion();
    console.log(currentQuestion);
    res.render("index.ejs", {country: currentQuestion});
})

app.post("/check", (req,res)=>{
    const ans = req.body.answer;
    if(checkAnswer(ans)){
        totalCount += 1;
        nextQuestion();
        res.render("index.ejs",{country: currentQuestion, totalCorrect: totalCount});
    }else{
        totalCount = 0;
        res.render("index.ejs",{country: currentQuestion, totalCorrect: totalCount});
    };   
})
function checkAnswer(ans){
    const correctAnswer = data.find((d)=>d.country === currentQuestion);
    // console.log()
    if (correctAnswer.capital === ans){
        return true;
    }
    else{
        return false;
    }
}

async function nextQuestion (){
    var index = Math.floor(Math.random()*data.length);
    currentQuestion = data[index].country;
    console.log(data[index].capital);
}

app.listen(3000, ()=>{
    console.log("Listening");
})