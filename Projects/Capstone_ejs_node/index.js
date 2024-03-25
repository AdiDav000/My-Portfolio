import express from "express";
import pg from "pg";
// var posts = [];
var currentUserId = 1;
const app = express();
const port = 3000;
const db = new pg.Client({
    user:"postgres",
    password:"AdiDav000",
    host:"localhost",
    database:"social_media_app",
    port:5432,
})
db.connect();
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", async(req,res)=>{
    let posts = await getPosts();
    res.render("index.ejs", {posts: posts});
})

app.post("/new-post",async (req,res)=>{
    var date = new Date();
    var datestring = date.toString().slice(3,21);
    // posts.push({title: req.body["post-title"], content: req.body["post-content"], time: datestring});
    const result = await db.query("INSERT INTO POSTS(post_title, post_text, likes, user_id, date) VALUES($1,$2,$3,$4,$5)",
    [req.body["post-title"], req.body["post-content"], 0, currentUserId,date]);
    res.redirect("/");
})
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})

async function getPosts(){
    const result = await db.query("SELECT * FROM POSTS");
    let posts = result.rows;  
    return posts;
}
