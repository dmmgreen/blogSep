1��Cannot find module 'less'
   ��װlessģ��  npm i --save-dev less

2��regeneratorRuntime is not defined
   ��װbabel-polyfill npm i --save-dev babel-polyfill,������module.export entry�����
   module.exports = {
     entry: ['babel-polyfill', './index.js'],
   };

2������mode
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "prod": "webpack --mode production --config ./webpack.prod.js",
    "dev": "webpack-dev-server --mode development --config ./webpack.dev.js --open"
  },


3��ˢ�º�404
������ʹ�õ� webpack-dev-server , ���� --history-api-fallback
https://segmentfault.com/q/1010000010844476
https://my.oschina.net/u/3451529/blog/1596319

4��post��ʾ400
req.param��ȡpathinfo�в��� /api/users/{id}
req.query��ȡ��ѯ���� /api/users?name=wwx
req.body��ȡform�ύ����
https://blog.csdn.net/junshao90/article/details/8209166
https://www.jianshu.com/p/3a1e454c7093

app.use(bodyParser.urlencoded({
    extended: true
}));

5��POST http://localhost:3600/user/login 500 (Internal Server Error)
req.session.userInfo=data;����
��װsession=require('express-session');cookie-parserģ��
app.use(cookieParser('express_react_cookie'));
app.use(session({
    secret:'express_react_cookie',
    resave: true,
    saveUninitialized:true,
    cookie: {maxAge: 60 * 1000 * 30}//����ʱ��
}));


6���ͻ��˵�¼�ɹ���ˢ�������µ�¼


7�� Warning: Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.ֱ�ӵ����˺��������Իᵼ��������ȾԪ�أ������ڴ����

AppIndex 

{
                        this.props.notification && this.props.notification.content ?
                            (
                                this.props.notification.type === 1 ?
                                    this.openNotification('success', this.props.notification.content) :
                                    this.openNotification('error', this.props.notification.content)) :
                            null
                    }

����취��




