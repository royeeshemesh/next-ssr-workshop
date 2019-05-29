const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'none',

  target: 'node',

  externals: [nodeExternals()],

  entry: './app-server/server.js',

  output: {
    filename: 'server-bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }
    ]
  }
};