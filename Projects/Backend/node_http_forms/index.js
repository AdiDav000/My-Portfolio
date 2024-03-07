import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const _dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
var bandname="";
app.use(bodyParser.urlencoded({extended:true}));
function bandnameGenerator(req, res, next){
    bandname = req.body["street"] + req.body["pet"];
    next();
}
app.use(bandnameGenerator);
app.get('/',(req,res)=>{
    res.sendFile(_dirname+"/index.html");
})
app.post('/submit',(req,res)=>{
    // bandname = req.body["street"] + req.body["pet"]; Another option instead of using middleware;
    res.send(`<h1> Your band name is</h1><h2>${bandname}</h2>`);
})
app.listen(3000,()=>{
    console.log("Listening on port 3000");
})