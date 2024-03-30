import express from "express";
import pg from "pg";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const db = new pg.Client({
  host: "localhost",
  password: "AdiDav000",
  database: "social_media_app",
  port: 5432,
  user: "postgres",
});
db.connect();
app.get("/posts", async (req, res) => {
  const result = await db.query(
    "SELECT posts.id,post_title, post_text,likes, user_id,date, username, image FROM posts join users on posts.user_id=users.id order by date desc"
  );
  res.send(result.rows);
});

app.put("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  console.log(parseInt(req.query.abc));
  console.log(id);
  // await db.query("UPDATE posts SET TABLE SET LIKES = $1",[req.body.likes])
});
app.post("/posts/new", async (req, res) => {
  console.log(req.body);
  const date = new Date();
  const result = await db.query(
    "INSERT INTO posts(post_title,post_text,likes,user_id,date) VALUES($1,$2,$3,$4,$5)",
    [
      req.body.title,
      req.body.content,
      req.body.likes,
      req.body.user_id,
      date.toISOString(),
    ]
  );
  res.send(result);
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
