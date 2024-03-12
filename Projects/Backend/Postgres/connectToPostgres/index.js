import Client from "pg";

const db = new Client({
    user:"",
    host:"localhost",
    database:"",
    password:"",
    port:5432
});

db.connect();

db.query("SELECT * FROM users", (err, res)=>{
    if (err){
        console.log(err);
    }else{
        console.log(res.rows);
    }
    db.end();
})