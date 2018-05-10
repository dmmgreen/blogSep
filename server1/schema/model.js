var mongoose=require("mongoose");

mongoose.model("Tag",new mongoose.Schema({
    name:String
}));

mongoose.model("User",new mongoose.Schema({
    username:String,
    password:String,
    type:String
}));

mongoose.model("Article",new mongoose.Schema({
    title:String,
    content:String,
    viewCount:Number,
    commentCount:Number,
    time:String,
    author:String,
    tags:Array,
    isPublish:Boolean
}));

global.Model=function (modelName) {
    return mongoose.model(modelName);
};