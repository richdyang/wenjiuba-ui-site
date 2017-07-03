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

    resolve: {
        modules: [helpers.root('src'), helpers.root('node_modules')],
        extensions: ['.ts', '.js']
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
        new ExtractTextPlugin('styles/app.css'),
        new webpack.ContextReplacementPlugin(
            /**
             * The (\\|\/) piece accounts for path separators in *nix and Windows
             */
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('src'), // location of your src
            {
                /**
                 * Your Angular Async Route paths relative to this root directory
                 */
            }
        ),
    ],

    module: {
        loaders: [
            // .ts files for TypeScript
            { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'], exclude: /node_modules/ },
            { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'], include: /node_modules\/ng2-uploader/ },
            { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
            { test: /\.html$/, loader: 'raw-loader' },
            /* global styles */
            { test: /\.scss$/, loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: "css-loader!sass-loader",
            }), include: [helpers.root('src', 'styles')]},
            /* component styles */
            { test: /\.scss$/, loader: 'raw-loader!sass-loader?sourceMap', exclude: [helpers.root('src', 'styles')]},
            { test: /\.(png|jpe?g|gif|ico)\??.*$/, loader: 'url-loader?limit=1024&name=/images/[name].[ext]' },
            { test: /\.(woff(2)?|svg|eot|ttf)\??.*$/, loader: 'file-loader?name=/fonts/[name].[ext]'}
        ]
    },

    node: {
        global: true,
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
}
