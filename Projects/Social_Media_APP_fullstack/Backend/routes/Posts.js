import express from "express";
import pg from 'pg';

const db = new pg.Client({
    host: "localhost",
  password: "AdiDav000",
  database: "social_media_app",
  port: 5432,
  user: "postgres",
})
db.connect();

const router = express.Router();
router.get("/", async (req, res) => {
    const result = await db.query(
      "SELECT posts.id,post_title, post_text,likes, user_id,date, username, image FROM posts join users on posts.user_id=users.id order by date desc"
    );
    res.send(result.rows);
  });
  
  router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await db.query("UPDATE posts SET LIKES = $1 where id = $2", [req.body.likes, id]);
    res.send("Success");
  });
  
  router.delete("/:id",async (req,res)=>{
    const id = parseInt(req.params.id);
    const result = await db.query("Delete from posts where id = $1",[id]);
    res.send("Success");
  })
  router.post("/new", async (req, res) => {
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

export default router