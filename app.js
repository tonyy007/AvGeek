const express = require("express");
const https = require("https");
const path = require("path");
const bcrypt = require("bcrypt");
//const request = require("request");

const app = express();

const users = []

app.set("view-engine", "html");
app.engine('html', require('ejs').renderFile);

app.use(express.static("public"));

app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.get("/", function(req, res){
    res.render(__dirname + '/home.html');
});

app.get("/home.html", function(req, res){
    res.redirect("/");
});

app.get("/LookUp.html", function(req, res){
    res.redirect("/LookUp");
});

app.get("/LookUp", function(req, res){
    res.render(__dirname + '/LookUp.html');
})

app.get("/aircraft", function(req, res){
    res.render(__dirname + '/aircraft.html');
})

app.get("/aircraft.html", function(req, res){
    res.redirect("/aircraft");
});

app.get("/airport", function(req, res){
    res.render(__dirname + '/airport.html');
})

app.get("/airport.html", function(req, res){
    res.redirect("/airport");
});

app.get("/aboutMe", function(req, res){
    res.render(__dirname + '/aboutMe.html');
})

app.get("/aboutMe.html", function(req, res){
    res.redirect("/aboutMe");
});

app.get('/users', (req, res) =>{
    res.json(users)
});

app.post("/users", async (req, res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassowrd = await bcrypt.hash(req.body.password, 10);
        const user = {name:req.body.name, password:hashedPassowrd};
        users.push(user);
        res.status(201).send();
        //hash(salt + 'password');
    }catch{
        res.status(500).send();
    }
});

app.post("/users/login", async (req, res)=>{
    const user = users.find(user => user.name = req.body.name);
    if(user == null){
        return res.status(400).send("Cannot find user");
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send("Success");
        }else{
            res.send("Not allowed");
        };
    }catch{
        res.status(500).send();
    }
});

app.listen(process.env.PORT||3000,function(){
    console.log("WebApp Started on port 3000");
});