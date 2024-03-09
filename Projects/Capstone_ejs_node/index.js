import express from "express";
var posts = [];
const app = express();
const port = 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs", {posts: posts});
})

app.post("/new-post",(req,res)=>{
    var date = new Date();
    var datestring = date.toString().slice(3,21);
    posts.push({title: req.body["post-title"], content: req.body["post-content"], time: datestring});
    res.render("index.ejs", {posts:posts});
})
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})
