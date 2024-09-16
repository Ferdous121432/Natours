const path = require('path');

module.exports = {
  entry: './public/js/index.js', // Entry point of your application
  output: {
    filename: 'bundle.js', // Output bundle file
    path: path.resolve(__dirname, './public/js'), // Output directory
    sourceMapFilename: 'bundle.js.map', // Source map file
  },
  devtool: 'source-map', // Generate source maps
  mode: 'development', // Set the mode to 'development' or 'production'
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'), // Add fallback for 'crypto' module
      vm: require.resolve('vm-browserify'), // Add fallback for 'vm' module
      stream: require.resolve('stream-browserify'), // Add fallback for 'stream' module
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel to transpile JavaScript
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
