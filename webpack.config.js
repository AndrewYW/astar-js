module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: './bundle.js'
  },
  resolve: {
    extensions: ['.js', '*']
  },
  devtool: 'source-map'
};