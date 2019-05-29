const path = require('path');

module.exports = {
  mode: 'none',

  entry: './src/index.js',

  output: {
    filename: 'client-bundle.js',
    path: path.resolve(__dirname, 'public')
  },

  devtool: 'inline-sourcemap',

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, './src'),
        ],
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  }
};