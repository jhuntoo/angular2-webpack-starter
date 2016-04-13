// @AngularClass

var helpers = require('./helpers');
// Webpack Plugins
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin  = require('webpack/lib/DefinePlugin');
var ENV = process.env.ENV = process.env.NODE_ENV = 'test';

/*
 * Config
 */
module.exports = {
  // Do not change, leave as is or it wont work.
  // See: https://github.com/webpack/karma-webpack#source-maps
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['', '.ts', '.js']
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
        loader: "source-map-loader",
        exclude: [
          helpers.root('node_modules/rxjs')
        ]
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        query: {
          "compilerOptions": {
            "removeComments": true,
          }
        },
        exclude: [ /\.e2e\.ts$/ ]
      },
      { test: /\.json$/, loader: 'json-loader', exclude: [ helpers.root('src/index.html') ] },
      { test: /\.html$/, loader: 'raw-loader', exclude: [ helpers.root('src/index.html') ] },
      { test: /\.css$/,  loader: 'raw-loader', exclude: [ helpers.root('src/index.html') ] },
      { test: /\.less$/,     loader: 'style!css!less', exclude: [ helpers.root('src/index.html') ]},
      { test: /\.(ttf|eot|svg|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader", exclude: [ helpers.root('src/index.html') ] },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" }
    ],
    postLoaders: [
      // instrument only testing sources with Istanbul
      {
        test: /\.(js|ts)$/,
        include: helpers.root('src'),
        loader: 'istanbul-instrumenter-loader',
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }
    ]
  },
  plugins: [
    // Environment helpers
    new DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'HMR': false
    })
  ],
  node: {
    global: 'window',
    progress: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src',
  }
};
