import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "AdiDav000",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

// let users = [];

async function getUsers(){
  const result = await db.query("SELECT * from users");
  let users = [];
  for (let i=0;i<result.rows.length;i++){
    users.push(result.rows[i]);
  }
  return users;
}
async function checkVisisted() {
  const result = await db.query("SELECT countrycode FROM visited_countries where user_id = $1",[currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.countrycode);
  });
  return countries;
}
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const users = await getUsers();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: users[currentUserId-1].color,
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      console.log(countryCode);
      await db.query(
        "INSERT INTO visited_countries (countrycode, user_id) VALUES ($1,$2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  currentUserId = req.body.user;
  if(req.body.add == undefined){
  const countries = await checkVisisted();
  const users = await getUsers();
  const result = db.query("Select * from users where id = $1",[currentUserId]);
  res.render("index.ejs",{countries: countries,total:countries.length,users:users, color:users[currentUserId-1].color})}

  else{
    res.render("new.ejs");
  }
});

app.post("/new", async (req, res) => {
  const result = await db.query("insert into users(name, color) values($1,$2)",[req.body.name, req.body.color]);
  res.redirect("/");
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
