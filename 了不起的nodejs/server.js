/**
 * Created by Foreverofh on 2017/3/13.
 */
var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
    res.writeHead(200,{'Content-type':"image/png"});
    fs.createReadStream('img.png').pipe(res);

}).listen(8080);
console.log('服务器已经启动');


// function sleep(time) {
//     var startTime = new Date().getTime();
//     while (new Date().getTime() < startTime + time) {
//     }
// }
//
// sleep(3000);
// console.log('阻塞三秒');