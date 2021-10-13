var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// my routers
var loginRouter = require('./routes/login');
var loginSubmitRouter = require('./routes/loginSubmit');
var createAccountRouter = require('./routes/createAccount');

var app = express();

// passport config
require('./config/passport')(passport);

var session_config = {
  secret: 'secret', //a random unique string key used to authenticate a session
  resave: true, //nables the session to be stored back to the session store, even if the session was never modified during the request
  saveUninitialized: true, //his allows any uninitialized session to be sent to the store. When a session is created but not modified, it is referred to as uninitialized.
  cookie: { secure: true } //true is a recommended option. However, it requires an https-enabled website
  //store  parameter when saving session to database
};

session_config.cookie.secure = false;
//Express Sessions
app.use(session(session_config))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', loginRouter);
app.use('/loginSubmit', loginSubmitRouter);
app.use('/createAccount', createAccountRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
