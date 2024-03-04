// webpack.config.js
const path = require('path');

module.exports = {
 mode: 'development',
 entry: './public/module.js', // Adjust the path to your entry point
 output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
 },
 experiments: {
    outputModule: true, // Enable support for ES module output
 },
 module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use babel-loader to transpile ES module syntax
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
 },
};
