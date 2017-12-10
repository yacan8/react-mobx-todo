const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const __DEV__ = process.env.NODE_ENV !== 'production';
const port = process.env.port;
const host = process.env.host;
module.exports = {
  entry: [`webpack-dev-server/client?http://${host}:${port}`, 'webpack/hot/dev-server', './src/index.js'],
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  devtool : 'source-map',
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
            'stage-2',
          ],
          plugins: [
            'transform-decorators-legacy',
            'transform-class-properties',
            'transform-runtime'
          ],
        },
        include: path.join(__dirname, '..', 'src')
      },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader']},
      { test: /\.less/, loaders: ['style-loader', 'css-loader', 'less-loader']}
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template : './index.html',
      hash     : false,
      title    : 'react-mobx-todo',
      filename : 'index.html',
      inject   : 'body'
    }),
    new webpack.DllReferencePlugin({
      manifest: require('../vendor/vendor.js.json'),
      name: 'vendor_library'
    })
  ]
}
