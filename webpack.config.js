const path = require('path');
const webpack = require('webpack');
const helpers = require('./config/helpers');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.browser.ts',
        'vendor':    './src/vendor.browser.ts',
        'main':      './src/main.browser.ts',
    },

    resolve: {
        modules: [helpers.root('src'), helpers.root('node_modules')],
        extensions: ['.ts', '.js']
    },

    plugins: [
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
        rules: [
            // .ts files for TypeScript
            { test: /\.ts$/, use: ['awesome-typescript-loader', 'angular2-template-loader'], exclude: /node_modules/ },
            { test: /\.ts$/, use: ['awesome-typescript-loader', 'angular2-template-loader'], include: /node_modules\/ng2-uploader/ },
            { test: /\.css$/, use: ['to-string-loader', 'css-loader'] },
            { test: /\.html$/, use: 'raw-loader' },
            /* global styles */
            { test: /\.scss$/, use: ExtractTextPlugin.extract({fallback: 'style-loader', loader: "css-loader!sass-loader",}),
              include: [helpers.root('src', 'styles')]},
            /* component styles */
            { test: /\.scss$/, use: ['raw-loader', 'sass-loader?sourceMap'], exclude: [helpers.root('src', 'styles')]},
            { test: /\.(png|jpe?g|gif|ico)\??.*$/, use: 'url-loader?limit=1024&name=/images/[name].[ext]' },
            { test: /\.(woff(2)?|svg|eot|ttf)\??.*$/, use: 'url-loader?name=/fonts/[name].[ext]'}
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
