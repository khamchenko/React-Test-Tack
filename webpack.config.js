const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.css|scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                loader: 'url-loader?limit=20000&name=assets/[hash].[ext]',
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        open: true,
        hot: true,
        port: 9000,
    },
};

module.exports = config;
