const webpack = require('webpack');
const default_config = require('./webpack.config.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    devtool: 'hidden-source-map',
    output: {
        path: helpers.root('dist'),
        filename: '[name].js'
    },
    plugins: [
        new CopyWebpackPlugin([
            { context: 'src/', from: 'images/**'  },
            { context: 'src/', from: 'index.html'  },
            { context: 'src/', from: 'favicon.ico'  },
            // { context: 'src/', from: '**/*.html'  }
        ]),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        // new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename:'[name].[chunkhash:8].js', minChunks: Infinity}),
        // new webpack.LoaderOptionsPlugin({
        //     minimize: true,
        //     debug: false
        // }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: { screw_ie8 : true },
            minimize: true,
            compress : { screw_ie8 : true, warnings: false },
            comments: false,
            sourceMap: false
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
    ]
};

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(default_config, config);
