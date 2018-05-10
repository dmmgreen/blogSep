const pathLib=require('path');
const ROOT_PATH=pathLib.resolve(__dirname);
const ENTRY_PATH=pathLib.resolve(ROOT_PATH,'src');
const OUTER_PATH=pathLib.resolve(ROOT_PATH,'build');


module.exports={
    entry:{
        index:pathLib.resolve(ENTRY_PATH,'index.js')
    },
    output:{
        path:OUTER_PATH,
        publicPath:'/',
        filename:'[name]-[chunkhash].js'
    },
    devtool:'source-map',
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                exlude:/node_modules/,
                use:{
                    "presets":["react","es2015"],
                    "plugins":[["import",[{"libraryName":"antd","style":true}]]]
                }
            }
        ]
    }
};