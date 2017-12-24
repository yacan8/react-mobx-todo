const webpack = require('webpack');
const path = require('path');
const __DEV__ = process.env.NODE_ENV !== 'production';
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'mobx', 'mobx-react']
  },
  output: {
    path: path.resolve('vendor'),
    filename: 'vendor.js',
    library: 'vendor_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve('vendor', 'vendor.js.json'),
      name: 'vendor_library'
    }),
    new ProgressBarPlugin({
      format: ' build dll file [:bar] :percent (:elapsed seconds)',
      clear: false,
      width: 60
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': __DEV__ ? '"development"' : '"production"',
      'process.env.BROWSER': true,
      __DEV__: __DEV__
    }),
    ...__DEV__ ? [] : [new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })]
  ]
}
