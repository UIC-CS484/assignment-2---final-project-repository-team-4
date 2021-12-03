const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const db = require("./databaseFunctions");

//Middleware
const whitelist = [
  "https://finance.yahoo.com/quote/AAPL/history",
  "http://localhost:3000",
  "http://tidalstocks.herokuapp.com"
];
//app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser("aCode"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // res.header({ "Access-Control-Allow-Origin": "*" });
  // res.header({ "Access-Control-Allow-Credentials": true });
  // res.header({ "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS" });
  // res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});
const corsConfig = {
  credentials: true,
  origin: true,
}

app.use(
  cors(corsConfig)
);
app.use(
  session({
    //proxy: true,
    secret: "aCode",
    resave: false, //true
    saveUninitialized: true,
    store: new SQLiteStore({
      table: "session",
      db: "tidalDB.sqlite3",
      dir: "./Database",
    }),
    cookie: { secure: process.env.ENV === 'production' }, //1 day | not here before
  })
);

require("./passportConfig.js")(passport);
app.use(passport.initialize());
app.use(passport.session());

//Router
//[{"id":105.0504696977599,"first_name":"admin","last_name":"admin","email":"google@g","password":"1"}]
app.post("/register", async (req, res) => {
  const fname = req.body.fName;
  const lname = req.body.lName;
  const email = req.body.email;
  const password = req.body.password;

  console.log("PLACE INFO INTO TXT FILE");
  console.log(fname);
  console.log(lname);
  console.log(email);
  console.log(password);

  //var randomValue = Math.random() * 123;
  let users = {
    //id: randomValue,
    first_name: fname,
    last_name: lname,
    email: email,
    password: password,
  };

  if (await db.checkEmailUsed(email)) {
    res.send({ message: "Email already used" });
    return;
  } else {
    try {
      await db.createUser(fname, lname, email, password);
      res.send({ message: "Account Sucessfully Made" });
    } catch (error) {
      console.log("Error in creating user");
    }
  }

  // fs.readFile('users.json', function(err, data){
  //     if(err) throw err;

  //     try{
  //         var parseJson = JSON.parse(data);
  //     }catch(error){
  //         console.log(error);
  //         return;
  //     }

  //     for(i = 0; i < parseJson.users.length; i++){
  //         if(parseJson.users[i].email == users.email){
  //             res.send({message: "Email already used"});
  //             return;
  //         }
  //     }
  //     parseJson.users.push(users);
  //     let json = JSON.stringify(parseJson);
  //     fs.writeFile('users.json', json, 'utf8', () => {});
  //     res.send({message: "Account Sucessfully Made"});

  // });

  // let data = JSON.stringify(users);
  // //check to see if user exists
  // fs.appendFile('users.json', data, function(err){    //Add multiple users
  //     if(err) throw err;
  //     console.log("Had error");
  // });

  // res.send("Successfully Registered");
});

app.post("/deleteAccount", (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  const password = req.body.password;
  /* Do delete account logic here */
  try {
    let bool = db.deleteUser(id, email, password);
    if (bool) {
      req.logout();
    }
    res.send({ message: "Logged Out" });
  } catch {
    console.log("Error");
    res.send({ message: "Error deleting account" });
  }
});

app.post("/updateInfo", (req, res) => {
  console.log("In update password");
  const id = req.body.id;
  const fname = req.body.fName;
  const lname = req.body.lName;
  const email = req.body.email;
  const password = req.body.password;
  const changePassword = req.body.changePwd;

  db.updateUserInfo(id, fname, lname, email, password, changePassword);

  res.send({ message: "Update Succesful" });
});

app.get("/user", (req, res) => {
  console.log("User GET: " + req.user);
  if (!req.isAuthenticated()) {
    res.send({ message: "No authenticated User" });
  } else res.send(req.user);
});

app.get("/logout", (req, res) => {
  req.logout();
  res.send({ message: "Logged Out" });
});

app.post("/login", function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);
  passport.authenticate("local", function (err, user, info) {
    console.log("user " + user);
    if (err) throw err;
    if (user == false) {
      console.log("User doesn't exist");
      res.send({ message: "No User Exists" });
      return;
    } else {
      console.log("User in authenticate: " + user);
      req.login(user, (err) => {
        console.log("in Login: \n");
        console.log(user);
        console.log("\n");
        if (err) throw err;
        res.send({ message: "Sucessfully Authenticated" });
      });
    }
  })(req, res, next);
});

// app.listen(3001, () => {
//     console.log("Running on 3001");
// });

module.exports = app;
