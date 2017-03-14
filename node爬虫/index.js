/**
 * Created by OUFUHUA on 2017/3/13.
 */
var http = require('http');
var fs = require('fs');
var request = require('request'); //
var cheerio = require('cheerio'); //轻量级的jquery
var i = 0;
var url = "http://www.ss.pku.edu.cn/index.php/newscenter/news/2391"; //爬虫地址

var startRequest = function (url) {
    http.get(url, function (res) {
        var html = '';
        var titles = [];
        res.setEncoding('utf-8') //统一编码
        res.on('data', function (chunck) {
            html += chunck;
        });
        res.on('end', function () {
            var $ = cheerio.load(html);
            var time = $('.article-info a:first-child').next().text().trim(); //获取爬虫回来的东西,之后操作DOM
            console.log(time)
            var news_item = {
                //获取文章的标题
                title: $('div.article-title a').text().trim(),
                //获取文章发布的时间
                Time: time,
                //获取当前文章的url
                link: "http://www.ss.pku.edu.cn" + $("div.article-title a").attr('href'),
                //获取供稿单位
                author: $('[title=供稿]').text().trim(),
                //i是用来判断获取了多少篇文章
                i: i = i + 1
            };
            console.log(news_item);     //打印新闻信息
            var news_title = $('div.article-title a').text().trim();
            //saveContent($, news_title); //保存文字
            saveImage($, news_title);


            var nextLink = $('.next').find('a').attr('href').split('-')[0];
            console.log(typeof nextLink)
            console.log(nextLink)
            if (nextLink) {
                if (i < 10) {  //爬了十篇文章
                    startRequest("http://www.ss.pku.edu.cn" + nextLink);
                }
            }
        });
        //保存文字可以插入到文件,所以用appendFile
        function saveContent($, new_title) {
            $(".article-content p").each(function (index, val) {
                var x = $(this).text();
                var y = x.substring(0, 2).trim();//因为有缩进,所以要判断换不换行
                if (y == '') {
                    x = x + '\n';
                    fs.appendFile('./data/' + new_title + '.txt', x, function (err) { //异步把文件插件到txt里
                        if (err) throw  err;
                    })
                }
            })
        }

        //保存图片 (因为图片是流,只能用流的方式)
        function saveImage($, news_title) {
            $('.article-content').find('img').each(function (index, val) {
                var title = $(this).parent().next().find('span').text();
                if (title.length > 35 || title == "") {
                    title = "";
                }
                var title = title + '.jpg';
                var imgLink = "http://www.ss.pku.edu.cn" + $(this).attr('src');
                //采用request模块，向服务器发起一次请求，获取图片资源
                request.head(imgLink, function (err, res, body) {
                    if (err) {
                        console.log(err);
                    }
                });
                request(imgLink).pipe(fs.createWriteStream('./image/' +news_title+'--'+title));
            })
        }


    })
};
startRequest(url);