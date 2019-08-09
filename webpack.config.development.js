/* eslint-disable max-len */
/**
 * Build config for development process that uses Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.config.base');

const port = process.env.PORT || 3000;

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',

  mode: 'development',

  module: {
    rules: [
      {
        test:  /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true
            }
          },
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  },

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },

  entry: [
    'react-hot-loader/patch',
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr&reload=true`,
    './app/index'
  ],

  output: {
    publicPath: `http://localhost:${port}/dist/`
  },

  plugins: [
    // https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoEmitOnErrorsPlugin(),

    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      // ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
  ],

  // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  target: 'electron-renderer'
});
