//FIX erors if no items in json
//Add test cases
//Add more security to passport
//Look at other requirements
//https://www.youtube.com/watch?v=sTHWNPVNvm8&t=0s
//var User = require('./users.json'); 
const localStrategy = require('passport-local').Strategy;
const fs = require('fs');

module.exports = function(passport){
    passport.use(
        new localStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(username, password, done){
            //console.log(User.length);

            fs.readFile('users.json', 'utf8', function readFileCallBack(err,data){
                if(err) {console.log(err);}
                else{
                    try{
                        var parseJson = JSON.parse(data).users;
                    }catch(error){
                        console.log(error);
                    }
                    for(i = 0; i < parseJson.length; i++){
                        var user = parseJson[i];
                        if(user.email == username && user.password == password){
                            done(null, user)
                            return;
                        }
                    }
                    done(null, false);
                }
            });
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user);
    })

    passport.deserializeUser((id, done) => {
        done(null, id);
    })
}