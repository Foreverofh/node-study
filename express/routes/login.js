var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('login', {title: "登录"});
});
router.post('/', function (req, res, next) {
    var user = {
        username: 'admin',
        password: 'admin'
    };

    if (req.body.username === user.username && req.body.password === user.password) {
        //登录名一致,保存到session里
        res.redirect('/home');
    } else {
        res.redirect('/login');

    }


});
/* GET home page. */

module.exports = router;