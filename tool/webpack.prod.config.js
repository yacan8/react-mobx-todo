const webpack = require('webpack');
const cssnano = require('cssnano');
const path = require('path');
const config = require('../config.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcss: [
      cssnano({
        autoprefixer: {
          add: true,
          remove: true,
          browsers: ['last 2 versions']
        },
        discardComments: {
          removeAll: true
        },
        discardUnused: false,
        mergeIdents: false,
        reduceIdents: false,
        safe: true,
        sourcemap: true
      })
    ]
  }
}

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: ['react', 'react-dom', 'mobx', 'mobx-react', 'babel-polyfill', 'whatwg-fetch']
  },
  output: {
    path: config.dist,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            'es2015-ie',
            'react',
            'stage-2'
          ],
          plugins: [
            'transform-decorators-legacy',
            'transform-class-properties',
            'transform-runtime'
          ]
        },
        include: path.join(__dirname, '..', 'src')
      },
      {
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', postcssLoader]
        })
      },
      {
        test: /\.less/,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', postcssLoader, 'less-loader']
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.ssr': process.env.ssr,
      'process.env.NODE_ENV': '"production"'
    }),
    new ExtractTextPlugin('[name].css'),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     unused: true,
    //     dead_code: true,
    //     warnings: false
    //   }
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      filename: '[name].js'
    })
  ]
}
