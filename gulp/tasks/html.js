import pkg from 'gulp';
import fileinclude from 'gulp-file-include';
import pictureHtml from 'gulp-webp-avif-html-nosvg-nogif-lazyload';
import htmlMin from 'gulp-htmlmin';
import { htmlValidator } from 'gulp-w3c-html-validator';
import debug from 'gulp-debug';
import plugins from '../config/plugins.js';
import filePaths from '../config/paths.js';
import logger from '../config/Logger.js';

const { src, dest } = pkg;

const html = (isBuild) => src(filePaths.src.html)
  .pipe(logger.handleError('HTML'))
  .pipe(fileinclude())
  .pipe(plugins.replace(/@img\//g, 'images/'))
  .pipe(plugins.if(isBuild, pictureHtml({
    primaryFormat: 'avif',
    primaryAfter: 'images/',
    primaryBefore: 'images/',
    secondaryFormat: 'webp',
    secondaryAfter: 'images/',
    secondaryBefore: 'images/',
    srcsetOutput: 0,
    youtubeCoverWebp: false,
  })))
  .pipe(
    htmlMin({
      useShortDoctype: true,
      sortClassName: true,
      removeComments: isBuild,
    }),
  )
  .pipe(plugins.if(isBuild, plugins.replace('.css', '.min.css')))
  .pipe(plugins.if(isBuild, plugins.replace('.js', '.min.js')))
  .pipe(plugins.if(isBuild, htmlValidator.analyzer()))
  .pipe(plugins.if(isBuild, htmlValidator.reporter()))
  .pipe(dest(filePaths.buildFolder))
  .pipe(plugins.if(!isBuild, debug({ title: 'HTML files' })))
  .pipe(plugins.browserSync.stream());

export default html;
