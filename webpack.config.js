module.exports = {
  entry: './src/js/astar.js',
  output: {
    filename: './bundle.js'
  },
  resolve: {
    extensions: ['.js', '*']
  },
  devtool: 'source-map'
};