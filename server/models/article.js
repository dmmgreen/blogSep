var mongoose =require('mongoose'),
    url='mongodb://localhost/blog',
    articleSchema=require('../schemas/article');
mongoose.connect(url);
module.exports=mongoose.model('Article',articleSchema);