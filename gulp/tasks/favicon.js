import pkg from 'gulp';
import favicons from 'gulp-favicons';
import filter from 'gulp-filter';
import filePaths from '../config/paths.js';
import logger from '../config/Logger.js';

const { src, dest } = pkg;

const favicon = () => src(filePaths.src.favicon)
  .pipe(logger.handleError('FAVICON'))
  .pipe(favicons({
    icons: {
      favicons: true,
      appleIcon: true,
      android: true,
      windows: false,
      yandex: false,
      coast: false,
      firefox: false,
      appleStartup: false,
    },
    path: 'images/favicons/',
  }))
  .pipe(dest(`${filePaths.srcFolder}/images/favicons`))
  .pipe(filter(['favicon.ico', 'apple-touch-icon.png', 'favicon.svg', 'manifest.webmanifest']))
  .pipe(dest(filePaths.srcFolder));

export default favicon;
