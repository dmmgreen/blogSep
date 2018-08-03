const Express=require('express'),
    app=Express(),
    bodyParser=require('body-parser'),
    mongoose=require('mongoose'),
    cookieParser=require('cookie-parser'),
    session=require('express-session');

app.use(Express.static(__dirname));
app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","content-type");
    res.header("Content-Type","application/json;charset=utf-8");
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser('express_react_cookie'));
app.use(session({
    secret:'express_react_cookie',
    resave: true,
    saveUninitialized:false,
    cookie: {maxAge: 60 * 1000 * 30,secure:false}//过期时间
}));

//展示页面路由
app.use('/', require('./api/frontMain'));
//管理页面路由
app.use('/admin', require('./api/adminMain'));

mongoose.connect('mongodb://localhost/blog',function (err) {
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

