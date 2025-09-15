// filepath: postcss.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};

// If this configuration is needed, integrate it properly into the JavaScript code or move it to a separate JSON file.