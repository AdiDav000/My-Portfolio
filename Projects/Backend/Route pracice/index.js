import express from 'express';
import router from './routes/route1.js'
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/users",router);

app.listen(3000,()=>{
    console.log("Listening on port 3000");
})

