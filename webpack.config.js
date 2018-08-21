const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: 'development',
    entry: "./src/javascripts/index.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "js/app.[chunkhash].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["babel-preset-env"]
                    }
                }
            },
            {
                test: /\.scss$/,
                //the order of the loaders drastically matters, the best description is that it works
                //like a function inside of a function or a pipe
                //things are loaded right to left                
                use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            }
        ]        
    },
    //creates the map files
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin('public', {} ),
        new MiniCssExtractPlugin({
            filename: "styles/[name].[contenthash].css",
            chunkFilename: "styles/[id].[contenthash].css"
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/templates/index.html',
            filename: 'index.html'
        })
    ]    
};