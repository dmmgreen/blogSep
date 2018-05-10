/**
 * 文章的表结构
 */
var mongoose=require('mongoose');

module.exports=new mongoose.Schema({
    title:String,
    content:String,
    viewCount:Number,
    commentCount:Number,
    time:String,
    author:String,
    tags:Array,
    isPublish:Boolean
});
