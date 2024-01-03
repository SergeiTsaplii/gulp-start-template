import pkg from 'gulp';
import debug from 'gulp-debug';
import webpack from 'webpack-stream';
import webpackConfig from '../../webpack.config.js';
import plugins from '../config/plugins.js';
import filePaths from '../config/paths.js';
import logger from '../config/Logger.js';

const { src, dest } = pkg;

const js = async (isDev) => src(filePaths.src.js)
  .pipe(logger.handleError('JS'))
  .pipe(webpack({ config: await webpackConfig(isDev) }))
  .pipe(dest(filePaths.build.js))
  .pipe(plugins.if(isDev, debug({ title: 'JS files' })))
  .pipe(plugins.browserSync.stream());

export default js;
