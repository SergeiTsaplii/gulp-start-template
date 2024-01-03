import pkg from 'gulp';
import filePaths from '../config/paths.js';
import logger from '../config/Logger.js';
import plugins from '../config/plugins.js';

const { src, dest } = pkg;

const copyRootFiles = () => {
  const config = {
    dot: true,
    allowEmpty: true,
  };

  /** Добавляем файлы, которые нужны в корне проекта */
  const files = ['favicon.ico', 'apple-touch-icon.png', 'manifest.webmanifest', 'favicon.svg'];

  return src(plugins.concat(filePaths.srcFolder, files), config)
    .pipe(logger.handleError('COPY ROOT FILES'))
    .pipe(dest(filePaths.buildFolder));
};

export default copyRootFiles;
