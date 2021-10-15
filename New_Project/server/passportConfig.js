//FIX erors if no items in json
//Add test cases
//Fix UI
//Add more security to passport
//Look at other requirements
//Make sure user auto logs in when browser refreshes
//https://www.youtube.com/watch?v=sTHWNPVNvm8&t=0s
var User = require('./users.json'); 
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport){
    passport.use(
        new localStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(username, password, done){
            console.log(User.length);
            for (var index = 0; index < User.length; ++index) {

                var _user = User[index];
                console.log("HERE:")
                console.log(_user);
                if(_user.email == username && _user.password == password){
                    
                  done(null, _user);
                }
                else{
                  done(null, false);
                }
            }
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        done(null, id);
    })
}