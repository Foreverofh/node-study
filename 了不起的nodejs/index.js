/**
 * Created by Foreverofh on 2017/3/13.
 */
var fs = require('fs');
console.log(fs.readdirSync(__dirname));//同步（sync）获取当前目录的列表
function async(err, files) {
    console.log(files);
}
fs.readdir(__dirname, async);//异步获取当前目录列表(回调函数)；
console.log(process.env.NODE_ENV)
//流(stream)
// process全局对象中包含三个流
// process.stdin  标准输入（可读流）
// process.stdout 标准输出 可写流
// process.stderr 标准错误 可写流
// process.argv   包含了所有node程序运行时的参数值
// process.cwd()  获取当前工作根目录(__dirname)
// process.env.NODE_ENV  判断变量的控制程序是运行开发模式还是产品模式
// process.exit() 退出代码程序
// process.on('SIGKILL',function(){信号接收}) 进程信号

//ANSI转义码   控制台颜色改变

// fs模块
// fs.readFile('xxx.txt',function(err,content){}) //一次性操作文件

// var stream = fs.createReadStream('xxx.txt');  //分批操作文件（文件很大的时候）
// stream.on('data', function () {
//     //处理文件内容
// });
// stream.on('end', function () {
//     //文件处理完成
// });

// fs.WriteStream() 写入流
// fs.watchFile(process.cwd()) //监听文件
// fs.watch() //监听目录


