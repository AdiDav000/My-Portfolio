import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL= "https://api.potterdb.com/v1/";
app.use(express.static("public"));
app.use(express.urlencoded({ extended:true}));

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "Waiting for data..." });
});
app.post("/type", (req, res) => {
    if (req.body["type"]=== "movies"){
            res.render("movies.ejs");
    }else if (req.body["type"]=== "books"){
            res.render("books.ejs");
    }else if (req.body["type"]=== "characters"){
            res.render("characters.ejs");
    }else if (req.body["type"]=== "potions"){
            res.render("potions.ejs");
    }else if (req.body["type"]=== "spells"){
            res.render("spells.ejs");
    }
});
app.post("/characters", async(req,res)=>{
    try{
        var response = await axios.get(API_URL+"characters/"+`${req.body["id"]}?filter[name_cont]=${req.body["name"]}`);
        const result = response.data;
        console.log(result);
        res.render("characters.ejs", {content: result.data});
    }
    catch(err){
        res.send(err.message);
    }
});
app.post("/books", async(req,res)=>{
    try{
        // if(req.body[""])
        var response;
        if(req.body["chapters"]==="on"){
            response = await axios.get(API_URL+"books/"+`${req.body["id"]}`+ `/chapters/${req.body["chapter-id"]}`);
        }else{
            response = await axios.get(API_URL+"books/"+`${req.body["id"]}`);
        }
        const result = response.data;
        console.log(result);
        res.render("index.ejs", {content: result});
    }
    catch(err){
        res.send(err.message);
    }
});
app.post("/movies", async(req,res)=>{
    try{
        const response = await axios.get(API_URL+`movies/${req.body["id"]}`);
        const result = response.data;
        res.render("index.ejs", {content: result});
    }
    catch(err){
        res.sendStatus(404);
    }
});
app.post("/potions", async(req,res)=>{
    try{
        const response = await axios.get(API_URL+`potions/${req.body["id"]}`);
        const result = response.data;
        res.render("index.ejs", {content: result});
    }
    catch(err){
        res.sendStatus(404);
    }
});
app.post("/spells", async(req,res)=>{
    try{
        const response = await axios.get(API_URL+`spells/${req.body["id"]}`);
        const result = response.data;
        res.render("index.ejs", {content: result});
    }
    catch(err){
        res.sendStatus(404);
    }
});
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})