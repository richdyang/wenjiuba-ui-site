const path = require('path');
const webpack = require('webpack');
var helpers = require('./config/helpers');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.browser.ts',
        'vendor':    './src/vendor.browser.ts',
        'main':       './src/main.browser.ts',
    },

    output: {
        path: './dist',
    },

    resolve: {
        root: [ path.join(__dirname, 'src') ],
        modulesDirectories: ['node_modules'],
        extensions: ['', '.ts', '.js']
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
        new ExtractTextPlugin('styles/app.css')
    ],

    module: {
        loaders: [
            // .ts files for TypeScript
            { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'], exclude: /node_modules/ },
            { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'], include: /node_modules\/ng2-uploader/ },
            { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
            { test: /\.html$/, loader: 'raw-loader' },
            /* global styles */
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap'), include: [helpers.root('src', 'styles')]},
            /* component styles */
            { test: /\.scss$/, loader: 'raw!sass?sourceMap', exclude: [helpers.root('src', 'styles')]},
            { test: /\.(png|jpe?g|gif|ico)\??.*$/, loader: 'url?limit=1024&name=/images/[name].[ext]' },
            { test: /\.(woff(2)?|svg|eot|ttf)\??.*$/, loader: 'file?name=/fonts/[name].[ext]'}
        ]
    },

    node: {
        global: 1,
        crypto: 'empty',
        module: 0,
        Buffer: 0,
        clearImmediate: 0,
        setImmediate: 0
    }
}
