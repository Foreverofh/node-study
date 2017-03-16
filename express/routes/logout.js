/**
 * Created by OUFUHUA on 2017/3/16.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('login', {title: "登录"});
});


/* GET home page. */

module.exports = router;