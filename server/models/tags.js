var mongoose =require('mongoose'),
    url='mongodb://localhost/blog',
    tagSchema=require('../schemas/tags');
mongoose.connect(url);
module.exports=mongoose.model('Tag',tagSchema);