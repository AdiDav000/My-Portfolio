import express from "express";
import pg from "pg";
import jwt from "jsonwebtoken";
import "dotenv/config";

const db = new pg.Client({
  host: "localhost",
  password: "AdiDav000",
  database: "social_media_app",
  port: 5432,
  user: "postgres",
});
db.connect();

const UserRouter = express.Router();
UserRouter.post("/check", async (req, res) => {
  console.log(req.body);
  if (req.body.username.length > 0 && req.body.password.length > 0) {
    const result = await db.query(
      "SELECT * FROM Users where username = $1 and password = $2",
      [req.body.username, req.body.password]
    );
    if (result.rowCount > 0) {
      const userToken = jwt.sign(result.rows[0].id, process.env.secret);
      try {
        await db.query("Update users set usertoken = $1", [userToken]);
        res.send({
          userToken: userToken,
          message: "found",
        });
      } catch (e) {
        res.send({
          message: "Some Error Occurred",
        });
      }
    } else {
      res.send({ id: -1, message: "Not found" });
    }
  } else {
    res.send("H");
  }
});

UserRouter.post("/checkToken/:token", async (req, res) => {
  // console.log(req.params.token)
  try {
    const result = jwt.verify(req.params.token, process.env.secret);
    const id = await db.query("SELECT id from USERS where userToken = $1", [
      req.params.token,
    ]);
    if (result == 1 && id != undefined) {
      res.send({ check: result, id: id.rows[0].id });
    } else {
      res.send({ check: 0, id: -1, error: "some error occurred" });
    }
  } catch (e) {
    res.send({ error: e.message });
  }
});

UserRouter.post("/new", async (req, res) => {});
export default UserRouter;
