import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  host: "localhost",
  password: "AdiDav000",
  user: "postgres",
  port: 5432,
  database: "Authentication practice",
});
db.connect();
const app = express();
const port = 3000;

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
  try {
    const check = await db.query("SELECT email from users where email = $1", [
      req.body.username,
    ]);
    if (check.rowCount > 0) {
      res.send("Email already exists");
    } else {
      const result = await db.query(
        "INSERT INTO users(email, password) values($1,$2)",
        [req.body.username, req.body.password]
      );
      res.redirect("/");
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM  users WHERE email = $1 and password = $2",
      [req.body.username, req.body.password]
    );
    if (result.rowCount > 0) {
      res.render("secrets.ejs");
    } else {
      res.send("Incorrect Password");
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
