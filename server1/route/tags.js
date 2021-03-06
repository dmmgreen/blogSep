const Express=require("express");
const router=Express.Router();
const Tags=Model("Tag");
const {responseClient}=require('../utils/md5');



//获取全部标签
router.get('/getAllTags',function (req, res) {
    Tags.find(null,'name').then(data=>{
        responseClient(res,200,0,'请求成功',data);
    }).catch(err=>{
        responseClient(res);
    })
});


router.get('/delTag',(req,res)=>{
    let {name}=req.query;
    Tags.remove({name}).then(result => {
        if(result.result.n === 1){
            responseClient(res,200,0,'删除成功!')
        }else{
            responseClient(res,200,1,'标签不存在');
        }
    }).catch(err => {
        responseClient(res);
    });
});

router.post('/addTag',(req,res)=>{
    let {name}=req.body;
    Tags.findOne({name}).then(result=>{
        if (!result) {
            let tag = new Tags({
                name
            });
            tag.save()
                .then(data => {
                    responseClient(res, 200, 0, '添加成功', data);
                }).catch(err => {
                throw err
            })
        } else {
            responseClient(res, 200, 1, '该标签已存在');
        }
    }).catch(err => {
        responseClient(res);
    });
});


module.exports = router;