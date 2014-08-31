var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var serveStatic = require('serve-static');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var logger = require('./mymodules/logger');
var consts = require('./mymodules/consts');

var routes = require('./routes/index');
var users = require('./routes/user');
var get = require('./routes/get');
var post = require('./routes/post');
var diary = require('./routes/diary');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
//app.use(logger('dev'));
app.use(logger.loggerHttp);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(serveStatic(path.join(__dirname, 'public'), {
    maxAge: consts.maxAgeMsec,
    setHeaders: function(res, path) {
        res.set({
            'Expires': (new Date(Date.now() + consts.maxAgeMsec)).toUTCString()
        });
    }
}));

app.use('/', routes);
app.use('/users', users);
app.use('/get', get);
app.use('/post', post);
app.use('/diary', diary);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
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
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
