const HtmlWebpackPlugin=require('html-webpack-plugin');

const pathLib=require('path');
const ROOT_PATH=pathLib.resolve(__dirname);
const ENTRY_PATH=pathLib.resolve(ROOT_PATH,'src');
const OUTER_PATH=pathLib.resolve(ROOT_PATH,'build');


module.exports={
    entry:{
        index:[
            'babel-polyfill',
            pathLib.resolve(ENTRY_PATH,'index.js')]
    },
    output:{
        path:OUTER_PATH,
        publicPath:'/',
        filename:'[name]-[chunkhash].js'
    },
    devtool:'cheap-module-eval-source-map',
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                exclude:/node_modules/,
                use:["babel-loader"]
            },
            {
                test:/\.css$/,
                exclude:/node_modules/,
                use:["style-loader",{
                    loader:"css-loader",
                    options:{
                        modules:true,
                        localIdentName:'[name]-[local]-[hash:base64:5]',
                        importLoaders:1
                    }
                },
                    "postcss-loader"
                ]
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader',
                    {
                        loader: 'css-loader'
                    },
                    'postcss-loader'
                ]
            },
            {
                test:/\.less$/,
                use:["style-loader","css-loader","postcss-loader",{
                    loader:"less-loader",
                    options:{
                        javascriptEnabled:true
                    }
                }]
            },
            {
                test:/\.(png|jpg|gif|bmp|jpeg|JPG|GIF|PNG|GMP|JPEG)$/,
                exclude:/node_modules/,
                use:[
                    {
                        loader:"url-loader",
                        options:{
                            limit:8192
                        }
                    }
                ]
            },
            {
                test:/\.(eot|woff|ttf|woff2|svg)$/,
                use:"url-loader"
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:"my blog",
            showErrors:true
        })
    ]
};