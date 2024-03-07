//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";

const _dirname= dirname(fileURLToPath(import.meta.url));
const app = express();

var check = false;
app.use(bodyParser.urlencoded({extended:true}));
function checker(req, res, next){
    if (req.body["password"]==="ILoveProgramming"){
        check = true;
    }
    else{
        check = false;
    }
    next();
}
app.use(checker);
app.get('/',(req, res)=>{
    res.sendFile(_dirname+"/public/index.html");
})

app.post ('/check',(req, res)=>{
    if(check === true){
        res.sendFile(_dirname+"/public/secret.html");
    }
    else{
        // res.send("<h1>Wrong Password, Try again</h1>");
        res.redirect("/");
    }
})

app.listen(3000,()=>{
    console.log("Listening....");
})