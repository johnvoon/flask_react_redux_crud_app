var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval',
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
