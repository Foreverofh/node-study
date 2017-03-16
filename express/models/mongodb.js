/**
 * Created by OUFUHUA on 2017/3/16.
 */
var mongooes = require('mongoose');
//连接数据库
mongooes.connect('mongodb://localhost/nodejs');
exports.mongooes = mongooes;