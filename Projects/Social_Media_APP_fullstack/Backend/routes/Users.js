import express from "express";
import pg from "pg";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from 'bcrypt';

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
  // console.log(req.body);
  try {
    if (req.body.username.length > 0 && req.body.password.length > 0) {
      const result = await db.query(
        "SELECT * FROM Users where username = $1",
        [req.body.username]
      );
      if (result.rowCount > 0) {
        const hashCheck= await bcrypt.compare(req.body.password, result.rows[0].password);
        if(hashCheck){
          const timestamp = Date.now();
          const userToken = jwt.sign({Userid: result.rows[0].id, timestamp}, process.env.secret);
          // console.log(userToken);
          try {
            await db.query("Update users set usertoken = $1 where id =$2", [userToken, result.rows[0].id]);
            res.send({
              userToken: userToken,
              message: "found",
            });
          } catch (e) {
            res.send({
              message: "Some Error Occurred",
            });
          }
        }else{
          res.send({id: -2,message:"Wrong password"});
        }
      } else {
        res.send({ id: -1, message: "Not found" });
      }
    } else {
      res.send({found:false});
    }
  } catch (e) {
    console.log(e.message);
  }
});

UserRouter.post("/new",async(req,res)=>{
  try{
    const username = req.body.username;
    const password = req.body.password;
    const encrypted=  await bcrypt.hash(password, 10);
    // console.log(username+" "+password+" "+encrypted);
    const result = await db.query("SELECT * FROM USERS WHERE USERNAME=$1",[username]);
    if(result.rowCount>0){
      res.send({code:1,error:"Username already exists"});
    }else{
      try{
        await db.query("INSERT INTO USERS(username, password) values ($1,$2)",[username,encrypted]);
        res.send({code:0});
      }catch(e){
        res.send({code:2, message:"some unknown error occurred"});
      }
    }
  }catch(e){
    console.log(e.message);
  }
})

UserRouter.post("/checkToken/:token", async (req, res) => {
  // console.log(req.params.token)
  try {
    const result = jwt.verify(req.params.token, process.env.secret);
    const id = await db.query("SELECT id from USERS where userToken = $1", [
      req.params.token,
    ]);
    if (id != undefined) {
      res.send({ check: 1, id: id.rows[0].id });
    } else {
      res.send({ check: 0, id: -1, error: "some error occurred" });
    }
  } catch (e) {
    res.send({ error: e.message });
  }
});

UserRouter.post("/new", async (req, res) => {});
export default UserRouter;
