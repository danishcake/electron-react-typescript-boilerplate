/**
 * Build config for electron 'Renderer Process' file
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.config.base');


module.exports = merge(baseConfig, {
  devtool: false,

  mode: 'production',

  module: {
    rules: [
      {
        test:  /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false
            }
          },
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  },

  entry: [
    './app/index'
  ],

  output: {
    path: path.join(__dirname, 'app/dist'),
    publicPath: '../dist/'
  },

  plugins: [
    // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
    // https://github.com/webpack/webpack/issues/864
    new webpack.optimize.OccurrenceOrderPlugin(),

    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
      // ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),

    new HtmlWebpackPlugin({
      filename: '../app.html',
      template: 'app/app.html',
      inject: false
    })
  ],

  // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  target: 'electron-renderer'
});
