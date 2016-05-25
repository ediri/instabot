var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var pgSession = require('connect-pg-simple')(session)
//passport
var passport = require('passport')
var InstagramStrategy = require('passport-instagram').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});


var INSTAGRAM_CLIENT_ID = process.env.INSTAGRAM_CLIENT_ID || process.argv[2];
var INSTAGRAM_CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET || process.argv[3];

passport.use(new InstagramStrategy({
    clientID: INSTAGRAM_CLIENT_ID,
    clientSecret: INSTAGRAM_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/instagram/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));


var app = express();

var env = process.env.NODE_ENV || 'development';
var databaseURL = process.env.DATABASE_URL || 'postgres://admin:test@192.168.99.100:5432/admin';
var cookieSecret = process.env.COOKIE_SECRET || 'development'

app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  store: new pgSession({conString: databaseURL}),
  secret: cookieSecret,
  resave: false,
  cookie: {maxAge: 30 * 24 * 60 * 60 * 1000} // 30 days
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

var instagram = require('./routes/instagram')(app, express);
var routes = require('./routes/index');
var users = require('./routes/user');

app.use('/', routes);
app.use('/users', users);

app.get('/auth/instagram',
  passport.authenticate('instagram'),
  function (req, res) {
    // The request will be redirected to Instagram for authentication, so this
    // function will not be called.
  });

app.get('/auth/instagram/callback',
  passport.authenticate('instagram', {failureRedirect: '/login'}),
  function (req, res) {
    res.redirect('/instagram');
  });


/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    title: 'error'
  });
});


module.exports = app;