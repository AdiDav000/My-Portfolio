import express from "express";
import pg from "pg";
import router from "./routes/Posts.js";
import UserRouter from "./routes/Users.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow the HTTP methods you need
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow the headers you need
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

app.use("/posts",router);
app.use("/users",UserRouter);
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
