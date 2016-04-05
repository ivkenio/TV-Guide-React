const gulp = require('gulp');
const sass = require('gulp-sass');
const minify = require('gulp-minify-css');
const gutil = require('gulp-util');
const nodemon = require('gulp-nodemon');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');
const path = './app';

gulp.task('default', ['webpack-dev-server', 'run-nodemon', 'watch-styles']);

gulp.task('run-nodemon', () =>
  nodemon({ script: './server/index.js', ext: 'js' })
);

gulp.task('styles', () => {
  gulp.src(`${path}/sass/styles.scss`)
    .pipe(sass({ includePaths: [`${path}/sass`] })
      .on('error', sass.logError))
    .pipe(minify())
    .pipe(gulp.dest(`${path}/css`));
});

gulp.task('watch-styles', () => {
  gulp.watch(`${path}/sass/**/*.scss`, ['styles']);
});

gulp.task('webpack-dev-server', () => {
  // Modify some webpack config options
  const config = Object.create(webpackConfig);
  config.devtool = 'eval';
  config.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
    },
  }).listen(8080, 'localhost', (err) => {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
  });
});
