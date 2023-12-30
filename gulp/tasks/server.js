import browserSync from 'browser-sync';
import filePaths from '../config/paths.js';

const server = () => {
  browserSync.init({
    server: {
      baseDir: filePaths.buildFolder,
    },
    logLevel: 'info',
    cors: true,
    notify: true,
    port: 3000,
  });
};

export default server;
