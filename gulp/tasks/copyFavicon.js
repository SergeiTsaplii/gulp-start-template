import pkg from 'gulp';
import filter from 'gulp-filter';
import { deleteAsync } from 'del';
import filePaths from '../config/paths.js';
import logger from '../config/Logger.js';

const { src, dest } = pkg;

const copyFavicon = () => src(filePaths.src.favicon)
  .pipe(logger.handleError('COPYFAVICONS'))
  .pipe(dest(`${filePaths.srcFolder}/images/favicons/`))
  .pipe(src(`${filePaths.srcFolder}/images/favicons/*.*`))
  .pipe(filter(['favicon.ico', 'apple-touch-icon.png', 'manifest.webmanifest', 'favicon.svg']))
  .pipe(dest(filePaths.srcFolder));

const deletedFile = () => deleteAsync([`${filePaths.srcFolder}/images/favicons/index.html`]);
export { copyFavicon, deletedFile };
