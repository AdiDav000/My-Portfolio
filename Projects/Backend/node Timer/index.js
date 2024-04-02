import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

var timer
var date1;
const timerf = ()=>{
    date1.setTime(date1.getTime()+1000);
    console.log(date1.toString());
}

app.get("/",(req,res)=>{
    const date = new Date();
    date1=date
    timer = setInterval(timerf,1000);
    res.send("Success");
})
app.get("/stop",(req,res)=>{
    clearInterval(timer);
    res.send("Stopped");
})

app.listen(3000,()=>{
    console.log("Listening to port 3000");
})