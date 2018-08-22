const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  // devtool: 'inline-source-map',
  devServer: {
    contentBase: '../dist',
    hot: true
  },
  module: {
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify('development')
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      // [contenthash]webpack4会失败
      // filename: 'static/css/[name].[contenthash].css',
      filename: 'static/css/[name].[md5:contenthash:hex:20].css',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/td.html',
      inject: true
    }),
  ],
});