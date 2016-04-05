const webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: __dirname,
    filename: 'app/js/main.js',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(eot|woff|woff2|ttf|svg)/, exclude: /node_modules/, loader: 'file' },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        TVGUIDE_HOST: JSON.stringify('82.196.0.184'),
        TVGUIDE_PORT: JSON.stringify('3090'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
    }),
  ],
};
