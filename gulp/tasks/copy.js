import pkg from 'gulp';
import filePaths from '../config/paths.js';
import logger from '../config/Logger.js';

const { src, dest } = pkg;

const copy = () => src(filePaths.src.static)
  .pipe(logger.handleError('COPY'))
  .pipe(dest(filePaths.build.static));

export default copy;
