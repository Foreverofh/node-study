var mongooes = require('./mongodb').mongooes;
var Schema = mongooes.Schema;
var MovieSchema = new Schema({
    name: String,
    alias: [String],
    publish: Date,
    create_date: {type: Date, default: Date.now},
    images: {
        coverSmall: String,
        coverBig: String,
    },
    source: [{
        source: String,
        link: String,
        swfLink: String,
        quality: String,
        version: String,
        lang: String,
        subtitle: String,
        create_date: {type: Date, default: Date.now}
    }]
});

//构造数结构 指定Mongo的数据库集为Movie
var Movie = mongooes.model('Movie', MovieSchema);

var MovieDAO = function () {

};

module.exports = new MovieDAO();