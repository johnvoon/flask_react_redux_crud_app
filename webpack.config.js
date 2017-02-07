var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: './src/index.js',
  output: {
    // path on web server
    publicPath: 'http://localhost:8080/static/scripts',
    // bundle name
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel', 
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'less'],
        include: path.join(__dirname, 'styles')
      },
      {
        test: /\.(woff(2)?|eot|ttf|svg|gif)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000',
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: './snakeeyes/static/images/[name].[ext]'
        }
      }
    ]
  },
  eslint: {
    configFile: './.eslintrc'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
