var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');



var config = require('./env.json')[process.env.NODE_ENV || 'development'];

//var api = require('./routes/api');
var tokens = require('./routes/tokens');
var customer = require('./routes/customer');
var cardaccts = require('./routes/cardaccts');
mongoose.Promise = global.Promise;
//var cors = require('cors')




var app = express();
app.set('port', (process.env.PORT || 8080))
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'html');


var cons = require('consolidate');

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(config.MONGO_URI)
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));


//app.use('/', routes);
//app.use('/api', api);
app.use('/api/tokens', tokens);
app.use('/api/customer/cardaccts', cardaccts);
app.use('/api/customer', customer);
//app.use(

//app.use(cors())
/*
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Origin: *
*/
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'))
})


module.exports = app;
