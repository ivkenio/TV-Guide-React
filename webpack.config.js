const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    './src/index.js',
  ],
  output: {
    path: __dirname,
    filename: 'app/js/main.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        },
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(eot|woff|woff2|ttf|svg)/, exclude: /node_modules/, loader: 'file' },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        TVGUIDE_HOST: JSON.stringify('localhost'),
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
