var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./config/helpers');

// Webpack Config
var webpackConfig = {
  entry: {
    'polyfills': './src/polyfills.browser.ts',
    'vendor':    './src/vendor.browser.ts',
    'main':       './src/main.browser.ts',
  },

  output: {
    path: './dist',
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
    new CopyWebpackPlugin([
      { context: 'src/', from: 'images/**'  },
      { context: 'src/', from: 'index.html'  },
      { context: 'src/', from: 'favicon.ico'  },
      // { context: 'src/', from: '**/*.html'  }
    ]),
    new ExtractTextPlugin('styles/app.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      minimize: true,
      comments: false,
      sourceMap: false // here control the final typescript sourcemap generation
    })
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
  }

};


// Our Webpack Defaults
var defaultConfig = {
  devtool: 'inline-source-map',//'cheap-module-source-map',
  cache: true,
  debug: true,
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    root: [ path.join(__dirname, 'src') ],
    extensions: ['', '.ts', '.js']
  },

  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 }
  },

  node: {
    global: 1,
    crypto: 'empty',
    module: 0,
    Buffer: 0,
    clearImmediate: 0,
    setImmediate: 0
  }
};

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
