// @AngularClass

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var helpers = require('./helpers');
// Webpack Plugins
var webpack = require('webpack');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var CompressionPlugin = require('compression-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackMd5Hash    = require('webpack-md5-hash');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ENV = process.env.NODE_ENV = process.env.ENV = 'production';
var HOST = process.env.HOST || 'localhost';
var PORT = process.env.PORT || 8080;
var BUILD_NUMBER = process.env.CIRCLE_BUILD_NUM || '';

var metadata = {
  title: 'MustRace',
  version: BUILD_NUMBER,
  baseUrl: '/',
  host: HOST,
  port: PORT,
  ENV: ENV
};

/*
 * Config
 */
module.exports = helpers.validate({
  // static data for index.html
  metadata: metadata,

  devtool: 'source-map',
  cache: false,
  debug: false,

  entry: {
    'polyfills':'./src/polyfills.ts',
    'main':'./src/main.ts' // our angular app
    //'bootstrap' : 'bootstrap-loader'
  },

  // Config for our build files
  output: {
    path: helpers.root('dist'),
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].bundle.map',
    chunkFilename: '[id].[chunkhash].chunk.js'
  },

  resolve: {
    cache: false,
    // ensure loader extensions match
    extensions: ['', '.ts','.js','.json','.css','.html', '.woff', '.ttf', '.eot', '.svg', '.jpg', '.less', '.scss']
  },

  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [
          helpers.root('node_modules')
        ]
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          helpers.root('node_modules/rxjs')
        ]
      }
    ],
    loaders: [
      // Support Angular 2 async routes via .async.ts
      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          // remove TypeScript helpers to be injected below by DefinePlugin
          'compilerOptions': {
            'removeComments': true,
            'noEmitHelpers': true,
          }
        },
        exclude: [
          /\.(spec|e2e)\.ts$/
        ]
      },

      // Support for *.json files.
      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      // Support for CSS as raw text
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },

      { test: /\.scss$/, loaders: [ 'style', 'css', 'postcss', 'sass' ] },

      { test: /\.less$/,     loader: 'style!css!less'},

      // support for .html as raw text
      { test: /\.html$/,  loader: 'raw-loader', exclude: [ helpers.root('src/index.html') ] },

      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },

      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
      // if you add a loader include the file extension

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false&progressive=true'
        ]
      }

    ]
  },

  plugins: [
    new WebpackMd5Hash(),
    new DedupePlugin(),
    new OccurenceOrderPlugin(true),
    new CommonsChunkPlugin({
      name: 'polyfills',
      filename: 'polyfills.[chunkhash].bundle.js',
      chunks: Infinity
    }),
    // static assets
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      }
    ]),
    // generating html
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new DefinePlugin({
      // Environment helpers
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV)
      }
    }),
    new ProvidePlugin({
      // TypeScript helpers
      '__metadata': 'ts-helper/metadata',
      '__decorate': 'ts-helper/decorate',
      '__awaiter': 'ts-helper/awaiter',
      '__extends': 'ts-helper/extends',
      '__param': 'ts-helper/param',
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    new UglifyJsPlugin({
      // to debug prod builds uncomment //debug lines and comment //prod lines

      // beautify: true,//debug
      // mangle: false,//debug
      // dead_code: false,//debug
      // unused: false,//debug
      // deadCode: false,//debug
      // compress : { screw_ie8 : true, keep_fnames: true, drop_debugger: false, dead_code: false, unused: false, }, // debug
      // comments: true,//debug

      beautify: false,//prod
      // disable mangling because of a bug in angular2 beta.1, beta.2 and beta.3
      // TODO(mastertinner): enable mangling as soon as angular2 beta.4 is out
      // mangle: { screw_ie8 : true },//prod
      mangle: false,
      compress : { screw_ie8 : true },//prod
      comments: false//prod

    }),
   // include uglify in production
    new CompressionPlugin({
      algorithm: helpers.gzipMaxLevel,
      regExp: /\.css$|\.html$|\.js$|\.map$/,
      threshold: 2 * 1024
    }),
    new ExtractTextPlugin("styles.css")
  ],
  // Other module loader config
  tslint: {
    emitErrors: true,
    failOnHint: false,
    resourcePath: 'src',
  },

  htmlLoader: {
    minimize: true,
    removeAttributeQuotes: false,
    caseSensitive: true,
    customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
    customAttrAssign: [ /\)?\]?=/ ]
  },
  // don't use devServer for production

  // we need this due to problems with es6-shim
  node: {
    global: 'window',
    progress: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
});
