const path = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const BUILD_DIR = path.join(__dirname, 'dist');

const publicPath = '/';

module.exports = {

  mode: 'development',

  entry: {
    app: './index.jsx',
    react: ['react', 'react-dom', 'redux', 'react-redux'],
    vendor: [
      'semantic-ui-react',
      'react-loadable'],
  },
  output: {
    publicPath,
    path: BUILD_DIR,
    filename: '[name]-[hash].min.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: true,
              importLoader: 2,
            },
          },
          'sass-loader',
        ],
      },
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  plugins: [
    new CleanWebpackPlugin([BUILD_DIR], {
      verbose: true,
      exclude: ['json'],
    }),
    new HtmlWebpackPlugin({
      title: 'TodoApp',
      filename: 'index.html',
      inject: 'body',
      hash: true,
      xhtml: true,
      template: 'src/templates/index.ejs',
      chunks: ['app', 'vendor', 'react'],
    }),
    new webpack.optimize.SplitChunksPlugin({
      name: ['react', 'vendor'],
      filename: '[name]-[chunkhash].bundle.js',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css',
    }),
  ]
};
