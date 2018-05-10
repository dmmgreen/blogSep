1、Cannot find module 'less'
   安装less模块  npm i --save-dev less

2、regeneratorRuntime is not defined
   安装babel-polyfill npm i --save-dev babel-polyfill,并且在module.export entry中添加
   module.exports = {
     entry: ['babel-polyfill', './index.js'],
   };

2、加上mode
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "prod": "webpack --mode production --config ./webpack.prod.js",
    "dev": "webpack-dev-server --mode development --config ./webpack.dev.js --open"
  },


3、刷新后，404
服务器使用的 webpack-dev-server , 加了 --history-api-fallback
https://segmentfault.com/q/1010000010844476
https://my.oschina.net/u/3451529/blog/1596319

4、post提示400
req.param获取pathinfo中参数 /api/users/{id}
req.query获取查询参数 /api/users?name=wwx
req.body获取form提交参数
https://blog.csdn.net/junshao90/article/details/8209166
https://www.jianshu.com/p/3a1e454c7093

app.use(bodyParser.urlencoded({
    extended: true
}));

5、POST http://localhost:3600/user/login 500 (Internal Server Error)
req.session.userInfo=data;出错
安装session=require('express-session');cookie-parser模块
app.use(cookieParser('express_react_cookie'));
app.use(session({
    secret:'express_react_cookie',
    resave: true,
    saveUninitialized:true,
    cookie: {maxAge: 60 * 1000 * 30}//过期时间
}));


6、客户端登录成功后，刷新需重新登录


7、 Warning: Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.直接调用了函数，所以会导致无限渲染元素，导致内存溢出

AppIndex 

{
                        this.props.notification && this.props.notification.content ?
                            (
                                this.props.notification.type === 1 ?
                                    this.openNotification('success', this.props.notification.content) :
                                    this.openNotification('error', this.props.notification.content)) :
                            null
                    }

解决办法：




