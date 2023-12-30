import pkg from 'gulp';
import clean from './gulp/tasks/clean.js';
import server from './gulp/tasks/server.js';

// import filePaths from './gulp/config/paths';

const { parallel, series } = pkg;
// const isBuild = process.argv.includes('--build');

const watcher = () => {

};

const mainTasks = parallel();

const dev = series(clean, mainTasks, parallel(watcher, server));
const build = series(clean, mainTasks);

export default dev;
export { build };
