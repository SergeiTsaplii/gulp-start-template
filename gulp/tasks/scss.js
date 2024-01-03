import pkg from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import avifcss from 'gulp-avif-css-fix';
import groupMediaQueries from 'gulp-group-css-media-queries';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import debug from 'gulp-debug';
import plugins from '../config/plugins.js';
import filePaths from '../config/paths.js';
import logger from '../config/Logger.js';

const { src, dest } = pkg;
const sass = gulpSass(dartSass);

const scss = (isBuild) => src(filePaths.src.scss, { sourcemaps: !isBuild })
  .pipe(logger.handleError('SCSS'))
  .pipe(sass({ includePaths: ['node_modules'] }))
  .pipe(plugins.replace(/@img\//g, '../images/'))
  .pipe(plugins.if(isBuild, groupMediaQueries()))
  .pipe(plugins.if(isBuild, avifcss()))
  .pipe(plugins.if(isBuild, postcss([autoprefixer(), postcssPresetEnv()])))
  .pipe(plugins.if(isBuild, cleanCss({ level: 2 })))
  .pipe(plugins.if(isBuild, rename({ suffix: '.min' })))
  .pipe(dest(filePaths.build.css, { sourcemaps: isBuild ? '' : '.' }))
  .pipe(plugins.if(!isBuild, debug({ title: 'CSS files' })))
  .pipe(plugins.browserSync.stream());

export default scss;

// import { stream as critical } from 'critical';
// export const critCSS = () =>
//   gulp
//     .src(path.src.html)
//     .pipe(
//       critical({
//         base: path.dist.base,
//         inline: true,
//         css: [path.dist.cssIndex],
//       }),
//     )
//     .on('error', (err) => {
//       console.error(err.message);
//     })
//     .pipe(gulp.dest(path.dist.base));
