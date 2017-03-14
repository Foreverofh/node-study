var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');      //http://www.cnblogs.com/chyingp/p/node-learning-guide-express-morgan.html 日志
var cookieParser = require('cookie-parser');//处理cookie
var bodyParser = require('body-parser');  //http://www.cnblogs.com/lianer/p/5178693.html form表单请求处理

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));   //指向路径
app.set('view engine', 'ejs');                     //模板引擎是ejs

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());  //参数传过来是json数据
app.use(bodyParser.urlencoded({extended: false})); //post请求form表单形式才过来

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public'))); // express.static 可以方便地托管静态文件,如果存在多个静态文件目录，可以设置多个静态文件

//类创建模块化、可挂载的路由句柄  /user/user
app.use('/', routes);
app.use('/users', users);

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


module.exports = app;
