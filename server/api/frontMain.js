const Tags=require('../models/tags');
const Article =require('../models/article');
const Express=require('express');
const router=Express.Router();
const {responseClient}=require('../common/util');

router.use(function (req, res, next) {
    console.log(req.session,'font');
    next();
});
router.use('/user',require('./user'));
//获取全部标签
router.get('/getAllTags',function (req, res) {
    console.log(req.session,req.session.userInfo,'userinfo')
    Tags.find(null,'name').then(data=>{
        responseClient(res,200,0,'请求成功',data);
    }).catch(err=>{
        responseClient(res);
    })
});

//获取文章
router.get('/getArticles',(req,res)=>{
    let tag=req.query.tag || null;
    let isPublish=req.query.isPublish;
    let searchCondition={
        isPublish
    };
    if(tag){
        searchCondition.tags=tag;
    }
    if(isPublish === 'false'){
        searchCondition=null;
    }
    let skip=(req.query.pageNum -1)<0?0:(req.query.pageNum - 1)*5;
    let responseData={
        total:0,
        list:[]
    };
    Article.count(searchCondition).then(count=>{
        responseData.total=count;
        Article.find(searchCondition,'_id title isPublish author viewCount commentCount time coverImg',{
            skip,
            limit:5
        }).then(result=>{
            responseData.list=result;
            responseClient(res, 200, 0, 'success', responseData);
        }).catch(err=>{
            throw err;
        })
    }).catch(err=>{
        responseClient(res);
    })
});


//获取文章详情
router.get('/getArticleDetail',(req,res)=>{
   let _id=req.query.id;
   Article.findOne({_id}).then(data=>{
       data.viewCount=data.viewCount+1;
       Article.update({_id},{viewCount:data.viewCount}).then(result=>{
           responseClient(res,200,0,'success',data);
       }).catch(err=>{
           throw err;
       })
   }).catch(err=>{
       responseClient(res);
   })
});

module.exports = router;