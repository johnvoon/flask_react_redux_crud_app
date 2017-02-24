var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const VENDOR_LIBS = [
  'react', 'lodash', 'redux', 'react-redux', 'react-dom',
  'redux-form', 'redux-thunk'
];

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: './src/index',
    vendor: VENDOR_LIBS
  },
  output: {
    publicPath: 'http://localhost:8080/static/scripts',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    modules: ["node_modules", "src"],
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   enforce: "pre",
      //   loader: 'eslint-loader',
      //   query: {
      //     configFile: './.eslintrc'
      //   }
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'less-loader'],
        include: path.join(__dirname, 'styles')
      },
      {
        test: /\.(woff(2)?|eot|ttf|svg|gif)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: './server/static/images/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'server/templates/base.html',
      inject: 'body'
    })
  ]
};
