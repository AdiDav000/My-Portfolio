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

const UserRouter = express.Router();
UserRouter.post("/check",async(req,res)=>{
    console.log(req.body)
    if(req.body.username.length >0 && req.body.password.length >0){
        const result = await db.query("SELECT * FROM Users where username = $1 and password = $2",[req.body.username,req.body.password]);
        if(result.rowCount>0){
            res.send({
                id:result.rows[0].id,
                message:"found",
            });
        }else{
            res.send({id:-1, message:"Not found"})
        }
    }else{
        res.send("H");
    }
})
export default UserRouter;