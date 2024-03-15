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

var data = [];
var str = [];
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  await fetch();
  res.render("index.ejs", { total: str.length, countries: str });
  //Write your code here.
});

app.post("/add", async (req, res) => {
  try{
  const check = await db.query("SELECT country_code from countries where country_code = ($1);",[req.body.country]);
  console.log(check.rows);
  if (check.rows.length > 0){
  if (str.findIndex((f) => f == req.body.country) == -1) {
    const result = await db.query(
      "INSERT INTO visited_countries(countrycode) VALUES ($1);",
      [req.body.country]
    );
  }
}
  await fetch();
  res.redirect("/");
}catch(err){
  await fetch();
    res.render("index.ejs",{error: err.message, total:str.length, countries:str});
  }
  // await fetch();
  // res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

async function fetch() {
  str.length = 0;
  try{
  const result = await db.query("SELECT countrycode FROM visited_countries");
  data = result.rows;
  for (var i = 0; i < data.length; i++) {
    str.push(data[i].countrycode);
  }
}catch(e){
  console.log(e);
}
  console.log(str);
}
