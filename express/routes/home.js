var express=require('express');
var router=express.Router();

router.get('/',function (req, res, next) {
    res.render('home',{title:'主页',user:{username:"aaa"}})
});

module.exports=router