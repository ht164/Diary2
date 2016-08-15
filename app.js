var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var serveStatic = require('serve-static');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth-connect');
var multer = require('multer');

var logger = require('./mymodules/logger');
var consts = require('./mymodules/consts');
var controller = require('./mymodules/controller');

var routes = require('./routes/index');
var get = require('./routes/get');
var post = require('./routes/post');
var recent = require('./routes/recent');
var feed = require('./routes/feed');
var comment = require('./routes/comment');
var monthlydiary = require('./routes/monthlydiary');
var thumbnaillist = require('./routes/thumbnaillist');

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

// use BASIC authentication for posting diary page.
app.all('/html/*', basicAuth(function(user, password){
    console.log('user: ' + user + ', password: ' + password);
    return user === 'user' && password === 'pass';
}));

// add static file paths.
app.use(serveStatic(path.join(__dirname, 'public'), {
    maxAge: consts.maxAgeMsec,
    setHeaders: function(res, path) {
        res.set({
            'Expires': (new Date(Date.now() + consts.maxAgeMsec)).toUTCString()
        });
    }
}));

app.use('/', routes);
app.use('/get', get);
app.use('/post', post);
app.use('/recent', recent);
app.use('/feed', feed);
app.use('/comment', comment);
app.use('/monthlydiary', monthlydiary);
app.use('/thumbnaillist', thumbnaillist);
// handle file-uploading using multer.
var upload = multer();
app.post('/upload', upload.array('f'), function(req, res, next) {
    var c = new controller();
    c.upload(req, res, next);
});

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
