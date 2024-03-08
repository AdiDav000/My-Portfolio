import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var num = 0;
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  num += req.body["fname"].length + req.body["lname"].length;
  res.render("index.ejs",{num:num});
  num = 0;
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
