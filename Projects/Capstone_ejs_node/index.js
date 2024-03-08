import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
const _dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render(_dirname+"/homepage/index.ejs");
})
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})