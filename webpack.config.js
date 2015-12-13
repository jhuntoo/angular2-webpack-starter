// @AngularClass

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var sliceArgs = Function.prototype.call.bind(Array.prototype.slice);
var toString  = Function.prototype.call.bind(Object.prototype.toString);
var path = require('path');
var webpack = require('webpack');
// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

/*
 * Config
 */
module.exports = {
  devtool: 'source-map', // for faster builds use 'eval'
  debug: true,

  // our Webpack Development Server config
  devServer: {
    historyApiFallback: true,
    contentBase: 'src/public',
    publicPath: '/__build__'
  },

  entry: {
    'angular2': [
      // group angular2 deps into the angular2.js file
      'core-js',
      'rxjs',
      'zone.js',
      'reflect-metadata',
      'angular2/bootstrap',
      'angular2/platform/browser',
      'angular2/platform/common_dom',
      'angular2/core',
      'angular2/router',
      'angular2/http'
    ],
    'app': './src/app/bootstrap', // our angular app,
    'styles': './src/public/styles/_main.scss'
  },

  // Config for our build files
  output: {
    path: root('__build__'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: ['','.ts','.js','.json', '.scss', '.html']
  },

  module: {
    loaders: [
      // Support for *.json files.
      { test: /\.json$/,  loader: 'json' },

      // Support for CSS as raw text
      { test: /\.css$/,   loader: 'raw' },

      // **IMPORTANT** This is needed so that each bootstrap js file required by
      // bootstrap-sass-loader has access to the jQuery object
      { test: /\.scss$/, loaders: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"] },

      // support for .html as raw text
      { test: /\.html$/,  loader: 'raw' },

      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: "url" },

      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'ts',
        query: { 'ignoreDiagnostics': [ 2403 ] }, // 2403 -> Subsequent variable declarations
        exclude: [ /\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/ ]
      }
    ]
  },

  plugins: [
    new CommonsChunkPlugin({ name: 'angular2', filename: 'angular2.js', minChunks: Infinity }),
    new CommonsChunkPlugin({ name: 'common',   filename: 'common.js' })
  ]
};

// Helper functions

function root(args) {
  args = sliceArgs(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
  args = sliceArgs(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}
