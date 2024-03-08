import express from "express";
const app = express();
import {dirname} from "path";
import { fileURLToPath } from "url";
const _dirname = dirname(fileURLToPath(import.meta.url));

var date = new Date();
var day = date.getDay();
let type = "Weekday";
let advice= "Work Hard!";
if(day === 6 || day ===7){
    type= "Weekend";
    advice = "Have Fun!";
}
app.get('/',(req,res)=>{
    res.render(_dirname+"/index.ejs",{ dayType: type, advice:advice});
})
app.listen(3000,()=>{
    console.log("Listening...");
})