var webpack = require('webpack')
var path = require('path')

module.exports = {
  // This is the app's entrypoint
  entry: path.resolve(__dirname, 'src/index.js'),

  // The environment to use defaults for
  mode: 'development',

  // Where the bundled code will be output
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'app.js'
  },

  devServer: {
    // The "webroot" of the app during development
    contentBase: path.resolve(__dirname, 'public')
  },

  module: {
    // Rules describe the action(s) to perform on matching files
    rules: [{
      test: /\.jsx?$/,             // Any files that end .js(x)
      exclude: /node_modules/,     // except those in a node_modules directory
      use: [{
        loader: 'babel-loader'     // Use the babel-loader to process
      }]
    }, {
      test: /\.css$/,              // Any files that end .css
      exclude: /node_modules/,     // except those in a node_modules directory
      use: [{
        loader: 'style-loader'     // Use the style-loader
      }, {
        loader: 'css-loader'       // and the css-loader to process
      }]
    }]
  }
}
