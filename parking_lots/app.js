var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy
const { models } = require('./models')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var entrancesRouter = require('./routes/entrances');
var departuresRouter = require('./routes/departures');
var paymentsRouter = require('./routes/payments');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/entrances', entrancesRouter);
app.use('/departures', departuresRouter);
app.use('/payments', paymentsRouter);

// passport bearer strategy
passport.use(new BearerStrategy(
  function(token, done) {
    models.System.findOne({ token: token }, function (err, system) {
      if (err) { return done(err); }
      if (!system) { return done(null, false); }
      return done(null, system, { scope: 'all' });
    });
  }
));

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

  let message = "General error"
  let status = 500
  console.log(err)
  
  if (err.name === 'ValidationError' || err.name === 'MongoError' ) {
    status = 400
    message = err.toString()
  }

  res.status(status).json({msg: message})
});

module.exports = app;
