var express = require('express');
var path = require('path');
var app = express();
var morgan = require('morgan');// 打印日志
var fs = require('fs');
var multer = require('multer');

app.use(morgan('combined'));

var upload = multer({ dest: 'upload/' });

// 打印日志到本地
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
// app.use(morgan('combined', {stream: accessLogStream}))

// 模板引擎配置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/index', function (req, res, next) {
    res.render('index', {
        title: "第一个模板生成"
    })
});


app.post('/upload-single', upload.single('logo'), function (req, res, next) {
    res.send({res_code: 0})
});
app.get('/form', function (req, res, next) {
    var file = fs.readFileSync('./form.html', {encoding: 'utf-8'});
    res.send(file)
});


app.listen(3000);