var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//---------Create an Express app instance--------//
var app = express();

//-----------------Authentication-----------------//
var session = require("express-session"); //required for passport
//instantiate passport and select strategy
var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    console.log('Serialize user called.');
    done(null, user.name);
});

passport.deserializeUser(function(user, done) {
    console.log('Deserialize user called.');
    return done(null, user);
});

app.use(session({secret:"its_a_secret", resave: true, saveUninitialized: true}));
app.use(passport.initialize()); //TBD required for passport -look into this?
app.use(passport.session()); //TBD required for passport -look into this?

passport.use(new LocalStrategy(
    function(username, password, done){
        console.log('local strategy called with: %s', username);
        if(username == "username" && password == "password"){
            return done(null, {name: username});
        }else{
            return done(false);
        }
    }
));

//-------------Setup Express Routes--------------//
var index = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
