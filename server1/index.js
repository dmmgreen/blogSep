var express=require('express');
var app=express();

var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var url="mongodb://localhost/blog";
app.use(express.static(__dirname));
require('./schema/model');
var mongoose=require('mongoose');
var utils=require('./utils/md5');
var tag=require('./route/tags');
/*var user=require('./route/user');
var article=require('./route/article');*/
app.use(express.static(__dirname));
app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","content-type");
    res.header("Content-Type","application/json;charset=utf-8");
    next();
});

app.use(bodyParser.json());
app.use("*",function(req,res,next){
    next();
});
/*app.use('/user',user);
app.use('/article',article);*/
app.use('/',tag);
app.use(function(err,req,res,next){
    console.log(err.stack);
    res.status(500).send('broke');
    next();
});
mongoose.connect(url,function (err) {
    if(err){
        console.log(err,'数据库连接失败');
        return;
    }
    console.log('数据库连接成功');
    app.listen(3600, function (err) {
        if (err) {
            console.error('err:', err);
        } else {
            console.info(`===> api server is running at 3600`)
        }
    });
});
