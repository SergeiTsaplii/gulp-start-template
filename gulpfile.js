import pkg from 'gulp';
import clean from './gulp/tasks/clean.js';
import server from './gulp/tasks/server.js';
import html from './gulp/tasks/html.js';
import scss from './gulp/tasks/scss.js';
import js from './gulp/tasks/js.js';
import images from './gulp/tasks/images.js';
import { ttfToWoff, fontStyle } from './gulp/tasks/fonts.js';
import svgSprites from './gulp/tasks/sprite.js';
import { copyFavicon, deletedFile } from './gulp/tasks/copyFavicon.js';
import zip from './gulp/tasks/zip.js';
import ftpDeploy from './gulp/tasks/ftpDeploy.js';
import filePaths from './gulp/config/paths.js';

const { parallel, series, watch } = pkg;

const isBuild = process.argv.includes('--build');
const handleHTML = html.bind(null, isBuild);
const handleSCSS = scss.bind(null, isBuild);
const handleJS = js.bind(null, !isBuild);
const handleImages = images.bind(null, isBuild);

const watcher = () => {
  watch(filePaths.watch.html, handleHTML);
  watch(filePaths.watch.scss, handleSCSS);
  watch(filePaths.watch.js, handleJS);
  watch(filePaths.watch.images, handleImages);
};

const fonts = series(ttfToWoff, fontStyle);
const devTasks = parallel(handleHTML, handleSCSS, handleJS, handleImages);

const mainTasks = series(fonts, devTasks);

const dev = series(clean, mainTasks, parallel(watcher, server));
const build = series(clean, mainTasks);
const deployZIP = series(clean, mainTasks, zip);
const deployFTP = series(clean, mainTasks, ftpDeploy);

export default dev;
export {
  dev, build, svgSprites, copyFavicon, deletedFile, deployZIP, deployFTP,
};
