const webpack = require('webpack');
const default_config = require('./webpack.config.js');

// server address
const SERVER_HOST = '0.0.0.0';
const SERVER_PORT = '3000';

var config = {
    devtool: 'inline-source-map',
    cache: true,
    debug: true,
    output: {
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },
    devServer: {
        quiet: false,
        noInfo: false,
        contentBase: './src',
        historyApiFallback: true,
        host: SERVER_HOST,
        port: SERVER_PORT,
        inline: true,
        historyApiFallback: true,
        watchOptions: {
            poll: 1000,
            aggregateTimeout: 250
        },
        stats: {
            assets: true,
            colors: true,
            version: false,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false
        },
        publicPath: '/'
    }
};

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(default_config, config);
