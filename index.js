const express = require("express");
const router = require("./routes/router");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/users", {appname:"sklepik",useNewUrlParser:true})
    .catch((error)=>console.error(error));

mongoose.connection.once("open", () =>{
    console.log("Database connected successfully");
});

const app = express();

app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
app.use(router);

//TEST TRALALA
const server = app.listen(8080,"localhost", ()=>{
    console.log("Server is running at: " + server.address().address + "::" + server.address().port);
});
