import pkg from 'gulp';
import clean from './gulp/tasks/clean.js';
import server from './gulp/tasks/server.js';
import html from './gulp/tasks/html.js';
import filePaths from './gulp/config/paths.js';

const { parallel, series, watch } = pkg;

const isBuild = process.argv.includes('--build');
const handleHTML = html.bind(null, isBuild);

const watcher = () => {
  watch(filePaths.watch.html, handleHTML);
};

const mainTasks = parallel(handleHTML);

const dev = series(clean, mainTasks, parallel(watcher, server));
const build = series(clean, mainTasks);

export default dev;
export { build };
