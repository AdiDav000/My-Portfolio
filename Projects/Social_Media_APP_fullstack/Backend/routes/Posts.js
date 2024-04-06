import express from "express";
import pg from "pg";
// import jwt from 'jsonwebtoken'

const db = new pg.Client({
  host: "localhost",
  password: "AdiDav000",
  database: "social_media_app",
  port: 5432,
  user: "postgres",
});
db.connect();

const router = express.Router();
router.get("/", async (req, res) => {
  const usertoken = req.query.token || "";
  // console.log(usertoken);
  try {
    const result = await db.query(
      "SELECT posts.id,post_title, post_text,posts.likes,likes.likes as like, posts.user_id ,date, username, image FROM posts join users on posts.user_id=users.id left join likes on posts.id=likes.post_id AND likes.user_id = (select id from users where usertoken=$1) order by date desc",
      [usertoken]
    );
    res.send(result.rows);
  } catch (e) {
    console.log(e.message);
  }
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const usertoken = req.query.token || "";
  const like = req.query.like || null;
  // console.log(id + " " + usertoken + " " + like);
  try {
    await db.query("UPDATE posts SET LIKES = $1 where id = $2", [
      req.body.likes,
      id,
    ]);
    const result = await db.query(
      "SELECT * FROM LIKES WHERE post_id = $1 and user_id=(Select id from USERS where usertoken=$2)",
      [id, usertoken]
    );
    if (result.rowCount > 0) {
      await db.query(
        "UPDATE LIKES SET likes=$1 where user_id=(select id from users where usertoken=$2) and post_id = $3",
        [like, usertoken, id]
      );
    } else {
      await db.query(
        "INSERT INTO LIKES(post_id,user_id,likes) VALUES($1 ,(select id from USERS where usertoken=$2),$3)",
        [id, usertoken, like]
      );
    }
    // await db.query("UPDATE ")
    res.send("Success");
  } catch (e) {
    console.log(e.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await db.query("Delete from posts where id = $1", [id]);
    res.send("Success");
  } catch (e) {
    console.log(e.message);
  }
});
router.post("/new", async (req, res) => {
  try {
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
  } catch (e) {
    console.log(e.message);
  }
});

export default router;
