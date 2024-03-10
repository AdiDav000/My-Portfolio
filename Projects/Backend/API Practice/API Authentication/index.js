import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "user123";
const yourPassword = "password123";
const yourAPIKey = "ee6e3870-fbc3-45a0-8d0c-c979f76925f6";
const yourBearerToken = "19bdc8f5-b7a0-4805-aa91-219314f70066";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async(req, res) => {
  try{
  const response = await axios.get((API_URL+"random"));
  const result =JSON.stringify( response.data);
  // console.log(JSON.stringify(result));
  res.render("index.ejs", {content:result});
  }
  catch(e){
    res.render("index.ejs",{content:e});
  }
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async(req, res) => {
  try{
  const response = await axios.get(API_URL+"all?page=1",{
    auth:{
      username:yourUsername,
      password:yourPassword
    }
  })
  const result = JSON.stringify(response.data);
  res.render("index.ejs", {content: result});
}
catch(e){
  res.render("index.ejs",{content:e});
}
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async(req, res) => {
  try{
  const response = await axios.get(API_URL+"filter",{
    params:{
      score:5,
      apiKey:yourAPIKey
    }
  })
  const result = JSON.stringify(response.data);
  res.render("index.ejs", {content: result});
}
catch(e){
  res.render("index.ejs",{content:e});
}
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async(req, res) => {
  try{
  const response = await axios.get(API_URL + "secrets/1", {
    headers:{
      Authorization: ("Bearer " + yourBearerToken)
    }
  })
  const result=JSON.stringify(response.data);
  res.render("index.ejs",{content:result});
}
catch(e){
  res.render("index.ejs",{content:e});
}
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
