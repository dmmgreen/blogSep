var mongoose =require('mongoose'),
    url='mongodb://localhost/blog',
    userSchema=require('../schemas/users');
mongoose.connect(url);

module.exports=mongoose.model('User',userSchema);