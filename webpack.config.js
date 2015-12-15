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
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/*
 * Config
 */
module.exports = {
  // for faster builds use 'eval'
  devtool: 'source-map',
  debug: true,

  entry: {
    'vendor': ['./src/vendor.ts', , "./src/fontAwesome.js"],
    'bootstrap': "bootstrap-sass!./bootstrap-sass.config.js",
    'app': './src/bootstrap.ts' // our angular app
  },

  // Config for our build files
  output: {
    path: root('__build__'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    // ensure loader extensions match
    extensions: ['','.ts','.js','.json', '.css', '.scss', '.html']
  },

  module: {
    preLoaders: [ { test: /\.ts$/, loader: 'tslint-loader' } ],
    loaders: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          'ignoreDiagnostics': [
            2403, // 2403 -> Subsequent variable declarations
            2300, // 2300 Duplicate identifier
            2374, // 2374 -> Duplicate number index signature
            2375  // 2375 -> Duplicate string index signature
          ]
        },
        exclude: [ /\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/ ]
      },

      // Support for *.json files.
      { test: /\.json$/,  loader: 'json-loader' },

      // Support for CSS as raw text
      { test: /\.css$/,   loader: 'raw-loader' },

      // support for .html as raw text
      { test: /\.html$/,  loader: 'raw-loader' },

      //{ test: /\.(png|eot|ttf|svg)$/, loader: "url" },

      // the url-loader uses DataUrls.
      // the file-loader emits files.
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },


      // **IMPORTANT** This is needed so that each bootstrap js file required by
      // bootstrap-sass-loader has access to the jQuery object
      { test: /\.scss$/, loaders: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"] },
    ]
  },

  plugins: [
    new CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js', minChunks: Infinity }),
    //new CommonsChunkPlugin({ name: 'bootstrap', filename: 'bootstrap.js', minChunks: Infinity }),
    new CommonsChunkPlugin({ name: 'common', filename: 'common.js', minChunks: 2, chunks: ['app', 'vendor'] }),
    new ExtractTextPlugin("[name].css", {"omit":1,"extract":true,"remove":true})
  ],

  // Other module loader config
  tslint: {
    emitErrors: false,
    failOnHint: false
  },
  // our Webpack Development Server config
  devServer: {
    historyApiFallback: true,
    contentBase: 'src/public',
    publicPath: '/__build__'
  }

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
