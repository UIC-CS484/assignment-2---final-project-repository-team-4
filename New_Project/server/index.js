const express = require("express");
const app = express();
const cors = require("cors");
const fs = require('fs');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(session({
    secret: "aCode",
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser("aCode"));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig.js')(passport);


//Router
app.post('/register', (req,res)=>{
    const fname = req.body.fName;
    const lname = req.body.lName;
    const email = req.body.email;
    const password = req.body.password;

    console.log("PLACE INFO INTO TXT FILE");
    console.log(fname);
    console.log(lname);
    console.log(email);
    console.log(password);

    var randomValue = Math.random() * 123;
    let users = [{ 
        id: randomValue,
        first_name: fname,
        last_name: lname, 
        email: email,
        password: password
    }];

    let data = JSON.stringify(users);
    fs.appendFile('users.json', data, function(err){    //Add multiple users
        if(err) throw err;
        console.log("Had error");
    });
    res.send("Successfully Registered");
});

app.get("/user", (req,res) => {
    res.send(req.user);
});

app.post('/login', function(req,res,next){
    
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    console.log(password);
    passport.authenticate("local", function(err,user,info){
        console.log("user " + user);
        if(err) throw err;
        if(!user) res.send("No User Exists");
        else{
            req.logIn(user, err => {
                if(err) throw err;
                res.send("Sucessfully Authenticated");
                    
            })
        }
    })(req,res,next);
});

app.listen(3001, () => {
    console.log("Running on 3001");
});