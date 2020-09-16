/* eslint-disable */

const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'commentPlugin',
  },
  externals: {
    // require("jquery") is external and available
    // on the global var jQuery
    "jquery": "jQuery"
  }
};