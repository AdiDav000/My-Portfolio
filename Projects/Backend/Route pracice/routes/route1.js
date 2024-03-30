import express from 'express';
const router = express.Router();

router.get("/hello",(req,res)=>{
    res.send("Hello");
    console.log("Hello");
})

export default router