import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`https://bored-api.appbrewery.com/random`);
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);
  try{
    // var response;
    // var result;
    // if(req.body["participants"]==="" && req.body["type"]===""){
    //   response = await axios.get(`https://bored-api.appbrewery.com/random`);
    //   result = response.data;
    // }else if (req.body["participants"]===""){
    //   response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${req.body["type"]}`);
    //   result = response.data;
    // }
    // else if (req.body["type"]===""){
    //   response = await axios.get(`https://bored-api.appbrewery.com/filter?participants=${req.body["participants"]}`);
    //   result = response.data;
    // }
    // else{
    //   response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${req.body["type"]}&participants=${req.body["participants"]}`);
    //   result = response.data;
    // }
    // console.log(result);
    // if(result.length>1){
    //   res.render("index.ejs",{data:result[0]});  
    // }else{
    //   res.render("index.ejs",{data:result});
    // }
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${req.body["type"]}&participants=${req.body["participants"]}`);
    const result = response.data;
    console.log(result);
    res.render("index.ejs",{data:result[0]});
  }
  catch(err){

    // console.log(res.statusCode);
      res.render("index.ejs", {error:"No activities found"});
  }
  // Step 2: Play around with the drop downs and see what gets logged.
  // Use axios to make an API request to the /filter endpoint. Making
  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
