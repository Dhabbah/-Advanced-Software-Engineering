var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var mongoose = require('mongoose');
mongoose.connect ('mongodb+srv://kmdk2t:123k123@cluster0-zrshr.mongodb.net/Data?retryWrites=true')
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

var apiRouter = require('./routes/customer');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/customer', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/customer-details/:id', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/customer-create', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/customer-edit/:id', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

module.exports = app;
