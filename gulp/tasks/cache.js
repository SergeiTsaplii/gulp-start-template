import pkg from 'gulp';
import rev from 'gulp-rev';
import revDel from 'gulp-rev-delete-original';
import revRewrite from 'gulp-rev-rewrite';
import readFileSync from 'fs';
import filePaths from '../config/paths.js';
import logger from '../config/Logger.js';

const { src, dest } = pkg;

const cache = () => src(`${filePaths.buildFolder}/**/*.{css,js,svg,png,jpg,jpeg,webp, avif, woff2}`, { base: filePaths.buildFolder })
  .pipe(logger.handleError('CACHE'))
  .pipe(rev())
  .pipe(revDel())
  .pipe(dest(filePaths.buildFolder))
  .pipe(rev.manifest('rev.json'))
  .pipe(dest(filePaths.buildFolder));

const rewrite = () => {
  const manifest = readFileSync('dist/rev.json');
  src(`${filePaths.build.css}/*.css`)
    .pipe(revRewrite({ manifest }))
    .pipe(dest(filePaths.build.css));
  return src(`${filePaths.buildFolder}/*.html`)
    .pipe(revRewrite({ manifest }))
    .pipe(dest(filePaths.buildFolder));
};

export { cache, rewrite };
