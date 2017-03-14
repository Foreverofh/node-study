var exec = require("child_process").exec; //操作命令行的
var querystring = require('querystring');//操作字符串
var fs = require('fs');//操作文件
var url = require('url');//操作url地址
var formidable = require("formidable");//操作上传文件

function start(response, request) {
    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" method="post" enctype="multipart/form-data">' +
        '<input type="file" name="upload">' +
        '<input type="submit" value="Submit text" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
    var form = new formidable.IncomingForm();

    form.parse(request, function (error, fields, files) {
        console.log("parsing done");
        fs.renameSync(files.upload.path, "./tmp/" + files.upload.name);
        var src = '/show?url=' + files.upload.name;
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='" + src + "' />");
        response.end();
    });
}

function show(response, request) {
    console.log(url.parse(request.url));
    var img = querystring.parse(url.parse(request.url).query).url;
    console.log(img);
    fs.readFile("./tmp/" + img, "binary", function (error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}
exports.start = start;
exports.upload = upload;
exports.show = show;