import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrpypt from "bcrypt";

const app = express();
const port = 3000;
//Salt Rounds
const saltRounds = 10;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Authentication practice",
  password: "AdiDav000",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      bcrpypt.hash(password,saltRounds , async (err,hash)=>{
        const result = await db.query(
          "INSERT INTO users (email, password) VALUES ($1, $2)",
          [email, hash]
        );
        console.log(result);
        res.render("login.ejs");
      });
      // const result = await db.query(
      //   "INSERT INTO users (email, password) VALUES ($1, $2)",
      //   [email, password]
      // );
      // console.log(result);
      // res.render("secrets.ejs");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;
      bcrpypt.compare(password,storedPassword,(err,result)=>{
        if(err){
          console.log(err);
        }else{
          if(result == true){
            res.render("secrets.ejs");
          }else{
            res.send("Incorrect Password");
          }
        }
      })
      // bcrpypt.hash(password, saltRounds,(err,hash)=>{
      //   console.log(hash);
      //   if (hash === result.rows[0].password) {
      //     res.render("secrets.ejs");
      //   } else {
      //     res.send("Incorrect Password");
      //   }
      // })
      // if (password === storedPassword) {
      //   res.render("secrets.ejs");
      // } else {
      //   res.send("Incorrect Password");
      // }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
